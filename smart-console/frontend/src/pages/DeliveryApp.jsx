import React, { useState, useEffect } from "react";
import axiosInstance from "../config/axiosConfig"; // Import the configured Axios instance
import { Button, Table, Form, Input, Row, Col, InputNumber, Space, Modal, message, Pagination, Popconfirm, Switch, Upload } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined, SearchOutlined, CheckOutlined, ArrowLeftOutlined, CloseOutlined, UploadOutlined } from "@ant-design/icons";

const DeliveryApp = () => {
    const [deliveryApps, setDeliveryApps] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingDeliveryApp, setEditingDeliveryApp] = useState(null);
    const [form] = Form.useForm();
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [logoPreview, setLogoPreview] = useState(""); // State for logo preview

    const [dlvryAppAliases, setDlvryAppAliases] = useState([]);

    // Environment variables for API and file server URLs
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL; // e.g., http://192.168.68.118:8081
    const fileBaseUrl = import.meta.env.VITE_FILE_BASE_URL; // e.g., http://192.168.68.118:8080

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
        setLogoPreview("");

        setDlvryAppAliases("");        
    };

    // Edit an Existing Delivery App
    const handleEdit = (deliveryApp) => {
        const activeFlagBoolean = deliveryApp.activeFlag === "Y";
     
        setEditingDeliveryApp(deliveryApp);
        setIsModalVisible(true);
        form.setFieldsValue({
            app_nm: deliveryApp.appNm,
            order_type: deliveryApp.orderType,
            active_flag: activeFlagBoolean,
            table_count: deliveryApp.tableCount,
            pic_filename: deliveryApp.picFilename,
            app_add_pcnt: deliveryApp.appAddPcnt,
            app_add_amt: deliveryApp.appAddAmt
        });

        // Set logo preview URL using the file server base URL
        if (deliveryApp.picFilename) {
            setLogoPreview(`${fileBaseUrl}${deliveryApp.picFilename}`);
        } else {
            setLogoPreview("");
        }

        // Fetch aliases for the order type of the delivery app being edited
        fetchAliases(deliveryApp.orderType, setDlvryAppAliases);        
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


    // Handle File Upload
    const handleUpload = async (file) => {
        const formData = new FormData();
        formData.append("folder", "delivery-apps")
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
            setLogoPreview(`${fileBaseUrl}${filePath}`);
            message.success("File uploaded successfully.");
        } catch (error) {
            console.error("Upload error:", error); // Debugging
            message.error("Failed to upload file.");
        }
    };

    // Handle File Removal
    const handleRemove = async () => {
        try {
            // Set logo_filename to an empty string and clear the preview
            form.setFieldsValue({ pic_filename: "" });
            setLogoPreview("");
            message.success("Logo removed successfully.");
        } catch (error) {
            console.error("Remove error:", error); // Debugging
            message.error("Failed to remove logo.");
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
                            active_flag: values.active_flag ? 'Y' : 'N',
                            table_count: values.table_count,
                            pic_filename: values.pic_filename,
                            app_add_pcnt: values.app_add_pcnt,
                            app_add_amt: values.app_add_amt
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
                            active_flag: values.active_flag ? 'Y' : 'N',
                            table_count: values.table_count,
                            pic_filename: values.pic_filename,
                            app_add_pcnt: values.app_add_pcnt,
                            app_add_amt: values.app_add_amt
                        },
                    }
                );
                message.success("Delivery app added successfully.");
            }
            await updateOrderAliases(values.order_type, dlvryAppAliases);

            setIsModalVisible(false);
            fetchDeliveryApps();
        } catch (error) {
            message.error("Failed to save delivery app. Please try again.");
        }
    };

    // Fetch aliases
    const fetchAliases = async (orderType, setAliases) => {
        try {
        const response = await axiosInstance.get(`/order_type/getAliases`, {
            params: { order_type: orderType },
        });
        setAliases(response.data);
        } catch (error) {
        console.error(`Failed to fetch ${orderType} aliases:`, error);
        message.error(`Failed to fetch ${orderType} aliases.`);
        }
    };

    // Handle generate aliases
    const handleGenerateAliases = async (orderType, startNum, skipNums) => {
        try {
        const skipNumsValue = skipNums || "";
        await axiosInstance.post(`/order_type/generate`, null, {
            params: {
            order_type: orderType,
            start_num: startNum,
            skip_nums: skipNumsValue,
            },
        });
        message.success(`${orderType} aliases generated successfully.`);
        fetchAliases(orderType, setDlvryAppAliases);
        } catch (error) {
        console.error(`Failed to generate ${orderType} aliases:`, error);
        message.error(`Failed to generate ${orderType} aliases.`);
        }
    };

    // Update Order Aliases
    const updateOrderAliases = async (orderType, aliases) => {
        console.log("Fetched ordertypealiases details:", aliases);
        try {
        const payload = aliases.map(alias => ({
            id: alias.id,
            orderType: orderType,
            tblNum: alias.tblNum,
            tblName: alias.tblName,
            floorId: alias.floorId,
            picture: alias.picture,
            positionX: alias.positionX,
            positionY: alias.positionY
        }));

        await axiosInstance.put(
            `/order_type/update/${orderType}`,
            payload,
            {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            }
        );

        message.success(`${orderType} aliases updated successfully.`);
        } catch (error) {
        console.error(`Failed to update ${orderType} aliases:`, error);
        message.error(`Failed to update ${orderType} aliases.`);
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
            title: "App Logo", // Updated column title
            dataIndex: "picFilename",
            key: "picFilename",
            width: "20%",
            render: (picFilename) => (
                picFilename ? (
                    <img
                        src={`${fileBaseUrl}${picFilename}`} // Construct the full URL
                        alt="App Logo"
                        style={{
                            width: "50px",
                            height: "50px",
                            objectFit: "cover",
                            borderRadius: "4px",
                        }}
                    />
                ) : (
                    <span>No Logo</span> // Fallback if no logo is available
                )
            ),
        },        
        {
            title: "Order Type",
            dataIndex: "orderType",
            key: "orderType",
            width: "15%",
        },
        {
            title: "Table Count",
            dataIndex: "tableCount",
            key: "tableCount",
            width: "15%",
        },
        {
            title: "Active",
            dataIndex: "activeFlag",
            key: "activeFlag",
            width: "15%",
            align: "center", // Center the content in the column
            render: (activeFlag) => (
                <span style={{ display: "flex", justifyContent: "center" }}> {/* Center the icon */}
                    {activeFlag === 'Y' ? (
                        <CheckOutlined style={{ color: "#389e0d", fontSize: "18px" }} /> 
                    ) : (
                        <CloseOutlined style={{ color: "#ff4d4f", fontSize: "18px" }} />
                    )}
                </span>
            ),
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
                Food Delivery Apps
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
                    initialValues={{
                        app_add_pcnt: 0, // Default value 0.00
                        app_add_amt: 0,   // Default value 0.00
                    }}
                >

                    {/* App Name and Order Type in the same row */}
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="app_nm"
                                label="App Name"
                                rules={[{ required: true, message: "App name is required." }]}
                            >
                                <Input placeholder="Enter app name" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="order_type"
                                label="Order Type"
                                rules={[{ required: true, message: "Order type is required." }]}
                            >
                                <Input placeholder="Enter order type" />
                            </Form.Item>
                        </Col>
                    </Row>

                    {/* Price Plus Percentage and Price Plus Amount in the same row */}
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="app_add_pcnt"
                                label="Add-on Percentage"
                                rules={[{ required: true, message: "Add-on Percentage is required." }]}
                            >
                                <InputNumber min={0} step={0.01} style={{ width: "100%" }} placeholder="Enter percentage" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="app_add_amt"
                                label="Add-on Amount"
                                rules={[{ required: true, message: "Add-on Amount is required." }]}
                            >
                                <InputNumber min={0} step={0.01} style={{ width: "100%" }} placeholder="Enter amount" />
                            </Form.Item>
                        </Col>
                    </Row>
                    
                    {/* App Logo and Active Flag in the same row */}
                    <Row gutter={16} align="middle">
                        <Col span={12}>
                            <Form.Item name="pic_filename" label="App Logo"
                                rules={[{ required: true, message: "Picture filename is required." }]}
                            >
                                <Upload
                                    beforeUpload={(file) => {
                                        handleUpload(file);
                                        return false;
                                    }}
                                    maxCount={1}
                                    listType="picture"
                                    fileList={
                                        logoPreview
                                            ? [
                                                {
                                                    uid: "-1",
                                                    name: "App Logo",
                                                    status: "done",
                                                    url: logoPreview,
                                                },
                                            ]
                                            : []
                                    }
                                    onRemove={handleRemove}
                                >
                                    {!logoPreview && (
                                        <Button
                                            icon={<UploadOutlined />}
                                            style={{
                                                backgroundColor: "black",
                                                color: "white",
                                                borderRadius: "4px",
                                                height: "40px",
                                                padding: "0 20px",
                                                border: "none",
                                            }}
                                        >
                                            Upload Photo
                                        </Button>
                                    )}
                                </Upload>
                            </Form.Item>
                        </Col>           
                    <Col span={12}>                                 
                        <Form.Item
                            name="active_flag"
                            label="Active"
                            valuePropName="checked"
                        >
                        <Switch
                            onChange={(checked) => {
                            form.setFieldsValue({ active_flag: checked });
                            }}
                        />                        
                        </Form.Item>
                    </Col>
                </Row>


                    <div style={{ border: "1px solid #d9d9d9", borderTop: "none", borderRadius: "0 0 4px 4px", padding: "16px", backgroundColor: "#fff" }}>
                        <Row gutter={8}>
                            <Col span={12}>
                            <Form.Item name="table_count" label="Table Count" style={{ marginBottom: "15px" }}>
                                <InputNumber min={0} style={{ width: "120px" }} placeholder="Count" />
                            </Form.Item>
                            </Col>
                            <Col span={12}>
                            <Form.Item name="start_num" label="Start No." style={{ marginBottom: "15px" }}>
                                <InputNumber min={0} style={{ width: "120px" }} placeholder="Start No." />
                            </Form.Item>
                            </Col>
                        </Row>
                        <Form.Item name="skip_nums" label="Skip Numbers" style={{ marginBottom: "15px" }}>
                            <Input placeholder="e.g., 1,2,3" style={{ width: "100%" }} />
                        </Form.Item>
                        <Row justify="space-between" style={{ marginBottom: "16px" }}>
                            <Col>
                            <Button type="primary" icon={<PlusOutlined />} onClick={() => handleGenerateAliases(form.getFieldValue("order_type"), form.getFieldValue("start_num"), form.getFieldValue("skip_nums"))}>
                                Generate
                            </Button>
                            </Col>
                        </Row>
                        <Table
                            dataSource={dlvryAppAliases}
                            columns={[
                            {
                                title: "Table Number",
                                dataIndex: "tblNum",
                                key: "tblNum",
                            },
                            {
                                title: "Table Name",
                                dataIndex: "tblName",
                                key: "tblName",
                                render: (text, record, index) => (
                                <Input
                                    value={text}
                                    onChange={(e) => {
                                    const newAliases = [...dlvryAppAliases];
                                    newAliases[index].tblName = e.target.value;
                                    setDlvryAppAliases(newAliases);
                                    }}
                                    maxLength={10}
                                    style={{ width: "120px" }}
                                    required={true}
                                />
                                ),
                            },
                            ]}
                            rowKey="tblNum"
                            pagination={false}
                            style={{ marginTop: "16px" }}
                        />
                        </div>



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