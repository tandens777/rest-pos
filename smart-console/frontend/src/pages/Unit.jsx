import React, { useState, useEffect } from "react";
import axiosInstance from "../config/axiosConfig"; // Import the configured Axios instance
import { Button, Table, Form, Input, Space, Modal, message, Pagination, Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined, SearchOutlined, CheckOutlined, ArrowLeftOutlined } from "@ant-design/icons";

const Unit = () => {
    const [loading, setLoading] = useState(false);

    const [units, setUnits] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingUnit, setEditingUnit] = useState(null);
    const [form] = Form.useForm();
    const [searchForm] = Form.useForm();  // Separate form for search
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
            setLoading(true); // Show spinner
            const response = await axiosInstance.get("/units/all");
            setUnits(response.data);
        } catch (error) {
            //message.error("Failed to fetch units.");
        } finally {
            setLoading(false); // Hide spinner
        }
    };

    // Search for Units
    const handleSearch = async () => {
        try {
            setLoading(true); // Show spinner
            const response = await axiosInstance.get(`/units/all?search=${searchTerm}`);
            setUnits(response.data);
        } catch (error) {
            message.error("Failed to search units.");
        } finally {
            setLoading(false); // Hide spinner
        }
    };

    // Reset search
    const handleReset = () => {
        searchForm.resetFields();
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
            unit_code: unit.unitCode,
            unit_desc: unit.unitDesc,
        });
    };

    // Delete a Unit
    const handleDelete = async (id) => {
        try {
            // Delete the unit
            await axiosInstance.delete(`/units/delete/${id}`);
            message.success("Unit deleted successfully.");

            // Update the units state without fetching from the server
            const updatedUnits = units.filter((unit) => unit.id !== id);
            setUnits(updatedUnits);

            // Check if the updated units list is empty
            if (updatedUnits.length === 0) {
                setCurrentPage(1); // Reset to the first page
            }
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
                            unit_code: values.unit_code,
                            unit_desc: values.unit_desc,
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
                            unit_code: values.unit_code,
                            unit_desc: values.unit_desc,
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
        <>
{/* Show loading spinner if data is being fetched */}
{loading ? (    
    <div className="flex justify-center items-center min-h-[400px]">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
    </div>
) : (                
            <div
                style={{
                    padding: "20px",
                    fontFamily: "'Roboto', sans-serif",
                    backgroundColor: "#f9f9f9",
                    borderRadius: "8px",
                    maxWidth: "800px",
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
                Unit of Measure
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
                    <Form form={searchForm}
                        layout="inline"
                    >
                        <Form.Item name="search">  
                            <Input
                                placeholder="Search units..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={{ width: "200px" }}
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button
                                type="primary"
                                icon={<SearchOutlined />}
                                htmlType="submit" 
                                onClick={handleSearch}
                            >
                                Search
                            </Button>
                        </Form.Item>

                        <Form.Item>
                            <Button
                            type="default"
                            onClick={handleReset}
                            style={{ backgroundColor: "#1890ff", color: "#fff" }}
                            >
                                Reset
                            </Button>
                        </Form.Item>
                    </Form>
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
                dataSource={paginatedUnits}
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
                total={units.length}
                onChange={handlePageChange}
                style={{ marginTop: "10px", textAlign: "right" }}
            />
            <Modal
                title={editingUnit ? "Edit Unit" : "Add New Unit"}
                visible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
                centered
                width="400px"
                maskStyle={{
                    backgroundColor: "rgba(0, 0, 0, 0.6)",
                }}
                style={{
                    top: "20px", // Adjust the top position
                    maxWidth: "90%", // Ensure the modal doesn't exceed the screen width
                }}
                bodyStyle={{
                    padding: "20px",
                    borderRadius: "8px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                }}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleModalSubmit}
                >
                    <Form.Item
                        name="unit_code"
                        label="Unit Code"
                        rules={[{ required: true, message: "Unit code is required." }]}
                        onChange={(e) => {
                            form.setFieldsValue({ unit_code: e.target.value.toUpperCase() });
                        }}
                    >
                        <Input placeholder="Enter unit code" />
                    </Form.Item>
                    <Form.Item
                        name="unit_desc"
                        label="Unit Description"
                        rules={[{ required: true, message: "Unit description is required." }]}
                    >
                        <Input placeholder="Enter unit description" />
                    </Form.Item>
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
    )}
    </>
            
    );
};

export default Unit;