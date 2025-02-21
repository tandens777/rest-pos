import React, { useState, useEffect } from "react";
import axiosInstance from "../config/axiosConfig"; // Import the configured Axios instance
import { Button, Table, Form, Input, Space, Modal, message, Pagination, Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined, SearchOutlined, CheckOutlined, ArrowLeftOutlined } from "@ant-design/icons";

const StorageLocation = () => {
    const [loading, setLoading] = useState(false);

    const [storageLocations, setStorageLocations] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingStorageLocation, setEditingStorageLocation] = useState(null);
    const [form] = Form.useForm();
    const [searchForm] = Form.useForm();  // Separate form for search
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    // Fetch all storage locations on component mount
    useEffect(() => {
        fetchStorageLocations();
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

    // Fetch storage locations from API
    const fetchStorageLocations = async () => {
        try {
            setLoading(true); // Show spinner
            const response = await axiosInstance.get("/storage_location/all");
            setStorageLocations(response.data);
        } catch (error) {
            //message.error("Failed to fetch storage locations.");
        } finally {
            setLoading(false); // Hide spinner
        }
    };

    // Search for storage locations
    const handleSearch = async () => {
        try {
            setLoading(true); // Show spinner
            const response = await axiosInstance.get(`/storage_location/all?search=${searchTerm}`);
            setStorageLocations(response.data);
        } catch (error) {
            //message.error("Failed to search storage locations.");
        } finally {
            setLoading(false); // Hide spinner
        }
    };

    // Reset search
    const handleReset = () => {
        setSearchTerm("");
        fetchStorageLocations();
    };

    // Add a New storage location
    const handleAdd = () => {
        setEditingStorageLocation(null);
        setIsModalVisible(true);
        form.resetFields();
    };

    // Edit an Existing storage location
    const handleEdit = (storageLocation) => {
        setEditingStorageLocation(storageLocation);
        setIsModalVisible(true);
        form.setFieldsValue({
            location_nm: storageLocation.locationNm,
        });
    };

    // Delete a storage location
    const handleDelete = async (id) => {
        try {
            // Delete the storage location
            await axiosInstance.delete(`/storage_location/delete/${id}`);
            message.success("Storage location deleted successfully.");

            // Update the storage locations state without fetching from the server
            const updatedStorageLocations = storageLocations.filter((storageLocation) => storageLocation.locationId !== id);
            setStorageLocations(updatedStorageLocations);

            // Check if the updated storage locations list is empty
            if (updatedStorageLocations.length === 0) {
                setCurrentPage(1); // Reset to the first page
            }
        } catch (error) {
            message.error("Failed to delete storage location.");
        }
    };

    // Handle Modal Submission (Add or Update storage location)
    const handleModalSubmit = async (values) => {
        try {
            if (editingStorageLocation) {
                // Update storage location
                await axiosInstance.put(
                    `/storage_location/update/${editingStorageLocation.locationId}`,
                    null,
                    {
                        params: {
                            location_nm: values.location_nm,
                        },
                    }
                );
                message.success("Storage location updated successfully.");
            } else {
                // Add New storage location
                await axiosInstance.post(
                    `/storage_location/add`,
                    null,
                    {
                        params: {
                            location_nm: values.location_nm,
                        },
                    }
                );
                message.success("Storage location added successfully.");
            }
            setIsModalVisible(false);
            fetchStorageLocations();
        } catch (error) {
            message.error("Failed to save storage location. Please try again.");
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
            title: "Storage Location Name",
            dataIndex: "locationNm",
            key: "locationNm",
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
                        title="Are you sure to delete this storage location?"
                        onConfirm={() => handleDelete(record.locationId)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button icon={<DeleteOutlined />} danger />
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    // Paginate storage locations
    const paginatedStorageLocations = storageLocations.slice(
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
                Storage Locations
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
                                placeholder="Search storage locations..."
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
                dataSource={paginatedStorageLocations}
                rowKey="locationId"
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
                total={storageLocations.length}
                onChange={handlePageChange}
                style={{ marginTop: "10px", textAlign: "right" }}
            />
            <Modal
                title={editingStorageLocation ? "Edit Storage Location" : "Add New Storage Location"}
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
                        name="location_nm"
                        label="Storage Location Name"
                        rules={[{ required: true, message: "Storage location name is required." }]}
                        onChange={(e) => {
                            form.setFieldsValue({ location_nm: e.target.value.toUpperCase() });
                        }}
                    >
                        <Input placeholder="Enter storage location name" />
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

export default StorageLocation;