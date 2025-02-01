import React, { useState, useEffect } from "react";
import axiosInstance from "../config/axiosConfig"; // Import the configured Axios instance
import { Button, Table, Form, Input, Space, Modal, message, Pagination, Popconfirm, Select, DatePicker, TimePicker, Col, Row, Checkbox } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined, SearchOutlined, CheckOutlined, ArrowLeftOutlined } from "@ant-design/icons";

const { Option } = Select;

const Employee = () => {
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
            first_nm: employee.firstNm,
            last_nm: employee.lastNm,
            gender: employee.gender,
            station_id: employee.stationId,
            tin_no: employee.tinNo,
            sss_no: employee.sssNo,
            bday: employee.bday,
            phone_no: employee.phoneNo,
            date_hired: employee.dateHired,
            date_end: employee.dateEnd,
            remarks: employee.remarks,
            face_id: employee.faceId,
            public_key: employee.publicKey,
            console_flag: employee.consoleFlag,
            drawer_flag: employee.drawerFlag,
            active_flag: employee.activeFlag,
            pic_filename: employee.picFilename,
            address: employee.address,
            email: employee.email,
            emp_type_id: employee.empTypeId,
            emp_status_id: employee.empStatusId,
            password: employee.password,
            username: employee.username,
            role_id: employee.roleId,
            
            mon_restday: employee.monRestday, mon_start1: employee.monStart1, mon_end1: employee.monEnd1, mon_start2: employee.monStart2, mon_end2: employee.monEnd2, mon_start3: employee.monStart3, mon_end3: employee.monEnd3,
            tue_restday: employee.tueRestday, tue_start1: employee.tueStart1, tue_end1: employee.tueEnd1, tue_start2: employee.tueStart2, tue_end2: employee.tueEnd2, tue_start3: employee.tueStart3, tue_end3: employee.tueEnd3,
            wed_restday: employee.wedRestday, wed_start1: employee.wedStart1, wed_end1: employee.wedEnd1, wed_start2: employee.wedStart2, wed_end2: employee.wedEnd2, wed_start3: employee.wedStart3, wed_end3: employee.wedEnd3,
            thu_restday: employee.thuRestday, thu_start1: employee.thuStart1, thu_end1: employee.thuEnd1, thu_start2: employee.thuStart2, thu_end2: employee.thuEnd2, thu_start3: employee.thuStart3, thu_end3: employee.thuEnd3,
            fri_restday: employee.friRestday, fri_start1: employee.friStart1, fri_end1: employee.friEnd1, fri_start2: employee.friStart2, fri_end2: employee.friEnd2, fri_start3: employee.friStart3, fri_end3: employee.friEnd3,
            sat_restday: employee.satRestday, sat_start1: employee.satStart1, sat_end1: employee.satEnd1, sat_start2: employee.satStart2, sat_end2: employee.satEnd2, sat_start3: employee.satStart3, sat_end3: employee.satEnd3,
            sun_restday: employee.sunRestday, sun_start1: employee.sunStart1, sun_end1: employee.sunEnd1, sun_start2: employee.sunStart2, sun_end2: employee.sunEnd2, sun_start3: employee.sunStart3, sun_end3: employee.sunEnd3
        });
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
        try {
            // Prepare employee data
            const employeeData = {
                first_nm: values.first_nm,
                last_nm: values.last_nm,
                gender: values.gender,
                station_id: values.station_id,
                tin_no: values.tin_no,
                sss_no: values.sss_no,
                bday: values.bday,
                phone_no: values.phone_no,
                date_hired: values.date_hired,
                date_end: values.date_end,
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

                // Weekly schedule fields
                ...['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'].reduce((acc, day) => ({
                    ...acc,
                    [`${day}_restday`]: values[`${day}_restday`],
                    [`${day}_start1`]: values[`${day}_start1`],
                    [`${day}_end1`]: values[`${day}_end1`],
                    [`${day}_start2`]: values[`${day}_start2`],
                    [`${day}_end2`]: values[`${day}_end2`],
                    [`${day}_start3`]: values[`${day}_start3`],
                    [`${day}_end3`]: values[`${day}_end3`],
                }), {})
            };

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

    // Table Columns
    const columns = [
        {
            title: "Employee No",
            dataIndex: "emp_no",
            key: "emp_no",
            width: "20%",
        },
        {
            title: "Name",
            key: "name",
            width: "30%",
            render: (text, record) => `${record.last_nm}, ${record.first_nm}`,
        },
        {
            title: "Photo",
            dataIndex: "pic_filename",
            key: "pic_filename",
            width: "20%",
        },
        {
            title: "Status",
            dataIndex: "active_flag",
            key: "active_flag",
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
                Employee Management
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
                    {/* First Row */}
                    <Row gutter={16}>
                        <Col span={6}>
                            <Form.Item
                                name="emp_no"
                                label="Employee No"
                                rules={[{ required: true, message: "Employee No is required." }]}
                            >
                                <Input placeholder="Enter Employee No" />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                name="first_nm"
                                label="First Name"
                                rules={[{ required: true, message: "First Name is required." }]}
                            >
                                <Input placeholder="Enter First Name" />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                name="last_nm"
                                label="Last Name"
                                rules={[{ required: true, message: "Last Name is required." }]}
                            >
                                <Input placeholder="Enter Last Name" />
                            </Form.Item>
                        </Col>

                    </Row>

                    {/* Second Row */}
                    <Row gutter={16}>
                        <Col span={6}>
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
                        <Col span={6}>
                            <Form.Item
                                name="bday"
                                label="Date of Birth"
                                rules={[{ required: true, message: "Date of Birth is required." }]}
                            >
                                <DatePicker style={{ width: "100%" }} />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
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

                    {/* Third Row */}
                    <Row gutter={16}>
                        <Col span={6}>
                            <Form.Item
                                name="tin_no"
                                label="TIN #"
                                rules={[{ required: true, message: "TIN # is required." }]}
                            >
                                <Input placeholder="Enter TIN #" />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                name="sss_no"
                                label="SSS #"
                                rules={[{ required: true, message: "SSS # is required." }]}
                            >
                                <Input placeholder="Enter SSS #" />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                name="phone_no"
                                label="Phone"
                                rules={[{ required: true, message: "Phone is required." }]}
                            >
                                <Input placeholder="Enter Phone" />
                            </Form.Item>
                        </Col>
                    </Row
                    >

                    {/* Fourth Row */}
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="address"
                                label="Address"
                                rules={[{ required: true, message: "Address is required." }]}
                            >
                                <Input placeholder="Enter Address" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="email"
                                label="Email"
                                rules={[{ required: true, message: "Email is required." }]}
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
                                rules={[{ required: true, message: "Date Hired is required." }]}
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
                                        <TimePicker format="HH:mm" style={{ width: "100%" }} />
                                    </Form.Item>
                                </Col>
                                <Col span={3}>
                                    <Form.Item name={`${day.toLowerCase()}_end1`}>
                                        <TimePicker format="HH:mm" style={{ width: "100%" }} />
                                    </Form.Item>
                                </Col>
                                <Col span={3}>
                                    <Form.Item name={`${day.toLowerCase()}_start2`}>
                                        <TimePicker format="HH:mm" style={{ width: "100%" }} />
                                    </Form.Item>
                                </Col>
                                <Col span={3}>
                                    <Form.Item name={`${day.toLowerCase()}_end2`}>
                                        <TimePicker format="HH:mm" style={{ width: "100%" }} />
                                    </Form.Item>
                                </Col>
                                <Col span={3}>
                                    <Form.Item name={`${day.toLowerCase()}_start3`}>
                                        <TimePicker format="HH:mm" style={{ width: "100%" }} />
                                    </Form.Item>
                                </Col>
                                <Col span={3}>
                                    <Form.Item name={`${day.toLowerCase()}_end3`}>
                                        <TimePicker format="HH:mm" style={{ width: "100%" }} />
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