import React, { useState, useEffect } from "react";
import axiosInstance from "../config/axiosConfig"; // Import the configured Axios instance
import { Button, Table, Form, Input, Space, Modal, message, Pagination, Popconfirm, Select, DatePicker, TimePicker, Col, Row, Checkbox, Upload, Avatar, Switch } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined, SearchOutlined, CheckOutlined, ArrowLeftOutlined, UploadOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

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
                setPageSize(5);
            } else if (screenWidth < 1200) {
                setPageSize(10);
            } else {
                setPageSize(15);
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
            face_id: employee.faceId,
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
                [`${day}_restday`]: employee[`${day}Restday`] === "Y",
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
        console.log('Enter saving data by calling api', values);
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
                face_id: values.face_id,
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

                // Convert TimePicker values to 'HH:mm:ss' format
                ...["mon", "tue", "wed", "thu", "fri", "sat", "sun"].reduce((acc, day) => ({
                    ...acc,
                    [`${day}_restday`]: values[`${day}_restday`] ? "Y" : "N",
                    [`${day}_start1`]: values[`${day}_start1`] ? dayjs(values[`${day}_start1`]).format("HH:mm:ss") : null,
                    [`${day}_end1`]: values[`${day}_end1`] ? dayjs(values[`${day}_end1`]).format("HH:mm:ss") : null,
                    [`${day}_start2`]: values[`${day}_start2`] ? dayjs(values[`${day}_start2`]).format("HH:mm:ss") : null,
                    [`${day}_end2`]: values[`${day}_end2`] ? dayjs(values[`${day}_end2`]).format("HH:mm:ss") : null,
                    [`${day}_start3`]: values[`${day}_start3`] ? dayjs(values[`${day}_start3`]).format("HH:mm:ss") : null,
                    [`${day}_end3`]: values[`${day}_end3`] ? dayjs(values[`${day}_end3`]).format("HH:mm:ss") : null,
                }), {}),

            };

            console.log("Form values on submit:", employeeData);


            // Choose API method based on edit mode
            const url = editingEmployee ? `/employees/update/${editingEmployee.id}` : `/employees/add`;
            const method = editingEmployee ? 'put' : 'post';

            // Send request
            await axiosInstance[method](url, null, { params: employeeData });

            // Success message
            message.success(`Employee ${editingEmployee ? 'updated' : 'added'} successfully.`);

            // Close modal and refresh list
            setIsModalVisible(false);
            fetchEmployees();
        } catch (error) {
            message.error("Failed to save employee. Please try again.");
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
                                <Form.Item name="tin_no" label="TIN #">
                                    <Input placeholder="Enter TIN #" />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item name="sss_no" label="SSS #">
                                    <Input placeholder="Enter SSS #" />
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
                            <Form.Item name="pic_filename" label="">
                                    <Input type="hidden" />
                            </Form.Item>
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
                            label="Username"
                            rules={[{ required: true, message: "Username is required." }]}
                        >
                            <Input placeholder="Enter Username" />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item
                            name="password"
                            label="Password PIN"
                            rules={[{ required: true, message: "Password is required." }]}
                        >
                            <Input placeholder="Enter Password PIN" />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item
                            name="role_id"
                            label="Role"
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


                {/* Work Day Checkboxes */}
                <div style={{ marginTop: "20px" }}>
                    <h4>Time Schedule</h4>
                    <Row gutter={16}>
                        {["mon", "tue", "wed", "thu", "fri", "sat", "sun"].map((day) => (
                            <Col span={3} key={day}>
                                <Form.Item
                                    name={`${day}_restday`}
                                    valuePropName="checked"
                                >
                                    <Checkbox>{day.toUpperCase()}</Checkbox>
                                </Form.Item>
                            </Col>
                        ))}
                    </Row>
                </div>

                {/* Time Fields Section */}
                <div style={{ marginTop: "20px" }}>
                    <Row gutter={16}>
                        <Col span={3}><strong>Day</strong></Col>
                        <Col span={3}><strong>Start 1</strong></Col>
                        <Col span={3}><strong>End 1</strong></Col>
                        <Col span={3}><strong>Start 2</strong></Col>
                        <Col span={3}><strong>End 2</strong></Col>
                        <Col span={3}><strong>Start 3</strong></Col>
                        <Col span={3}><strong>End 3</strong></Col>
                    </Row>
                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                        <Row gutter={16} key={day} style={{ marginTop: "10px" }}>
                            <Col span={3}><strong>{day}</strong></Col>
                            <Col span={3}>
                                <Form.Item name={`${day.toLowerCase()}_start1`}>
                                    <TimePicker format="HH:mm:ss" style={{ width: "100%" }} />
                                </Form.Item>
                            </Col>
                            <Col span={3}>
                                <Form.Item name={`${day.toLowerCase()}_end1`}>
                                    <TimePicker format="HH:mm:ss" style={{ width: "100%" }} />
                                </Form.Item>
                            </Col>
                            <Col span={3}>
                                <Form.Item name={`${day.toLowerCase()}_start2`}>
                                    <TimePicker format="HH:mm:ss" style={{ width: "100%" }} />
                                </Form.Item>
                            </Col>
                            <Col span={3}>
                                <Form.Item name={`${day.toLowerCase()}_end2`}>
                                    <TimePicker format="HH:mm:ss" style={{ width: "100%" }} />
                                </Form.Item>
                            </Col>
                            <Col span={3}>
                                <Form.Item name={`${day.toLowerCase()}_start3`}>
                                    <TimePicker format="HH:mm:ss" style={{ width: "100%" }} />
                                </Form.Item>
                            </Col>
                            <Col span={3}>
                                <Form.Item name={`${day.toLowerCase()}_end3`}>
                                    <TimePicker format="HH:mm:ss" style={{ width: "100%" }} />
                                </Form.Item>
                            </Col>
                        </Row>
                    ))}
                </div>

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