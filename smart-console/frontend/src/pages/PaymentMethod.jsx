import React, { useState, useEffect } from "react";
import axiosInstance from "../config/axiosConfig"; // Import the configured Axios instance
import { Button, Table, Form, Input, Space, Modal, message, Pagination, Popconfirm, Select, Upload, Avatar, Switch, Row, Col, Checkbox } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined, SearchOutlined, CheckOutlined, ArrowLeftOutlined, UploadOutlined } from "@ant-design/icons";

const { Option } = Select;

const PaymentMethod = () => {
    const [picturePreview, setPicturePreview] = useState(null);
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingPaymentMethod, setEditingPaymentMethod] = useState(null);
    const [smPayTypes, setSmPayTypes] = useState([]);
    const [payMethodCategories, setPayMethodCategories] = useState([]);

    const [form] = Form.useForm();
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    // Environment variables for API and file server URLs
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL; // e.g., http://192.168.68.118:8081
    const fileBaseUrl = import.meta.env.VITE_FILE_BASE_URL; // e.g., http://192.168.68.118:8080

    const no_pic_default = `${fileBaseUrl}/uploads/payment_methods/default.png`;

    // Fetch all payment methods on component mount
    useEffect(() => {
        fetchPaymentMethods();
        fetchDropdownData();

        const handleResize = () => {
            const screenWidth = window.innerWidth;
            if (screenWidth < 768) {
                setPageSize(4);
            } else if (screenWidth < 1200) {
                setPageSize(8);
            } else {
                setPageSize(12);
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    // Fetch Payment Methods from API
    const fetchPaymentMethods = async () => {
        try {
            const response = await axiosInstance.get("/pay_method/all");
            setPaymentMethods(response.data);
        } catch (error) {
            message.error("Failed to fetch payment methods.");
        }
    };

    const fetchDropdownData = async () => {
        try {
            const [payTypesResponse, categoriesResponse] = await Promise.all([
                axiosInstance.get("/sm_pay_types"),
                axiosInstance.get("/pay_method/getcategories"),
            ]);
            setSmPayTypes(payTypesResponse.data);
            setPayMethodCategories(categoriesResponse.data);
        } catch (error) {
            message.error("Failed to fetch dropdown data.");
        }
    };

    // Search for Payment Methods
    const handleSearch = async () => {
        try {
            const response = await axiosInstance.get(`/pay_method/all?search=${searchTerm}`);
            setPaymentMethods(response.data);
        } catch (error) {
            message.error("Failed to search payment methods.");
        }
    };

    // Reset search
    const handleReset = () => {
        setSearchTerm("");
        fetchPaymentMethods();
    };

    // Add a New Payment Method
    const handleAdd = () => {
        setEditingPaymentMethod(null);
        setIsModalVisible(true);
        form.resetFields();
        setPicturePreview("");
    };

    // Edit an Existing Payment Method
    const handleEdit = (paymentMethod) => {
        setEditingPaymentMethod(paymentMethod);
        setIsModalVisible(true);
        form.setFieldsValue({
            pay_mtd_desc: paymentMethod.payMtdDesc,
            short_nm: paymentMethod.shortNm,
            parent_pay_mtd_id: paymentMethod.parentPayMtdId,
            is_category: paymentMethod.isCategory === "Y",
            active_flag: paymentMethod.activeFlag === "Y",
            need_ref: paymentMethod.needRef === "Y",
            need_expdt: paymentMethod.needExpdt === "Y",
            bank_charges: paymentMethod.bankCharges,
            sm_pay_type: paymentMethod.smPayType,
        });

        // Set picture preview URL using the file server base URL
        if (paymentMethod.pictureSrc) {
            setPicturePreview(`${fileBaseUrl}${paymentMethod.pictureSrc}`);
        } else {
            setPicturePreview("");
        }
    };

    // Delete a Payment Method
    const handleDelete = async (id) => {
        try {
            await axiosInstance.delete(`/pay_method/delete/${id}`);
            message.success("Payment method deleted successfully.");

            const updatedPaymentMethods = paymentMethods.filter((method) => method.id !== id);
            setPaymentMethods(updatedPaymentMethods);

            if (updatedPaymentMethods.length === 0) {
                setCurrentPage(1);
            }
        } catch (error) {
            message.error("Failed to delete payment method.");
        }
    };

    // Handle Modal Submission (Add or Update Payment Method)
    const handleModalSubmit = async (values) => {
        try {
            const paymentMethodData = {
                pay_mtd_desc: values.pay_mtd_desc,
                short_nm: values.short_nm,
                parent_pay_mtd_id: values.parent_pay_mtd_id,
                is_category: values.is_category ? "Y" : "N",
                active_flag: values.active_flag ? "Y" : "N",
                need_ref: values.need_ref ? "Y" : "N",
                need_expdt: values.need_expdt ? "Y" : "N",
                bank_charges: values.bank_charges,
                sm_pay_type: values.sm_pay_type,
                picture_src: values.picture_src,
            };

            console.log("sending paymethodData: ", paymentMethodData);

            const url = editingPaymentMethod ? `/pay_method/update/${editingPaymentMethod.id}` : `/pay_method/add`;
            const method = editingPaymentMethod ? 'put' : 'post';

            await axiosInstance[method](url, null, { params: paymentMethodData });

            message.success(`Payment method ${editingPaymentMethod ? 'updated' : 'added'} successfully.`);
            setIsModalVisible(false);
            fetchPaymentMethods();
        } catch (error) {
            console.error("Error saving payment method:", error);
            message.error(error.response?.data?.message || "Failed to save payment method. Please try again.");
        }
    };

    // Pagination handlers
    const handlePageChange = (page, pageSize) => {
        setCurrentPage(page);
        setPageSize(pageSize);
    };

    // Handle File Upload
    const handleUpload = async (file) => {
        const formData = new FormData();
        formData.append("folder", "payment_methods");
        formData.append("file", file);

        try {
            const response = await axiosInstance.post("/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            const filePath = response.data.filePath;
            form.setFieldsValue({ picture_src: filePath });
            setPicturePreview(`${fileBaseUrl}${filePath}`);
            message.success("Picture uploaded successfully.");
        } catch (error) {
            console.error("Upload error:", error);
            message.error("Failed to upload picture.");
        }
    };

    // Handle File Removal
    const handleRemove = async () => {
        form.setFieldsValue({ picture_src: "" });
        setPicturePreview("");
        message.success("Picture removed successfully.");
    };

    // Paginate payment methods
    const paginatedPaymentMethods = paymentMethods.slice(
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
                Payment Methods
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
                        placeholder="Search payment methods..."
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

            {/* Payment Method List Container */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                    gap: "20px",
                    marginTop: "20px",
                }}
            >
                {paginatedPaymentMethods.map((method) => (
                    <div
                        key={method.id}
                        style={{
                            backgroundColor: "#fff",
                            borderRadius: "8px",
                            padding: "16px",
                            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                            textAlign: "center",
                            opacity: method.activeFlag === "N" ? 0.6 : 1,
                        }}
                    >
                        <Avatar
                            src={method.pictureSrc ? `${fileBaseUrl}${method.pictureSrc}` : no_pic_default}
                            size={80}
                            style={{
                                marginBottom: "10px",
                                border: "1px solid #ccc",
                                filter: method.activeFlag === "N" ? "grayscale(100%)" : "none",
                            }}
                        />
                        <div style={{ fontWeight: "bold", fontSize: "16px" }}>
                            {method.payMtdDesc}
                        </div>
                        <div
                            style={{
                                marginTop: "8px",
                                fontWeight: "bold",
                                color: method.activeFlag === "Y" ? "red" : "black",
                            }}
                        >
                            {method.activeFlag === "Y" ? "ACTIVE" : "INACTIVE"}
                        </div>
                        <Space style={{ marginTop: "10px" }}>
                            <Button
                                icon={<EditOutlined />}
                                onClick={() => handleEdit(method)}
                            />
                            <Popconfirm
                                title="Are you sure to delete this payment method?"
                                onConfirm={() => handleDelete(method.id)}
                                okText="Yes"
                                cancelText="No"
                            >
                                <Button icon={<DeleteOutlined />} danger />
                            </Popconfirm>
                        </Space>
                    </div>
                ))}
            </div>

            <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={paymentMethods.length}
                onChange={(page, size) => {
                    setCurrentPage(page);
                    setPageSize(size);
                }}
                style={{ marginTop: "10px", textAlign: "right" }}
            />

            <Modal
                title={editingPaymentMethod ? "Edit Payment Method" : "Add New Payment Method"}
                visible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
                centered
                width="800px"
                maskStyle={{
                    backgroundColor: "rgba(0, 0, 0, 0.6)",
                }}
                bodyStyle={{
                    padding: "20px",
                    borderRadius: "8px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                }}
            >
                <Form form={form} layout="vertical" onFinish={handleModalSubmit}
                    initialValues={{
                        bank_charges: 0, // Default value 0.00
                    }}
                >
                    <Row gutter={16}>
                        <Col span={18}>
                            <Form.Item
                                name="pay_mtd_desc"
                                label="Payment Method Name"
                                rules={[{ required: true, message: "Payment Method Name is required." }]}
                            >
                                <Input placeholder="Enter Payment Method Name" />
                            </Form.Item>
                            <Form.Item
                                name="short_nm"
                                label="Short Name on Bill"
                                rules={[{ required: true, message: "Short Name is required." }]}
                            >
                                <Input placeholder="Enter Short Name" />
                            </Form.Item>
                            <Form.Item
                                name="parent_pay_mtd_id"
                                label="Parent Category"
                            >
                                <Select placeholder="Select Parent Category">
                                    {Array.isArray(payMethodCategories) && payMethodCategories.length > 0 ? (
                                        payMethodCategories.map((category) => (
                                            <Option key={category.id} value={category.id}>
                                                {category.payMtdDesc}
                                            </Option>
                                        ))
                                    ) : (
                                        <Option disabled>No categories available</Option>
                                    )}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    height: "100%",
                                    marginTop: 0,
                                }}
                            >
                                <Avatar
                                    src={picturePreview || no_pic_default}
                                    size={120}
                                    shape="square"
                                    style={{
                                        marginBottom: "10px",
                                        border: "1px solid #ccc",
                                        display: "block",
                                    }}
                                />
                                <Upload
                                    beforeUpload={(file) => {
                                        handleUpload(file);
                                        return false;
                                    }}
                                    maxCount={1}
                                    listType="picture"
                                    fileList={
                                        picturePreview
                                            ? [
                                                {
                                                    uid: "-1",
                                                    name: "Payment Method Picture",
                                                    status: "done",
                                                    url: picturePreview,
                                                },
                                            ]
                                            : []
                                    }
                                    onRemove={() => {
                                        handleRemove();
                                        return false;
                                    }}
                                    showUploadList={false}
                                >
                                    <Button
                                        icon={picturePreview ? <DeleteOutlined /> : <UploadOutlined />}
                                        onClick={(e) => {
                                            if (picturePreview) {
                                                e.stopPropagation();
                                                handleRemove();
                                            }
                                        }}
                                        style={{
                                            backgroundColor: picturePreview ? "red" : "black",
                                            color: "white",
                                            borderRadius: "4px",
                                            height: "40px",
                                            padding: "0 20px",
                                            border: "none",
                                        }}
                                    >
                                        {picturePreview ? "Remove Image" : "Upload Image"}
                                    </Button>
                                </Upload>
                                <Form.Item name="picture_src" label="" style={{ height: 0, overflow: 'hidden', margin: 0, padding: 0 }}>
                                    <Input type="hidden" />
                                </Form.Item>
                            </div>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="is_category"
                                label="Is Category"
                                valuePropName="checked"
                            >
                                <Switch
                                    onChange={(checked) => {
                                    form.setFieldsValue({ is_category: checked });
                                    }}
                                />
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

                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="need_ref"
                                label="Need Reference"
                                valuePropName="checked"
                            >
                                <Checkbox />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="need_expdt"
                                label="Need Expiry Date"
                                valuePropName="checked"
                            >
                                <Checkbox />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="bank_charges"
                                label="Bank Charges (%)"
                                rules={[{ required: true, message: "Bank Charges is required." }]}
                            >
                                <Input type="number" placeholder="Enter Bank Charges" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="sm_pay_type"
                                label="SM Payment Type"
                                rules={[{ required: true, message: "SM Payment Type is required." }]}
                            >
                                <Select placeholder="Select SM Payment Type">
                                    {smPayTypes.map((type) => (
                                        <Option key={type.smpayType} value={type.smpayType}>
                                            {type.smpayTypeDesc}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>

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

export default PaymentMethod;