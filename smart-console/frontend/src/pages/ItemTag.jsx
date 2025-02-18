import React, { useState, useEffect } from "react";
import axiosInstance from "../config/axiosConfig"; // Import the configured Axios instance
import { Button, Table, Form, Input, Space, Modal, message, Pagination, Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined, SearchOutlined, CheckOutlined, ArrowLeftOutlined } from "@ant-design/icons";

const ItemTag = () => {
    const [itemTags, setItemTags] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingItemTag, setEditingItemTag] = useState(null);
    const [form] = Form.useForm();
    const [searchForm] = Form.useForm();  // Separate form for search    
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    // Fetch all Item Tags on component mount
    useEffect(() => {
        fetchItemTags();
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

    // Fetch Item Tags from API
    const fetchItemTags = async () => {
        try {
            const response = await axiosInstance.get("/item_tag/all");
            setItemTags(response.data);
        } catch (error) {
            message.error("Failed to fetch food menu tags");
        }
    };

    // Search for Item Tags
    const handleSearch = async () => {
        try {
            const response = await axiosInstance.get(`/item_tag/all?search=${searchTerm}`);
            setItemTags(response.data);
        } catch (error) {
            //message.error("Failed to search food menu tags");
        }
    };

    // Reset search
    const handleReset = () => {
        setSearchTerm("");
        fetchItemTags();
    };

    // Add a New Item Tag
    const handleAdd = () => {
        setEditingItemTag(null);
        setIsModalVisible(true);
        form.resetFields();
    };

    // Edit an Existing Item Tag
    const handleEdit = (itemTag) => {
        setEditingItemTag(itemTag);
        setIsModalVisible(true);
        form.setFieldsValue({
            item_tag_desc: itemTag.itemTagDesc,
        });
    };

    // Delete an Item Tag
    const handleDelete = async (id) => {
        try {
            // Delete the Item Tag 
            await axiosInstance.delete(`/item_tag/delete/${id}`);
            message.success("Food menu tag deleted successfully");

            // Update the Item Tags state without fetching from the server
            const updatedItemTags = itemTags.filter((itemTag) => itemTag.itemTagId !== id);
            setItemTags(updatedItemTags);

            // Check if the updated Item Tags list is empty
            if (updatedItemTags.length === 0) {
                setCurrentPage(1); // Reset to the first page
            }
        } catch (error) {
            message.error("Failed to delete food menu tag.");
        }
    };

    // Handle Modal Submission (Add or Update Item Tag)
    const handleModalSubmit = async (values) => {
        try {
            if (editingItemTag) {
                // Update Item Tag 
                await axiosInstance.put(
                    `/item_tag/update/${editingItemTag.itemTagId}`,
                    null,
                    {
                        params: {
                            item_tag_desc: values.item_tag_desc,
                        },
                    }
                );
                message.success("Food menu tag updated successfully");
            } else {
                // Add New Item Tag 
                await axiosInstance.post(
                    `/item_tag/add`,
                    null,
                    {
                        params: {
                            item_tag_desc: values.item_tag_desc,
                        },
                    }
                );
                message.success("Food menu tag added successfully");
            }
            setIsModalVisible(false);
            fetchItemTags();
        } catch (error) {
            message.error("Failed to save food menu tag. Please try again.");
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
            title: "Food Menu Tag Name",
            dataIndex: "itemTagDesc",
            key: "itemTagDesc",
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
                        title="Are you sure to delete this food menu tag?"
                        onConfirm={() => handleDelete(record.itemTagId)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button icon={<DeleteOutlined />} danger />
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    // Paginate item tags
    const paginatedItemTags = itemTags.slice(
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
                Food Menu Tags
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
                    <Form form={form} layout="inline">
                        <Form.Item name="search">  
                            <Input
                                placeholder="Search food menu tags..."
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
                dataSource={paginatedItemTags}
                rowKey="itemTagId"
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
                total={itemTags.length}
                onChange={handlePageChange}
                style={{ marginTop: "10px", textAlign: "right" }}
            />
            <Modal
                title={editingItemTag ? "Edit Food Menu Tag" : "Add New Food Menu Tag"}
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
                        name="item_tag_desc"
                        label="Food Menu Tag Name"
                        rules={[{ required: true, message: "Food Menu Tag name is required." }]}
                        onChange={(e) => {
                            form.setFieldsValue({ item_tag_desc: e.target.value.toUpperCase() });
                        }}
                    >
                        <Input placeholder="Enter food menu tag name" />
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

export default ItemTag;