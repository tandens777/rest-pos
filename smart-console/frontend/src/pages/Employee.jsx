import React, { useState, useEffect } from "react";
import axiosInstance from "../config/axiosConfig"; // Import the configured Axios instance
import { Button, Table, Form, Input, Space, Modal, message, Pagination, Popconfirm, Select, DatePicker, TimePicker, Col, Row } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined, SearchOutlined, CheckOutlined, ArrowLeftOutlined } from "@ant-design/icons";

const { Option } = Select;

const Employee = () => {
    const [employees, setEmployees] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingEmployee, setEditingEmployee] = useState(null);
    const [form] = Form.useForm();
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    // Fetch all employees on component mount
    useEffect(() => {
        fetchEmployees();
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
            const response = await axiosInstance.get("/api/employees/all");
            setEmployees(response.data);
        } catch (error) {
            message.error("Failed to fetch employees.");
        }
    };

    // Search for Employees
    const handleSearch = async () => {
        try {
            const response = await axiosInstance.get(`/api/employees/all?search=${searchTerm}`);
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
            emp_no: employee.emp_no,
            station_id: employee.station_id,
            first_nm: employee.first_nm,
            last_nm: employee.last_nm,
            gender: employee.gender,
            bday: employee.bday,
            tin_no: employee.tin_no,
            phone_no: employee.phone_no,
            sss_no: employee.sss_no,
            employee_type: employee.employee_type,
            date_hired: employee.date_hired,
            employee_status: employee.employee_status,
            date_end: employee.date_end,
            // Add time fields here
        });
    };

    // Delete an Employee
    const handleDelete = async (id) => {
        try {
            await axiosInstance.delete(`/api/employees/delete/${id}`);
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
            if (editingEmployee) {
                await axiosInstance.put(
                    `/api/employees/update/${editingEmployee.id}`,
                    null,
                    {
                        params: {
                            ...values,
                        },
                    }
                );
                message.success("Employee updated successfully.");
            } else {
                await axiosInstance.post(
                    `/api/employees/add`,
                    null,
                    {
                        params: {
                            ...values,
                        },
                    }
                );
                message.success("Employee added successfully.");
            }
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
                                name="station_id"
                                label="Station ID"
                                rules={[{ required: true, message: "Station ID is required." }]}
                            >
                                <Input placeholder="Enter Station ID" />
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
                                name="tin_no"
                                label="TIN #"
                                rules={[{ required: true, message: "TIN # is required." }]}
                            >
                                <Input placeholder="Enter TIN #" />
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
                    </Row>

                    {/* Third Row */}
                    <Row gutter={16}>
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
                                name="employee_type"
                                label="Employee Type"
                                rules={[{ required: true, message: "Employee Type is required." }]}
                            >
                                <Select placeholder="Select Employee Type">
                                    <Option value="Weekly">Weekly</Option>
                                    <Option value="Monthly">Monthly</Option>
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
                                name="employee_status"
                                label="Employee Status"
                                rules={[{ required: true, message: "Employee Status is required." }]}
                            >
                                <Select placeholder="Select Employee Status">
                                    <Option value="Casual">Casual</Option>
                                    <Option value="Probation">Probation</Option>
                                    <Option value="Regular">Regular</Option>
                                    <Option value="Terminated">Terminated</Option>
                                    <Option value="Resigned">Resigned</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>

                    {/* Fourth Row */}
                    <Row gutter={16}>
                        <Col span={6}>
                            <Form.Item
                                name="date_end"
                                label="Date End"
                            >
                                <DatePicker style={{ width: "100%" }} />
                            </Form.Item>
                        </Col>
                    </Row>

                    {/* Time Fields Section */}
                    <div style={{ marginTop: "20px" }}>
                        <h4>Time Schedule</h4>
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