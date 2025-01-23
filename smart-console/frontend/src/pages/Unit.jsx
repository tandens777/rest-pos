import React, { useState, useEffect } from "react";
import axiosInstance from "../config/axiosConfig"; // Import the configured Axios instance
import { Button, Table, Form, Input, Space, Modal, message, Pagination, Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";

const Unit = () => {
    const [units, setUnits] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingUnit, setEditingUnit] = useState(null);
    const [form] = Form.useForm();
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    // Fetch all units on component mount
    useEffect(() => {
        fetchUnits();
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

    // Fetch Units from API
    const fetchUnits = async () => {
        try {
            const response = await axiosInstance.get("/units/all");
            // Map backend fields to camelCase
            const mappedUnits = response.data.map((unit) => ({
                ...unit,
                unitCode: unit.unitCode,
                unitDesc: unit.unitDesc,
            }));
            setUnits(mappedUnits);
        } catch (error) {
            message.error("Failed to fetch units.");
        }
    };

    // Search for Units
    const handleSearch = async () => {
        try {
            const response = await axiosInstance.get(`/units/all?search=${searchTerm}`);
            const mappedUnits = response.data.map((unit) => ({
                ...unit,
                unitCode: unit.unitCode,
                unitDesc: unit.unitDesc,
            }));
            setUnits(mappedUnits);
        } catch (error) {
            message.error("Failed to search units.");
        }
    };

    // Reset search
    const handleReset = () => {
        setSearchTerm("");
        fetchUnits();
    };

    // Add a New Unit
    const handleAdd = () => {
        setEditingUnit(null);
        setIsModalVisible(true);
        form.resetFields();
    };

    // Edit an Existing Unit
    const handleEdit = (unit) => {
        setEditingUnit(unit);
        setIsModalVisible(true);
        form.setFieldsValue({
            unitCode: unit.unitCode,
            unitDesc: unit.unitDesc,
        });
    };

    // Delete a Unit
    const handleDelete = async (id) => {
        try {
            await axiosInstance.delete(`/units/delete/${id}`);
            message.success("Unit deleted successfully.");
            fetchUnits();
        } catch (error) {
            message.error("Failed to delete unit.");
        }
    };

    // Handle Modal Submission (Add or Update Unit)
    const handleModalSubmit = async (values) => {
        try {
            if (editingUnit) {
                // Update Unit
                await axiosInstance.put(
                    `/units/update/${editingUnit.id}`,
                    null,
                    {
                        params: {
                            unit_code: values.unitCode,
                            unit_desc: values.unitDesc,
                        },
                    }
                );
                message.success("Unit updated successfully.");
            } else {
                // Add New Unit
                await axiosInstance.post(
                    `/units/add`,
                    null,
                    {
                        params: {
                            unit_code: values.unitCode,
                            unit_desc: values.unitDesc,
                        },
                    }
                );
                message.success("Unit added successfully.");
            }
            setIsModalVisible(false);
            fetchUnits();
        } catch (error) {
            message.error("Failed to save unit. Please try again.");
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
            title: "Unit Code",
            dataIndex: "unitCode",
            key: "unitCode",
            width: "40%",
        },
        {
            title: "Unit Description",
            dataIndex: "unitDesc",
            key: "unitDesc",
            width: "40%",
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
                        title="Are you sure to delete this unit?"
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

    // Paginate units
    const paginatedUnits = units.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    return (
        <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
            <h1 style={{ fontSize: "24px", fontWeight: "bold", textAlign: "center", marginBottom: "20px" }}>Unit of Measure Setup</h1>
            <Space style={{ marginBottom: "20px", width: "100%", justifyContent: "space-between" }}>
                <Space>
                    <Input
                        placeholder="Search units..."
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
                        type="primary"
                        onClick={handleReset}
                    >
                        Reset
                    </Button>
                </Space>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={handleAdd}
                    style={{ backgroundColor: "#1890ff", borderColor: "#1890ff" }}
                >
                    Add New
                </Button>
            </Space>
            <Table
                columns={columns}
                dataSource={paginatedUnits}
                rowKey="id"
                pagination={false}
                locale={{
                    emptyText: "No data available.",
                }}
                style={{
                    border: "1px solid #f0f0f0",
                }}
                scroll={{ x: true }}
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
                rowClassName={() => "custom-row"}
            />
            <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={units.length}
                onChange={handlePageChange}
                style={{ marginTop: "20px", textAlign: "right" }}
            />
            <Modal
                title={editingUnit ? "Edit Unit" : "Add New Unit"}
                visible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                onOk={() => form.submit()}
                centered
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleModalSubmit}
                >
                    <Form.Item
                        name="unitCode"
                        label="Unit Code"
                        rules={[{ required: true, message: "Unit code is required." }]}
                    >
                        <Input placeholder="Enter unit code" />
                    </Form.Item>
                    <Form.Item
                        name="unitDesc"
                        label="Unit Description"
                        rules={[{ required: true, message: "Unit description is required." }]}
                    >
                        <Input placeholder="Enter unit description" />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default Unit;
