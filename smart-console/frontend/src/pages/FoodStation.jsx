import React, { useState, useEffect } from "react";
import axiosInstance from "../config/axiosConfig"; // Import the configured Axios instance
import { Button, Table, Form, Input, Space, Modal, message, Pagination, Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined, SearchOutlined, CheckOutlined, ArrowLeftOutlined } from "@ant-design/icons";

const FoodStation = () => {
    const [loading, setLoading] = useState(false);

    const [foodStations, setFoodStations] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingFoodStation, setEditingFoodStation] = useState(null);
    const [form] = Form.useForm();
    const [searchForm] = Form.useForm();  // Separate form for search
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    // Fetch all food stations on component mount
    useEffect(() => {
        fetchFoodStations();
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

    // Fetch Food Stations from API
    const fetchFoodStations = async () => {
        try {
            setLoading(true); // Show spinner
            const response = await axiosInstance.get("/food_station/all");
            setFoodStations(response.data);
        } catch (error) {
            message.error("Failed to fetch food stations.");
        } finally {
            setLoading(false); // Hide spinner
        }
    };

    // Search for Food Stations
    const handleSearch = async () => {
        try {
            setLoading(true); // Show spinner
            const response = await axiosInstance.get(`/food_station/all?search=${searchTerm}`);
            setFoodStations(response.data);
        } catch (error) {
            //message.error("Failed to search food stations.");
        } finally {
            setLoading(false); // Hide spinner
        }
    };

    // Reset search
    const handleReset = () => {
        setSearchTerm("");
        fetchFoodStations();
    };

    // Add a New Food Station
    const handleAdd = () => {
        setEditingFoodStation(null);
        setIsModalVisible(true);
        form.resetFields();
    };

    // Edit an Existing Food Station
    const handleEdit = (foodStation) => {
        setEditingFoodStation(foodStation);
        setIsModalVisible(true);
        form.setFieldsValue({
            station_nm: foodStation.stationNm,
        });
    };

    // Delete a Food Station
    const handleDelete = async (id) => {
        try {
            // Delete the food station
            await axiosInstance.delete(`/food_station/delete/${id}`);
            message.success("Food station deleted successfully.");

            // Update the food stations state without fetching from the server
            const updatedFoodStations = foodStations.filter((foodStation) => foodStation.stationId !== id);
            setFoodStations(updatedFoodStations);

            // Check if the updated food stations list is empty
            if (updatedFoodStations.length === 0) {
                setCurrentPage(1); // Reset to the first page
            }
        } catch (error) {
            message.error("Failed to delete food station.");
        }
    };

    // Handle Modal Submission (Add or Update Food Station)
    const handleModalSubmit = async (values) => {
        try {
            if (editingFoodStation) {
                // Update Food Station
                await axiosInstance.put(
                    `/food_station/update/${editingFoodStation.stationId}`,
                    null,
                    {
                        params: {
                            station_nm: values.station_nm,
                        },
                    }
                );
                message.success("Food station updated successfully.");
            } else {
                // Add New Food Station
                await axiosInstance.post(
                    `/food_station/add`,
                    null,
                    {
                        params: {
                            station_nm: values.station_nm,
                        },
                    }
                );
                message.success("Food station added successfully.");
            }
            setIsModalVisible(false);
            fetchFoodStations();
        } catch (error) {
            message.error("Failed to save food station. Please try again.");
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
            title: "Food Station Name",
            dataIndex: "stationNm",
            key: "stationNm",
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
                        title="Are you sure to delete this food station?"
                        onConfirm={() => handleDelete(record.stationId)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button icon={<DeleteOutlined />} danger />
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    // Paginate food stations
    const paginatedFoodStations = foodStations.slice(
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
                Food Stations
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
                                placeholder="Search food stations..."
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
                dataSource={paginatedFoodStations}
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
                total={foodStations.length}
                onChange={handlePageChange}
                style={{ marginTop: "10px", textAlign: "right" }}
            />
            <Modal
                title={editingFoodStation ? "Edit Food Station" : "Add New Food Station"}
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
                        name="station_nm"
                        label="Food Station Name"
                        rules={[{ required: true, message: "Food station name is required." }]}
                        onChange={(e) => {
                            form.setFieldsValue({ station_nm: e.target.value.toUpperCase() });
                        }}
                    >
                        <Input placeholder="Enter food station name" />
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

export default FoodStation;