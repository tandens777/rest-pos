import React, { useState, useEffect } from "react";
import axiosInstance from "../config/axiosConfig"; // Import the configured Axios instance
import { Button, Table, Form, Input, Space, Modal, message, Pagination, Popconfirm, Select, Upload, Avatar, Switch, Row, Col, Checkbox, Radio } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined, SearchOutlined, CheckOutlined, ArrowLeftOutlined, UploadOutlined } from "@ant-design/icons";
import { CgCornerLeftUp } from "react-icons/cg";

const { Option } = Select;

const SurchargeDiscount = () => {
    const [loading, setLoading] = useState(false);

    const [picturePreview, setPicturePreview] = useState(null);
    const [surchargeDiscounts, setSurchargeDiscounts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingSurchargeDiscount, setEditingSurchargeDiscount] = useState(null);
    const [smDiscountTypes, setSmDiscountTypes] = useState([]);
    const [surDiscCategories, setSurDiscCategories] = useState([]);
    const [discType, setDiscType] = useState("LP");
    const [parentCategoryId, setParentCategoryId] = useState(null);     

    const [form] = Form.useForm();
    const [searchForm] = Form.useForm();  // Separate form for search
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    // Environment variables for API and file server URLs
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL; // e.g., http://192.168.68.118:8081
    const fileBaseUrl = import.meta.env.VITE_FILE_BASE_URL; // e.g., http://192.168.68.118:8080

    const no_pic_default = `${fileBaseUrl}/uploads/surcharge_discounts/default.png`;

    // Fetch all surcharge discounts on component mount
    useEffect(() => {
        //fetchSurchargeDiscounts();
        handleCategoryClick(0, null);
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

    // Fetch Surcharge Discounts from API
    const fetchSurchargeDiscounts = async () => {
        try {
            setLoading(true); // Show spinner
            const response = await axiosInstance.get("/surcharge_discount/all");
            setSurchargeDiscounts(response.data);
        } catch (error) {
            message.error("Failed to fetch surcharge discounts.");
        } finally {
            setLoading(false); // Hide spinner
        }
    };

    // Fetch Surcharge Discounts from API
    const handleCategoryClick = async (id, parentDiscId) => {
        try {
            setLoading(true); // Show spinner
            console.log("parent id: ", id);
            const response = await axiosInstance.get(`/surcharge_discount/all_subitems/${id || 0}`);
    
            console.log('response.data: ', response.data);

            console.log("new parent id: ", parentDiscId);
            setParentCategoryId(parentDiscId);        
            console.log("parent id: ", parentCategoryId);

            setSurchargeDiscounts(response.data); // Update the displayed list

            // ✅ Reset the pagination to page 1
            setCurrentPage(1);

        } catch (error) {
            message.error("Failed to fetch child surcharge discounts.");
        } finally {
            setLoading(false); // Hide spinner
        }
    };

    const fetchDropdownData = async () => {
        try {
            setLoading(true); // Show spinner
            const [discountTypesResponse, categoriesResponse] = await Promise.all([
                axiosInstance.get("/sm_disc_types"),
                axiosInstance.get("/surcharge_discount/getcategories"),
            ]);
            setSmDiscountTypes(discountTypesResponse.data);
            setSurDiscCategories(categoriesResponse.data);
        } catch (error) {
            message.error("Failed to fetch dropdown data.");
        } finally {
            setLoading(false); // Hide spinner
        }
    };

    // Search for Surcharge Discounts
    const handleSearch = async () => {
        try {
            setLoading(true); // Show spinner
            const response = await axiosInstance.get(`/surcharge_discount/all?search=${searchTerm}`);
            setSurchargeDiscounts(response.data);
        } catch (error) {
            message.error("Failed to search surcharge discounts.");
        } finally {
            setLoading(false); // Hide spinner
        }
    };

    // Reset search
    const handleReset = () => {
        searchForm.resetFields();
        setSearchTerm("");
        //fetchSurchargeDiscounts();
        handleCategoryClick(0, null);
    };

    // Add a New Surcharge Discount
    const handleAdd = () => {
        setEditingSurchargeDiscount(null);
        setIsModalVisible(true);
        form.resetFields();
        setPicturePreview("");
        setDiscType("LP");
    };

    // Edit an Existing Surcharge Discount
    const handleEdit = (surchargeDiscount) => {
        setEditingSurchargeDiscount(surchargeDiscount);
        setIsModalVisible(true);
        form.setFieldsValue({
            disc_desc: surchargeDiscount.discDesc,
            short_nm: surchargeDiscount.shortNm,
            parent_disc_id: surchargeDiscount.parentDiscId,
            is_category: surchargeDiscount.isCategory === "Y",
            active_flag: surchargeDiscount.activeFlag === "Y",
            disc_type: surchargeDiscount.discType,
            amount_or_percentage: surchargeDiscount.discType === "LP" || surchargeDiscount.discType === "AP" ? surchargeDiscount.percentage : surchargeDiscount.amt,            need_ref: surchargeDiscount.needRef === "Y",
            auto_flag: surchargeDiscount.autoFlag === "Y",
            need_authorization: surchargeDiscount.needAuthorization === "Y",
            check_senior: surchargeDiscount.checkSenior === "Y",
            pcnt_on_nv_flag: surchargeDiscount.pcntOnNvFlag === "Y",
            sm_discount_type: surchargeDiscount.smDiscountType,
            picture_src: surchargeDiscount.pictureSrc,
            sort_order: surchargeDiscount.sortOrder,
        });

        setDiscType(surchargeDiscount.discType);
        // Set picture preview URL using the file server base URL
        if (surchargeDiscount.pictureSrc) {
            setPicturePreview(`${fileBaseUrl}${surchargeDiscount.pictureSrc}`);
        } else {
            setPicturePreview("");
        }
    };

    // Delete a Surcharge Discount
    const handleDelete = async (id) => {
        try {
            await axiosInstance.delete(`/surcharge_discount/delete/${id}`);
            message.success("Surcharge discount deleted successfully.");

            const updatedSurchargeDiscounts = surchargeDiscounts.filter((discount) => discount.id !== id);
            setSurchargeDiscounts(updatedSurchargeDiscounts);

            if (updatedSurchargeDiscounts.length === 0) {
                setCurrentPage(1);
            }
        } catch (error) {
            message.error("Failed to delete surcharge discount.");
        }
    };

    // Handle Modal Submission (Add or Update Surcharge Discount)
    const handleModalSubmit = async (values) => {
        try {
            const surchargeDiscountData = {
                disc_desc: values.disc_desc,
                short_nm: values.short_nm,
                parent_disc_id: values.parent_disc_id,
                is_category: values.is_category ? "Y" : "N",
                active_flag: values.active_flag ? "Y" : "N",
                disc_type: values.disc_type,
                percentage: values.disc_type === "LP" || values.disc_type === "AP" ? values.amount_or_percentage : 0,
                amt: values.disc_type === "LA" || values.disc_type === "AA" ? values.amount_or_percentage : 0,
                need_ref: values.need_ref ? "Y" : "N",
                auto_flag: values.auto_flag ? "Y" : "N",
                need_authorization: values.need_authorization ? "Y" : "N",
                check_senior: values.check_senior ? "Y" : "N",
                pcnt_on_nv_flag: values.pcnt_on_nv_flag ? "Y" : "N",
                sm_discount_type: values.sm_discount_type,
                picture_src: values.picture_src,
                sort_order: values.sort_order,
            };

            console.log("submit data:", surchargeDiscountData);

            const url = editingSurchargeDiscount ? `/surcharge_discount/update/${editingSurchargeDiscount.id}` : `/surcharge_discount/add`;
            const method = editingSurchargeDiscount ? 'put' : 'post';

            await axiosInstance[method](url, null, { params: surchargeDiscountData });

            message.success(`Surcharge discount ${editingSurchargeDiscount ? 'updated' : 'added'} successfully.`);
            setIsModalVisible(false);
            handleCategoryClick(0, null);
            //fetchSurchargeDiscounts();
            fetchDropdownData();
        } catch (error) {
            console.error("Error saving surcharge discount:", error);
            message.error(error.response?.data?.message || "Failed to save surcharge discount. Please try again.");
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
        formData.append("folder", "surcharge_discounts");
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

    // Paginate surcharge discounts
    const paginatedSurchargeDiscounts = surchargeDiscounts.slice(
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
                Surcharge Discounts
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
                    <Form form={searchForm} layout="inline">
                        <Form.Item name="search">
                            <Input
                                placeholder="Search surcharge discounts..."
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
                        {(
                            <Button
                                onClick={() => handleCategoryClick(parentCategoryId, null)}
                                icon={<CgCornerLeftUp />}
                                style={{
                                    backgroundColor: "#ff9800",
                                    color: "white",
                                    border: "1px solid #a36b00",
                                    borderRadius: "4px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                Go Up One Level
                            </Button>
                        )}
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

            {/* Surcharge Discount List Container */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                    gap: "20px",
                    marginTop: "20px",
                }}
            >
                {paginatedSurchargeDiscounts.map((discount) => {
                    const isCategory = discount.isCategory === "Y";

                    return (
                        <div
                            key={discount.id}
                            onClick={(e) => {
                                if (isCategory && !e.target.closest(".edit-delete-buttons")) {
                                    handleCategoryClick(discount.id, discount.parentDiscId);
                                }
                            }}
                            style={{
                                backgroundColor: isCategory ? "#E6F7FF" : "#fff",
                                borderRadius: "8px",
                                padding: "16px",
                                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                                textAlign: "center",
                                opacity: discount.activeFlag === "N" ? 0.6 : 1,
                                cursor: isCategory ? "pointer" : "default",
                                transition: "background-color 0.2s, border 0.2s",
                                border: isCategory ? "2px solid #1890ff" : "1px solid #ddd",
                                ...(isCategory && {
                                    ":hover": {
                                        backgroundColor: "#D6EFFA",
                                    },
                                }),
                            }}
                        >
                            {/* Image or Large Centered Text */}
                            <div
                                style={{
                                    width: "100%",
                                    height: "120px",
                                    borderRadius: "8px 8px 0 0",
                                    backgroundColor: discount.pictureSrc ? "#ffffff" : isCategory ? "#E6F7FF" : "#ffffff",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    backgroundSize: "contain",
                                    backgroundPosition: "center",
                                    backgroundRepeat: "no-repeat",
                                    backgroundImage: discount.pictureSrc ? `url(${fileBaseUrl}${discount.pictureSrc})` : "none",
                                    filter: discount.activeFlag === "N" ? "grayscale(100%)" : "none",
                                }}
                            >
                                {!discount.pictureSrc && (
                                    <span
                                        style={{
                                            fontSize: "20px",
                                            fontWeight: "bold",
                                            textAlign: "center",
                                            color: "#333",
                                            maxWidth: "80%",
                                            wordWrap: "break-word",
                                        }}
                                    >
                                        {discount.discDesc}
                                    </span>
                                )}
                            </div>

                            {/* Surcharge Discount Name */}
                            <div
                                style={{
                                    fontWeight: "bold",
                                    fontSize: "16px",
                                    marginTop: "10px",
                                    color: discount.activeFlag === "N" ? "#666" : "#000",
                                    visibility: discount.pictureSrc || isCategory ? "visible" : "hidden",
                                    minHeight: "20px",
                                }}
                            >
                                {discount.pictureSrc ? discount.discDesc : ""}
                            </div>

                            {/* Active/Inactive Status */}
                            <div
                                style={{
                                    marginTop: "8px",
                                    fontWeight: "bold",
                                    color: discount.activeFlag === "Y" ? "red" : "black",
                                }}
                            >
                                {discount.activeFlag === "Y" ? "ACTIVE" : "INACTIVE"}
                            </div>

                            {/* Action Buttons */}
                            <Space className="edit-delete-buttons" style={{ marginTop: "10px" }}>
                                <Button icon={<EditOutlined />} onClick={() => handleEdit(discount)} />
                                <Popconfirm
                                    title="Are you sure to delete this surcharge discount?"
                                    onConfirm={() => handleDelete(discount.id)}
                                    okText="Yes"
                                    cancelText="No"
                                >
                                    <Button icon={<DeleteOutlined />} danger />
                                </Popconfirm>
                            </Space>
                        </div>
                    );
                })}
            </div>

            <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={surchargeDiscounts.length}
                onChange={(page, size) => {
                    setCurrentPage(page);
                    setPageSize(size);
                }}
                style={{ marginTop: "10px", textAlign: "right" }}
            />

            <Modal
                title={editingSurchargeDiscount ? "Edit Surcharge Discount" : "Add New Surcharge Discount"}
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
                        percentage: 0, // Default value 0.00
                        amt: 0,
                        disc_type: "LP",
                        amount_or_percentage: 0,
                }}>
                    <Row gutter={16}>
                        <Col span={18}>
                            <Form.Item
                                name="disc_desc"
                                label="Surcharge Discount Name"
                                rules={[{ required: true, message: "Surcharge Discount Name is required." }]}
                                onChange={(e) => {
                                    form.setFieldsValue({ disc_desc: e.target.value.toUpperCase() });
                                }}
                            >
                                <Input placeholder="Enter Surcharge Discount Name" />
                            </Form.Item>
                            <Form.Item
                                name="short_nm"
                                label="Short Name on Bill"
                                onChange={(e) => {
                                    form.setFieldsValue({ short_nm: e.target.value.toUpperCase() });
                                }}
                            >
                                <Input placeholder="Enter Short Name" />
                            </Form.Item>
                            <Form.Item
                                name="parent_disc_id"
                                label="Parent Category"
                            >
                                <Select 
                                    placeholder="Select Parent Category"
                                    allowClear  
                                    onChange={(value) => {
                                        form.setFieldsValue({ parent_disc_id: value || null });
                                    }}
                                >
                                    {Array.isArray(surDiscCategories) && surDiscCategories.length > 0 ? (
                                        surDiscCategories.map((category) => (
                                            <Option key={category.id} value={category.id}>
                                                {category.discDesc}
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
                                                    name: "Surcharge Discount Picture",
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
                                name="disc_type"
                                label="Type"
                                rules={[{ required: true, message: "Type is required." }]}
                            >
                                     <Radio.Group onChange={(e) => {
                                        form.setFieldsValue({ disc_type: e.target.value });
                                        setDiscType(e.target.value);
                                    }}>
                                        <Radio value="LP" style={{ display: 'block' }}>Less % Payment</Radio>
                                        <Radio value="LA" style={{ display: 'block' }}>Less Amount</Radio>
                                        <Radio value="AP" style={{ display: 'block' }}>Add % Payment</Radio>
                                        <Radio value="AA" style={{ display: 'block' }}>Add Amount</Radio>
                                    </Radio.Group>
                                </Form.Item>
                                <Form.Item
                                    name="amount_or_percentage"
                                    label={discType === "LP" || discType === "AP" ? "Percentage" : "Amount"}
                                    rules={[{ required: true, message: "This field is required." }]}
                                >
                                    <Input type="number" placeholder="Enter value" />
                                </Form.Item>

                                <Form.Item
                                    name="sort_order"
                                    label="Sort Order"
                                >
                                    <Input type="number" placeholder="Enter Sort Order" />
                                </Form.Item>

                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="need_ref"
                                valuePropName="checked"
                            >
                                <Checkbox>Need Reference</Checkbox>
                            </Form.Item>
                            <Form.Item
                                name="auto_flag"
                                valuePropName="checked"
                            >
                                <Checkbox>Auto insert to bill</Checkbox>
                            </Form.Item>
                            <Form.Item
                                name="need_authorization"
                                valuePropName="checked"
                            >
                                <Checkbox>Need Authorization</Checkbox>
                            </Form.Item>
                            <Form.Item
                                name="check_senior"
                                valuePropName="checked"
                            >
                                <Checkbox>Ask for Senior/PWD count</Checkbox>
                            </Form.Item>
                            <Form.Item
                                name="pcnt_on_nv_flag"
                                valuePropName="checked"
                            >
                                <Checkbox>% Charge on NV Sales</Checkbox>
                            </Form.Item>
                            <Form.Item
                                name="sm_discount_type"
                                label="SM Discount Type"
                            >
                                <Select placeholder="Select SM Discount Type">
                                    {smDiscountTypes.map((type) => (
                                        <Option key={type.smdiscType} value={type.smdiscType}>
                                            {type.smdiscTypeDesc}
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
    )}
    </>
            
    );
};

export default SurchargeDiscount;
