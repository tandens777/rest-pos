import React, { useState, useEffect } from "react";
import axiosInstance from "../config/axiosConfig"; // Import the configured Axios instance
import { Button, Table, Form, Input, Space, Modal, message, Pagination, Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined, SearchOutlined, CheckOutlined, ArrowLeftOutlined } from "@ant-design/icons";

const ItemGroup = () => {
    const [itemGroups, setItemGroups] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingItemGroup, setEditingItemGroup] = useState(null);
    const [form] = Form.useForm();
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    // Fetch all Item Groups on component mount
    useEffect(() => {
        fetchItemGroups();
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

    // Fetch Item Groups from API
    const fetchItemGroups = async () => {
        try {
            const response = await axiosInstance.get("/item_group/all");
            setItemGroups(response.data);
        } catch (error) {
            message.error("Failed to fetch food menu groups");
        }
    };

    // Search for Item Groups
    const handleSearch = async () => {
        try {
            const response = await axiosInstance.get(`/item_group/all?search=${searchTerm}`);
            setItemGroups(response.data);
        } catch (error) {
            message.error("Failed to search food menu groups");
        }
    };

    // Reset search
    const handleReset = () => {
        setSearchTerm("");
        fetchItemGroups();
    };

    // Add a New Item Group
    const handleAdd = () => {
        setEditingItemGroup(null);
        setIsModalVisible(true);
        form.resetFields();
    };

    // Edit an Existing Item Groups
    const handleEdit = (itemGroup) => {
        setEditingItemGroup(itemGroup);
        setIsModalVisible(true);
        form.setFieldsValue({
            name: itemGroup.itemGrpDesc,
        });
    };

    // Delete a Item Group
    const handleDelete = async (id) => {
        try {
            // Delete the Item Group 
            await axiosInstance.delete(`/item_group/delete/${id}`);
            message.success("Food menu group deleted successfully");

            // Update the Item Groups state without fetching from the server
            const updatedItemGroups = itemGroups.filter((itemGroup) => itemGroup.itemGrpId !== id);
            setFoodStations(updatedItemGroups);

            // Check if the updated Item Groups list is empty
            if (updatedItemGroups.length === 0) {
                setCurrentPage(1); // Reset to the first page
            }
        } catch (error) {
            message.error("Failed to delete food menu group.");
        }
    };

    // Handle Modal Submission (Add or Update Item Group )
    const handleModalSubmit = async (values) => {
        try {
            if (editingItemGroup) {
                // Update Item Group 
                await axiosInstance.put(
                    `/item_group/update/${editingItemGroup.itemGrpId}`,
                    null,
                    {
                        params: {
                            name: values.name,
                        },
                    }
                );
                message.success("Food menu group updated successfully");
            } else {
                // Add New Item Group 
                await axiosInstance.post(
                    `/item_group/add`,
                    null,
                    {
                        params: {
                            name: values.name,
                        },
                    }
                );
                message.success("Food menu group added successfully");
            }
            setIsModalVisible(false);
            fetchItemGroups();
        } catch (error) {
            message.error("Failed to save food menu group. Please try again.");
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
            title: "Food Menu Group Name",
            dataIndex: "itemGrpDesc",
            key: "itemGrpDesc",
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
                        title="Are you sure to delete this food menu group?"
                        onConfirm={() => handleDelete(record.itemGrpId)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button icon={<DeleteOutlined />} danger />
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    // Paginate item groups
    const paginatedItemGroups = itemGroups.slice(
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
                Food Menu Groups
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
                        placeholder="Search food menu groups..."
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
                dataSource={paginatedItemGroups}
                rowKey="stationId"
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
                total={itemGroups.length}
                onChange={handlePageChange}
                style={{ marginTop: "10px", textAlign: "right" }}
            />
            <Modal
                title={editingItemGroup ? "Edit Food Menu Group" : "Add New Food Menu Group"}
                visible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
                centered
                width="400px"
                maskStyle={{
                    backgroundColor: "rgba(0, 0, 0, 0.6)",
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
                        name="name"
                        label="Food Menu Group Name"
                        rules={[{ required: true, message: "Food Menu Group name is required." }]}
                    >
                        <Input placeholder="Enter food menu group name" />
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
    );
};

export default ItemGroup;