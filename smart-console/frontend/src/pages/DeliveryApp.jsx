import React, { useState, useEffect } from "react";
import axiosInstance from "../config/axiosConfig"; // Import the configured Axios instance
import { Button, Table, Form, Input, Space, Modal, message, Pagination, Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined, SearchOutlined, CheckOutlined, ArrowLeftOutlined } from "@ant-design/icons";

const DeliveryApp = () => {
    const [deliveryApps, setDeliveryApps] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingDeliveryApp, setEditingDeliveryApp] = useState(null);
    const [form] = Form.useForm();
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    // Fetch all delivery apps on component mount
    useEffect(() => {
        fetchDeliveryApps();
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

    // Fetch Delivery Apps from API
    const fetchDeliveryApps = async () => {
        try {
            const response = await axiosInstance.get("/delivery_apps/all");
            setDeliveryApps(response.data);
        } catch (error) {
            message.error("Failed to fetch delivery apps.");
        }
    };

    // Search for Delivery Apps
    const handleSearch = async () => {
        try {
            const response = await axiosInstance.get(`/delivery_apps/all?search=${searchTerm}`);
            setDeliveryApps(response.data);
        } catch (error) {
            message.error("Failed to search delivery apps.");
        }
    };

    // Reset search
    const handleReset = () => {
        setSearchTerm("");
        fetchDeliveryApps();
    };

    // Add a New Delivery App
    const handleAdd = () => {
        setEditingDeliveryApp(null);
        setIsModalVisible(true);
        form.resetFields();
    };

    // Edit an Existing Delivery App
    const handleEdit = (deliveryApp) => {
        setEditingDeliveryApp(deliveryApp);
        setIsModalVisible(true);
        form.setFieldsValue({
            app_nm: deliveryApp.appNm,
            order_type: deliveryApp.orderType,
            active_flag: deliveryApp.activeFlag,
            table_count: deliveryApp.tableCount,
            pic_filename: deliveryApp.picFilename,
        });
    };

    // Delete a Delivery App
    const handleDelete = async (id) => {
        try {
            // Delete the delivery app
            await axiosInstance.delete(`/delivery_apps/delete/${id}`);
            message.success("Delivery app deleted successfully.");

            // Update the delivery apps state without fetching from the server
            const updatedDeliveryApps = deliveryApps.filter((app) => app.id !== id);
            setDeliveryApps(updatedDeliveryApps);

            // Check if the updated delivery apps list is empty
            if (updatedDeliveryApps.length === 0) {
                setCurrentPage(1); // Reset to the first page
            }
        } catch (error) {
            message.error("Failed to delete delivery app.");
        }
    };

    // Handle Modal Submission (Add or Update Delivery App)
    const handleModalSubmit = async (values) => {
        try {
            if (editingDeliveryApp) {
                // Update Delivery App
                await axiosInstance.put(
                    `/delivery_apps/update/${editingDeliveryApp.id}`,
                    null,
                    {
                        params: {
                            app_nm: values.app_nm,
                            order_type: values.order_type,
                            active_flag: values.active_flag,
                            table_count: values.table_count,
                            pic_filename: values.pic_filename,
                        },
                    }
                );
                message.success("Delivery app updated successfully.");
            } else {
                // Add New Delivery App
                await axiosInstance.post(
                    `/delivery_apps/add`,
                    null,
                    {
                        params: {
                            app_nm: values.app_nm,
                            order_type: values.order_type,
                            active_flag: values.active_flag,
                            table_count: values.table_count,
                            pic_filename: values.pic_filename,
                        },
                    }
                );
                message.success("Delivery app added successfully.");
            }
            setIsModalVisible(false);
            fetchDeliveryApps();
        } catch (error) {
            message.error("Failed to save delivery app. Please try again.");
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
            title: "App Name",
            dataIndex: "appNm",
            key: "appNm",
            width: "20%",
        },
        {
            title: "Order Type",
            dataIndex: "orderType",
            key: "orderType",
            width: "15%",
        },
        {
            title: "Active Flag",
            dataIndex: "activeFlag",
            key: "activeFlag",
            width: "15%",
        },
        {
            title: "Table Count",
            dataIndex: "tableCount",
            key: "tableCount",
            width: "15%",
        },
        {
            title: "Picture Filename",
            dataIndex: "picFilename",
            key: "picFilename",
            width: "20%",
        },
        {
            title: "Actions",
            key: "actions",
            width: "15%",
            render: (text, record) => (
                <Space size="middle" style={{ justifyContent: "flex-end" }}>
                    <Button
                        icon={<EditOutlined />}
                        onClick={() => handleEdit(record)}
                    />
                    <Popconfirm
                        title="Are you sure to delete this delivery app?"
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

    // Paginate delivery apps
    const paginatedDeliveryApps = deliveryApps.slice(
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
                Food Delivery App Management
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
                        placeholder="Search delivery apps..."
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
                dataSource={paginatedDeliveryApps}
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
                total={deliveryApps.length}
                onChange={handlePageChange}
                style={{ marginTop: "10px", textAlign: "right" }}
            />
            <Modal
                title={editingDeliveryApp ? "Edit Delivery App" : "Add New Delivery App"}
                visible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
                centered
                width="600px"
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
                        name="app_nm"
                        label="App Name"
                        rules={[{ required: true, message: "App name is required." }]}
                    >
                        <Input placeholder="Enter app name" />
                    </Form.Item>
                    <Form.Item
                        name="order_type"
                        label="Order Type"
                        rules={[{ required: true, message: "Order type is required." }]}
                    >
                        <Input placeholder="Enter order type" />
                    </Form.Item>
                    <Form.Item
                        name="active_flag"
                        label="Active Flag"
                        rules={[{ required: true, message: "Active flag is required." }]}
                    >
                        <Input placeholder="Enter active flag" />
                    </Form.Item>
                    <Form.Item
                        name="table_count"
                        label="Table Count"
                        rules={[{ required: true, message: "Table count is required." }]}
                    >
                        <Input type="number" placeholder="Enter table count" />
                    </Form.Item>
                    <Form.Item
                        name="pic_filename"
                        label="Picture Filename"
                        rules={[{ required: true, message: "Picture filename is required." }]}
                    >
                        <Input placeholder="Enter picture filename" />
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

export default DeliveryApp;