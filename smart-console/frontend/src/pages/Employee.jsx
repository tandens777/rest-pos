import React, { useState, useEffect } from "react";
import axiosInstance from "../config/axiosConfig"; // Import the configured Axios instance
import { Button, Table, Form, Input, Space, Modal, message, Pagination, Popconfirm, Select, DatePicker, TimePicker, Col, Row, Checkbox, Upload, Avatar, Switch, Tabs } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined, SearchOutlined, CheckOutlined, ArrowLeftOutlined, UploadOutlined, CameraOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import FaceRegister from "./FaceRegister"; 

const { TabPane } = Tabs;
const { Option } = Select;

const Employee = () => {
    const [picturePreview, setPicturePreview] = useState(null);
    const [employees, setEmployees] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingEmployee, setEditingEmployee] = useState(null);
    const [employeeTypes, setEmployeeTypes] = useState([]);
    const [employeeStatuses, setEmployeeStatuses] = useState([]);
    const [roles, setRoles] = useState([]);

    const [isFaceRegisterVisible, setIsFaceRegisterVisible] = useState(false);
    const [facialFeatures, setFacialFeatures] = useState(null);

    const [form] = Form.useForm();
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    // Environment variables for API and file server URLs
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL; // e.g., http://192.168.68.118:8081
    const fileBaseUrl = import.meta.env.VITE_FILE_BASE_URL; // e.g., http://192.168.68.118:8080

    const no_pic_default = `${fileBaseUrl}/uploads/employees/default-avatar.png`;

    console.log("API Base URL:", apiBaseUrl); // Debugging
    console.log("File Base URL:", fileBaseUrl); // Debugging

    // Fetch all employees on component mount
    useEffect(() => {
        fetchEmployees();
        fetchDropdownData();

        const handleResize = () => {
            const screenWidth = window.innerWidth;
            if (screenWidth < 768) {
                setPageSize(4);
            } else if (screenWidth < 1200) {
                setPageSize(8);
            } else {
                setPageSize(12);
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    // Fetch Employees from API
    const fetchEmployees = async () => {
        try {
            const response = await axiosInstance.get("/employees/all");
            setEmployees(response.data);
        } catch (error) {
            message.error("Failed to fetch employees.");
        }
    };

    const fetchDropdownData = async () => {
        try {
            const [typesResponse, statusesResponse, rolesResponse] = await Promise.all([
                axiosInstance.get("/employee_types/all"),
                axiosInstance.get("/employee_statuses/all"),
                axiosInstance.get("/roles/all"),
            ]);
            setEmployeeTypes(typesResponse.data);
            setEmployeeStatuses(statusesResponse.data);
            setRoles(rolesResponse.data);
        } catch (error) {
            message.error("Failed to fetch dropdown data.");
        }
    };

    // Search for Employees
    const handleSearch = async () => {
        try {
            const response = await axiosInstance.get(`/employees/all?search=${searchTerm}`);
            setEmployees(response.data);
        } catch (error) {
            message.error("Failed to search employees.");
        }
    };

    // Reset search
    const handleReset = () => {
        setSearchTerm("");
        fetchEmployees();
    };

    // Add a New Employee
    const handleAdd = () => {
        setEditingEmployee(null);
        setIsModalVisible(true);
        form.resetFields();
        setPicturePreview("");
        setFacialFeatures("");
    };

    // Edit an Existing Employee
    const handleEdit = (employee) => {
        setEditingEmployee(employee);
        setIsModalVisible(true);
        form.setFieldsValue({
            emp_no: employee.empNo,
            first_nm: employee.firstNm,
            last_nm: employee.lastNm,
            gender: employee.gender,
            station_id: employee.stationId,
            tin_no: employee.tinNo,
            sss_no: employee.sssNo,
            bday: employee.bday ? dayjs(employee.bday) : null, // Convert to dayjs object
            phone_no: employee.phoneNo,
            date_hired: employee.dateHired ? dayjs(employee.dateHired) : null,
            date_end: employee.dateEnd ? dayjs(employee.dateEnd) : null,
            remarks: employee.remarks,
            facial_features: employee.facial_features,
            public_key: employee.publicKey,
            console_flag: employee.consoleFlag === "Y",
            drawer_flag: employee.drawerFlag === "Y",
            active_flag: employee.activeFlag === "Y",
            pic_filename: employee.picFilename,
            address: employee.address,
            email: employee.email,
            emp_type_id: employee.empTypeId,
            emp_status_id: employee.empStatusId,
            password: employee.password,
            username: employee.username,
            role_id: employee.roleId,
            
            // Convert time strings to dayjs objects for TimePicker
            ...["mon", "tue", "wed", "thu", "fri", "sat", "sun"].reduce((acc, day) => ({
                ...acc,
                [`${day}_restday`]: employee[`${day}Restday`] === "N",
                [`${day}_start1`]: employee[`${day}Start1`] ? dayjs(employee[`${day}Start1`], "HH:mm:ss") : null,
                [`${day}_end1`]: employee[`${day}End1`] ? dayjs(employee[`${day}End1`], "HH:mm:ss") : null,
                [`${day}_start2`]: employee[`${day}Start2`] ? dayjs(employee[`${day}Start2`], "HH:mm:ss") : null,
                [`${day}_end2`]: employee[`${day}End2`] ? dayjs(employee[`${day}End2`], "HH:mm:ss") : null,
                [`${day}_start3`]: employee[`${day}Start3`] ? dayjs(employee[`${day}Start3`], "HH:mm:ss") : null,
                [`${day}_end3`]: employee[`${day}End3`] ? dayjs(employee[`${day}End3`], "HH:mm:ss") : null,
            }), {}),
        });

        // Set logo preview URL using the file server base URL
        if (employee.picFilename) {
            setPicturePreview(`${fileBaseUrl}${employee.picFilename}`);
        } else {
            setPicturePreview("");
        }

        if (employee.facialFeatures) {
            setFacialFeatures(employee.facialFeatures);
        } else {
            setFacialFeatures("");
        }

    };

    // Delete an Employee
    const handleDelete = async (id) => {
        try {
            await axiosInstance.delete(`/employees/delete/${id}`);
            message.success("Employee deleted successfully.");

            const updatedEmployees = employees.filter((employee) => employee.id !== id);
            setEmployees(updatedEmployees);

            if (updatedEmployees.length === 0) {
                setCurrentPage(1);
            }
        } catch (error) {
            message.error("Failed to delete employee.");
        }
    };

    // Handle Modal Submission (Add or Update Employee)
    const handleModalSubmit = async (values) => {
        //console.log('Enter saving data by calling api', values);
        try {
            // Prepare employee data
            const employeeData = {
                emp_no: values.emp_no,
                first_nm: values.first_nm,
                last_nm: values.last_nm,
                gender: values.gender,
                station_id: values.station_id,
                tin_no: values.tin_no,
                sss_no: values.sss_no,
                bday: values.bday ? dayjs(values.bday).format("YYYY-MM-DD") : null,
                phone_no: values.phone_no,
                date_hired: values.date_hired ? dayjs(values.date_hired).format("YYYY-MM-DD") : null,
                date_end: values.date_end ? dayjs(values.date_end).format("YYYY-MM-DD") : null,
                remarks: values.remarks,
                facial_features: facialFeatures, // Now passed in the request body
                public_key: values.public_key,
                console_flag: values.console_flag ? 'Y' : 'N',
                drawer_flag: values.drawer_flag ? 'Y' : 'N',
                active_flag: values.active_flag ? 'Y' : 'N',
                pic_filename: values.pic_filename,
                address: values.address,
                email: values.email,
                emp_type_id: values.emp_type_id,
                emp_status_id: values.emp_status_id,
                password: values.password,
                username: values.username,
                role_id: values.role_id,
                ...["mon", "tue", "wed", "thu", "fri", "sat", "sun"].reduce((acc, day) => ({
                    ...acc,
                    [`${day}_restday`]: values[`${day}_restday`] ? "N" : "Y",
                    [`${day}_start1`]: values[`${day}_start1`] ? dayjs(values[`${day}_start1`]).format("HH:mm:ss") : null,
                    [`${day}_end1`]: values[`${day}_end1`] ? dayjs(values[`${day}_end1`]).format("HH:mm:ss") : null,
                    [`${day}_start2`]: values[`${day}_start2`] ? dayjs(values[`${day}_start2`]).format("HH:mm:ss") : null,
                    [`${day}_end2`]: values[`${day}_end2`] ? dayjs(values[`${day}_end2`]).format("HH:mm:ss") : null,
                    [`${day}_start3`]: values[`${day}_start3`] ? dayjs(values[`${day}_start3`]).format("HH:mm:ss") : null,
                    [`${day}_end3`]: values[`${day}_end3`] ? dayjs(values[`${day}_end3`]).format("HH:mm:ss") : null,
                }), {}),
            };

            console.log('Enter saving data by calling api', employeeData);

            const url = editingEmployee ? `/employees/update/${editingEmployee.id}` : `/employees/add`;
            const method = editingEmployee ? 'put' : 'post';
    
            await axiosInstance[method](
                url,
                employeeData, // Now passing entire employeeData as JSON
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            );

            // Success message
            message.success(`Employee ${editingEmployee ? 'updated' : 'added'} successfully.`);

            // Close modal and refresh list
            setIsModalVisible(false);
            fetchEmployees();
        } catch (error) {
            console.error("Error saving employee:", error);

            // Extract error message from the response
            const errorMessage =
                error.response?.data?.message || // Backend error message
                error.response?.data?.error ||  // Alternative error field
                "Failed to save employee. Please try again."; // Fallback message

            message.error(errorMessage); // Display specific error message
        }
    };


    // Pagination handlers
    const handlePageChange = (page, pageSize) => {
        setCurrentPage(page);
        setPageSize(pageSize);
    };


    // Handle File Upload
    const handleUpload = async (file) => {
        const formData = new FormData();
        formData.append("folder", "employees")
        formData.append("file", file);

        try {
            const response = await axiosInstance.post("/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            const filePath = response.data.filePath; // The relative path returned by the backend
            form.setFieldsValue({ pic_filename: filePath });

            // Set logo preview URL using the file server base URL
            setPicturePreview(`${fileBaseUrl}${filePath}`);
            console.log(`Picture to be saved... ${fileBaseUrl}${filePath}`);
            message.success("Picture uploaded successfully.");
        } catch (error) {
            console.error("Upload error:", error); // Debugging
            message.error("Failed to upload picture.");
        }
    };

    // Handle File Removal
    const handleRemove = async () => {
        try {
            // Set logo_filename to an empty string and clear the preview
            form.setFieldsValue({ pic_filename: "" });
            setPicturePreview("");
            message.success("Picture removed successfully.");
        } catch (error) {
            console.error("Remove error:", error); // Debugging
            message.error("Failed to remove picture.");
        }
    };    


    // Handles Face Recognition
    const handleRegisterFacialRecognition = () => {
        setIsFaceRegisterVisible(true);
    };

    const handleRemoveFacialRecognition = () => {
        setFacialFeatures(null);
        message.success("Facial recognition data removed successfully!");
    };

    const handleSaveFacialFeatures = (features) => {
        setFacialFeatures(features);
        form.setFieldsValue({ facial_features: features });
    };



    // Table Columns
    const columns = [
        {
            title: "Employee No",
            dataIndex: "empNo",
            key: "empNo",
            width: "20%",
        },
        {
            title: "Name",
            key: "name",
            width: "30%",
            render: (text, record) => `${record.lastNm}, ${record.firstNm}`,
        },
        {
            title: "Photo",
            dataIndex: "picFilename",
            key: "picFilename",
            width: "20%",
        },
        {
            title: "Active Status",
            dataIndex: "activeFlag",
            key: "activeFlag",
            width: "10%",
        },
        {
            title: "Actions",
            key: "actions",
            width: "20%",
            render: (text, record) => (
                <Space size="middle" style={{ justifyContent: "flex-end" }}>
                    <Button
                        icon={<EditOutlined />}
                        onClick={() => handleEdit(record)}
                    />
                    <Popconfirm
                        title="Are you sure to delete this employee?"
                        onConfirm={() => handleDelete(record.id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button icon={<DeleteOutlined />} danger />
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    // Paginate employees
    const paginatedEmployees = employees.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    return (
        <div
            style={{
                padding: "20px",
                fontFamily: "'Roboto', sans-serif",
                backgroundColor: "#f9f9f9",
                borderRadius: "8px",
                maxWidth: "1200px",
                margin: "40px auto",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
        >
            <h1
                style={{
                    fontSize: "24px",
                    fontWeight: "bold",
                    textAlign: "center",
                    marginBottom: "20px",
                    color: "#333",
                }}
            >
                Employees
            </h1>
            <Space
                style={{
                    marginBottom: "10px",
                    width: "100%",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                }}
            >
                <Space style={{ marginBottom: "10px" }}>
                    <Input
                        placeholder="Search employees..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ width: "200px" }}
                    />
                    <Button
                        type="primary"
                        icon={<SearchOutlined />}
                        onClick={handleSearch}
                    >
                        Search
                    </Button>
                    <Button
                        type="default"
                        onClick={handleReset}
                        style={{ backgroundColor: "#1890ff", color: "#fff" }}
                    >
                        Reset
                    </Button>
                </Space>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={handleAdd}
                    style={{ backgroundColor: "#28a745", borderColor: "#28a745", color: "#fff" }}
                >
                    Add New
                </Button>
            </Space>

            {/* Employee List Container */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                    gap: "20px",
                    marginTop: "20px",
                }}
            >
                {paginatedEmployees.map((employee) => (
                    <div
                        key={employee.id}
                        style={{
                            backgroundColor: "#fff",
                            borderRadius: "8px",
                            padding: "16px",
                            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                            textAlign: "center",
                            opacity: employee.activeFlag === "N" ? 0.6 : 1,
                        }}
                    >
                        <Avatar
                            src={employee.picFilename ? `${fileBaseUrl}${employee.picFilename}` : no_pic_default}
                            size={80}
                            style={{
                                marginBottom: "10px",
                                border: "1px solid #ccc",
                                filter: employee.activeFlag === "N" ? "grayscale(100%)" : "none",
                            }}
                        />
                        <div style={{ fontWeight: "bold", fontSize: "16px" }}>
                            {employee.lastNm}, {employee.firstNm}
                        </div>
                        <div style={{ color: "#666", marginTop: "4px" }}>
                            {roles.find((role) => role.id === employee.roleId)?.name || "N/A"}
                        </div>
                        <div
                            style={{
                                marginTop: "8px",
                                fontWeight: "bold",
                                color: employee.activeFlag === "Y" ? "red" : "black",
                            }}
                        >
                            {employee.activeFlag === "Y" ? "ACTIVE" : "INACTIVE"}
                        </div>
                        <Space style={{ marginTop: "10px" }}>
                            <Button
                                icon={<EditOutlined />}
                                onClick={() => handleEdit(employee)}
                            />
                            <Popconfirm
                                title="Are you sure to delete this employee?"
                                onConfirm={() => handleDelete(employee.id)}
                                okText="Yes"
                                cancelText="No"
                            >
                                <Button icon={<DeleteOutlined />} danger />
                            </Popconfirm>
                        </Space>
                    </div>
                ))}
            </div>

{/*}
            <Table
                columns={columns}
                dataSource={paginatedEmployees}
                rowKey="id"
                pagination={false}
                locale={{
                    emptyText: "No data available.",
                }}
                style={{
                    border: "1px solid #f0f0f0",
                    fontSize: "14px",
                }}
                scroll={{ x: "max-content" }}
                bordered
                components={{
                    header: {
                        cell: ({ children, ...restProps }) => (
                            <th
                                {...restProps}
                                style={{
                                    backgroundColor: "#1890ff",
                                    color: "#fff",
                                    textAlign: "center",
                                }}
                            >
                                {children}
                            </th>
                        ),
                    },
                }}
                rowClassName="custom-row"
            />
{*/}
            <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={employees.length}
                onChange={handlePageChange}
                style={{ marginTop: "10px", textAlign: "right" }}
            />

            <Modal
                title={editingEmployee ? "Edit Employee" : "Add New Employee"}
                visible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
                centered
                width="1000px" // Increased width to accommodate the layout
                maskStyle={{
                    backgroundColor: "rgba(0, 0, 0, 0.6)",
                }}
                bodyStyle={{
                    padding: "20px",
                    borderRadius: "8px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                }}
            >
            <Form form={form} layout="vertical" onFinish={handleModalSubmit}>
                <Row gutter={16}>
                    {/* First Column: Contains all form fields from Rows 1, 2, and 3 */}
                    <Col span={18}>
                        <Row gutter={16}>
                            <Col span={8}>
                                <Form.Item
                                    name="emp_no"
                                    label="Employee No"
                                    rules={[{ required: true, message: "Employee No is required." }]}
                                >
                                    <Input placeholder="Enter Employee No" />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                    name="first_nm"
                                    label="First Name"
                                    rules={[{ required: true, message: "First Name is required." }]}
                                >
                                    <Input placeholder="Enter First Name" />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                    name="last_nm"
                                    label="Last Name"
                                    rules={[{ required: true, message: "Last Name is required." }]}
                                >
                                    <Input placeholder="Enter Last Name" />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Col span={8}>
                                <Form.Item
                                    name="gender"
                                    label="Gender"
                                    rules={[{ required: true, message: "Gender is required." }]}
                                >
                                    <Select placeholder="Select Gender">
                                        <Option value="M">Male</Option>
                                        <Option value="F">Female</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item name="bday" label="Date of Birth">
                                    <DatePicker style={{ width: "100%" }} />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                    name="station_id"
                                    label="Station"
                                    rules={[{ required: true, message: "Station is required." }]}
                                >
                                    <Select placeholder="Enter Station">
                                        <Option value="1">Floor</Option>
                                        <Option value="2">Kitchen</Option>
                                        <Option value="3">Bar</Option>
                                        <Option value="4">Office</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Col span={8}>
                                <Form.Item name="tin_no" label="TIN Number">
                                    <Input placeholder="Enter TIN Number" />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item name="sss_no" label="SSS Number">
                                    <Input placeholder="Enter SSS Number" />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item name="phone_no" label="Phone">
                                    <Input placeholder="Enter Phone" />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Col>

                    {/* Second Column: Contains the Avatar and Upload Button */}
                    <Col span={6}>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                height: "100%",
                                marginTop: 0,
                            }}
                        >
                            <Avatar
                                src={picturePreview || no_pic_default}
                                size={120}
                                shape="square"
                                style={{
                                    marginBottom: "10px",
                                    border: "1px solid #ccc",
                                    display: "block",
                                }}
                            />
                            <Upload
                                beforeUpload={(file) => {
                                    // Handle image upload manually
                                    handleUpload(file);
                                    return false; // Prevent automatic upload
                                }}
                                maxCount={1}
                                listType="picture"
                                fileList={
                                    picturePreview
                                        ? [
                                            {
                                                uid: "-1",
                                                name: "Employee Picture",
                                                status: "done",
                                                url: picturePreview,
                                            },
                                        ]
                                        : []
                                }
                                onRemove={() => {
                                    handleRemove(); // Remove the image
                                    return false; // Prevent file browser from opening
                                }}
                                showUploadList={false} // Hide default list display
                            >
                                <Button
                                    icon={picturePreview ? <DeleteOutlined /> : <UploadOutlined />}
                                    onClick={(e) => {
                                        if (picturePreview) {
                                            e.stopPropagation(); // Prevent triggering file selection
                                            handleRemove();
                                        }
                                    }}
                                    style={{
                                        backgroundColor: picturePreview ? "red" : "black",
                                        color: "white",
                                        borderRadius: "4px",
                                        height: "40px",
                                        padding: "0 20px",
                                        border: "none",
                                    }}
                                >
                                    {picturePreview ? "Remove Image" : "Upload Image"}
                                </Button>
                            </Upload>
                            <Form.Item name="pic_filename" label="" style={{ height: 0, overflow: 'hidden', margin: 0, padding: 0 }}>
                                <Input type="hidden" />
                            </Form.Item>


                            {/* Add the facial recognition buttons below the Upload Picture button */}
                            <div style={{ marginTop: "20px" }}>
                                <Button
                                    icon={facialFeatures ? <DeleteOutlined /> : <CameraOutlined />}
                                    onClick={(e) => {
                                        if (facialFeatures) {
                                            handleRemoveFacialRecognition();
                                        } else {
                                            handleRegisterFacialRecognition();
                                        }
                                    }}
                                    style={{
                                        backgroundColor: facialFeatures ? "red" : "#28a745",
                                        color: "white",
                                        borderRadius: "4px",
                                        height: "40px",
                                        border: "none",
                                    }}
                                >
                                    {facialFeatures ? "Remove Facial Recognition" : "Register Facial Recognition"}
                                </Button>

                            </div>

                            {/* Add the FaceRegister modal */}
                            <FaceRegister
                                visible={isFaceRegisterVisible}
                                onCancel={() => setIsFaceRegisterVisible(false)}
                                onSave={handleSaveFacialFeatures}
                            />                            
                        </div>
                    </Col>
                </Row>

                {/* Second Major Row: Continuing with Row 4 and beyond */}
                {/* Fourth Row */}
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="address"
                            label="Address"
                        >
                            <Input placeholder="Enter Address" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="email"
                            label="Email"
                        >
                            <Input placeholder="Enter Email" />
                        </Form.Item>
                    </Col>
                </Row>

                {/* Fifth Row */}
                <Row gutter={16}>
                    <Col span={6}>
                        <Form.Item
                            name="emp_type_id"
                            label="Employee Type"
                            rules={[{ required: true, message: "Employee Type is required." }]}
                        >
                            <Select placeholder="Select Employee Type">
                                {employeeTypes.map((type) => (
                                    <Option key={type.empTypeId} value={type.empTypeId}>
                                        {type.empTypeDesc}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item
                            name="emp_status_id"
                            label="Employee Status"
                            rules={[{ required: true, message: "Employee Status is required." }]}
                        >
                            <Select placeholder="Select Employee Status">
                                {employeeStatuses.map((status) => (
                                    <Option key={status.empStatusId} value={status.empStatusId}>
                                        {status.empStatusDesc}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item
                            name="date_hired"
                            label="Date Hired"
                        >
                            <DatePicker style={{ width: "100%" }} />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item
                            name="date_end"
                            label="Date End"
                        >
                            <DatePicker style={{ width: "100%" }} />
                        </Form.Item>
                    </Col>
                </Row>

                {/* Console Access, Open Drawer and Active Flag */}
                <Row gutter={16}>
                <Col span={8}>
                    <Form.Item
                    name="console_flag"
                    valuePropName="checked"
                    label="Console Access"
                    style={{ marginBottom: "15px", display: "flex", alignItems: "center" }}
                    >
                    <Switch
                        onChange={(checked) => {
                        form.setFieldsValue({ console_flag: checked });
                        }}
                    />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item
                    name="drawer_flag"
                    valuePropName="checked"
                    label="Open Cash Drawer"
                    style={{ marginBottom: "15px", display: "flex", alignItems: "center" }}
                    >
                    <Switch
                        onChange={(checked) => {
                        form.setFieldsValue({ drawer_flag: checked });
                        }}
                    />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item
                    name="active_flag"
                    valuePropName="checked"
                    label="ACTIVE Employee"
                    style={{ marginBottom: "15px", display: "flex", alignItems: "center" }}
                    >
                    <Switch
                        onChange={(checked) => {
                        form.setFieldsValue({ active_flag: checked });
                        }}
                    />
                    </Form.Item>
                </Col>

                </Row>

                {/* Sixth Row */}
                <Row gutter={16}>
                    <Col span={6}>
                        <Form.Item
                            name="username"
                            label={<span className="custom-label">Username</span>} //"Username"
                            rules={[{ required: true, message: "Username is required." }]}
                        >
                            <Input placeholder="Enter Username" />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item
                            name="password"
                            label={<span className="custom-label">Password PIN</span>}//"Password PIN"
                            rules={[{ required: true, message: "Password is required." }]}
                        >
                            <Input.Password placeholder="Enter Password PIN" />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item
                            name="role_id"
                            label={<span className="custom-label">Role</span>}//"Role"
                            rules={[{ required: true, message: "Role is required." }]}
                        >
                            <Select placeholder="Select Role">
                                {roles.map((role) => (
                                    <Option key={role.id} value={role.id}>
                                        {role.name}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <style>
                {`
                    .custom-label {
                        color: #333333; /* Blue text */
                        font-weight: bold; /* Bold text */
                        padding: 4px 10px; /* Maintain padding if needed */
                        display: block;
                        width: 100%;
                        text-align: left;
                        box-sizing: border-box; /* Ensure padding is included in the width */
                    }
                `}
                </style>

                <Tabs
                    defaultActiveKey="1"
                    tabBarStyle={{
                        backgroundColor: "#fff",
                        borderBottom: "1px solid #d9d9d9",
                        padding: "0 16px",
                        marginBottom: 0,
                    }}
                    tabBarGutter={0}
                >
                <TabPane tab="Working Schedule" key="1">
                    <div
                    style={{
                        border: "1px solid #d9d9d9",
                        borderTop: "none",
                        borderRadius: "0 0 4px 4px",
                        padding: "8px",
                        backgroundColor: "#fff",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                    >
                    {/* Work Day Checkboxes */}
                    <div style={{ marginTop: "0px" }}>
                        <Row gutter={16}>
                        {["mon", "tue", "wed", "thu", "fri", "sat", "sun"].map((day) => (
                            <Col span={3} key={day}>
                            <Form.Item name={`${day}_restday`} valuePropName="checked">
                                <Checkbox>{day.toUpperCase()}</Checkbox>
                            </Form.Item>
                            </Col>
                        ))}
                        </Row>
                    </div>

                    {/* Time Fields Section */}
                    <div style={{ marginTop: "0px" }}>
                        <Row gutter={16}>
                        <Col span={3}><strong>Day</strong></Col>
                        <Col span={3}><strong>Start 1</strong></Col>
                        <Col span={3}><strong>End 1</strong></Col>
                        <Col span={3}><strong>Start 2</strong></Col>
                        <Col span={3}><strong>End 2</strong></Col>
                        <Col span={3}><strong>Start 3</strong></Col>
                        <Col span={3}><strong>End 3</strong></Col>
                        </Row>
                        {["mon", "tue", "wed", "thu", "fri", "sat", "sun"].map((day) => (
                        <Form.Item key={day} noStyle shouldUpdate>
                            {({ getFieldValue }) => {
                            const isRestDay = getFieldValue(`${day}_restday`);
                            return (
                                <Row gutter={16} style={{ marginTop: "0px", padding: "0. 0. 0. 0"}}>
                                <Col span={3}><strong>{day.toUpperCase()}</strong></Col>
                                {!isRestDay ? (
                                    <Col
                                    span={21}
                                    style={{
                                        display: "flex",
                                        alignItems: "center", // Vertically center the text
                                        height: "55px", // Match the height of the TimePicker boxes
                                        textAlign: "left", // Left-justify the text
                                        fontSize: "16px",
                                        fontWeight: "bold",
                                        color: "red", // Make the text red
                                        paddingLeft: "16px", // Add some padding to align with the other columns
                                        border: "0px solid #d9d9d9", // Optional: Add a border to match the TimePicker style
                                        borderRadius: "4px", // Optional: Add border radius to match the TimePicker style
                                    }}
                                    >
                                    REST DAY
                                    </Col>
                                ) : (
                                    <>
                                    <Col span={3}>
                                        <Form.Item name={`${day}_start1`}>
                                        <TimePicker format="HH:mm:ss" style={{ width: "100%" }} />
                                        </Form.Item>
                                    </Col>
                                    <Col span={3}>
                                        <Form.Item name={`${day}_end1`}>
                                        <TimePicker format="HH:mm:ss" style={{ width: "100%" }} />
                                        </Form.Item>
                                    </Col>
                                    <Col span={3}>
                                        <Form.Item name={`${day}_start2`}>
                                        <TimePicker format="HH:mm:ss" style={{ width: "100%" }} />
                                        </Form.Item>
                                    </Col>
                                    <Col span={3}>
                                        <Form.Item name={`${day}_end2`}>
                                        <TimePicker format="HH:mm:ss" style={{ width: "100%" }} />
                                        </Form.Item>
                                    </Col>
                                    <Col span={3}>
                                        <Form.Item name={`${day}_start3`}>
                                        <TimePicker format="HH:mm:ss" style={{ width: "100%" }} />
                                        </Form.Item>
                                    </Col>
                                    <Col span={3}>
                                        <Form.Item name={`${day}_end3`}>
                                        <TimePicker format="HH:mm:ss" style={{ width: "100%" }} />
                                        </Form.Item>
                                    </Col>
                                    </>
                                )}
                                </Row>
                            );
                            }}
                        </Form.Item>
                        ))}
                    </div>
                    </div>
                </TabPane>
                </Tabs>

                {/* Save and Cancel Buttons */}
                <div style={{ textAlign: "right", marginTop: "20px" }}>
                    <Button
                        type="primary"
                        htmlType="submit"
                        icon={<CheckOutlined />}
                        style={{
                            backgroundColor: "#007bff",
                            color: "white",
                            borderRadius: "4px",
                            height: "40px",
                            padding: "0 20px",
                            marginRight: "10px",
                        }}
                    >
                        Save
                    </Button>
                    <Button
                        onClick={() => setIsModalVisible(false)}
                        icon={<ArrowLeftOutlined />}
                        style={{
                            backgroundColor: "#dc3545",
                            color: "white",
                            borderRadius: "4px",
                            height: "40px",
                            padding: "0 20px",
                        }}
                    >
                        Cancel
                    </Button>
                </div>
            </Form>
        </Modal>
    </div>
    );
};

export default Employee;