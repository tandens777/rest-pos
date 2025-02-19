import React, { useState, useEffect } from "react";
import axiosInstance from "../config/axiosConfig"; // Import the configured Axios instance
import { Button, Table, Form, Input, Space, Modal, message, Pagination, Popconfirm, Select, Upload, Avatar, Switch, Row, Col, Checkbox, Tabs   } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined, SearchOutlined, CheckOutlined, ArrowLeftOutlined, UploadOutlined } from "@ant-design/icons";
import { CgCornerLeftUp } from "react-icons/cg";

const { TabPane } = Tabs;
const { Option } = Select;

const Ingredients = () => {
    const [loading, setLoading] = useState(false);

    const [picturePreview, setPicturePreview] = useState(null);
    const [foodMenus, setFoodMenus] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingFoodMenu, setEditingFoodMenu] = useState(null);
    const [units, setUnits] = useState([]);
    const [foodStations, setFoodStations] = useState([]);
    const [categories, setCategories] = useState([]);
    const [parentCategoryId, setParentCategoryId] = useState(null);     

    const [isCat, setIsCat] = useState(false);

    const [form] = Form.useForm();
    const [searchForm] = Form.useForm();  // Separate form for search
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    // Environment variables for API and file server URLs
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL; // e.g., http://192.168.68.118:8081
    const fileBaseUrl = import.meta.env.VITE_FILE_BASE_URL; // e.g., http://192.168.68.118:8080

    const no_pic_default = `${fileBaseUrl}/uploads/ingredients/default.png`;

    const username = localStorage.getItem("username") || "User";

    // Fetch all food menus on component mount
    useEffect(() => {
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

    // Fetch Food Menus from API
    const handleCategoryClick = async (id, parentCatId) => {
        try {
            setLoading(true); // Show spinner
            console.log("parent id: ", id);
            const response = await axiosInstance.get(`/ingredients/all_subitems/${id || 0}`);
    
            console.log('response.data: ', response.data);

            console.log("new parent id: ", parentCatId);
            setParentCategoryId(parentCatId);        
            console.log("parent id: ", parentCategoryId);

            setFoodMenus(response.data); // Update the displayed list

            // ✅ Reset the pagination to page 1
            setCurrentPage(1);

        } catch (error) {
            message.error("Failed to fetch child ingredients.");
        } finally {
            setLoading(false); // Hide spinner
        }
    };

    const fetchDropdownData = async () => {
        try {
            setLoading(true); // Show spinner
            const [unitsResponse, stationResponse, categoriesResponse] = await Promise.all([
                axiosInstance.get("/units/all"),
                axiosInstance.get("/food_station/all"),
                axiosInstance.get("/ingredients/getcategories"),
            ]);
            setUnits(unitsResponse.data);
            setFoodStations(stationResponse.data);
            setCategories(categoriesResponse.data);
        } catch (error) {
            message.error("Failed to fetch dropdown data.");
        } finally {
            setLoading(false); // Hide spinner
        }
    };

    // Search for Food Menus
    const handleSearch = async () => {
        try {
            setLoading(true); // Show spinner
            const response = await axiosInstance.get(`/ingredients/all?search=${searchTerm}`);
            setFoodMenus(response.data);
        } catch (error) {
            message.error("Failed to search ingredients.");
        } finally {
            setLoading(false); // Hide spinner
        }
    };

    // Reset search
    const handleReset = () => {
        searchForm.resetFields();
        setSearchTerm("");
        handleCategoryClick(0, null);
    };

    // Add a New Food Menu
    const handleAdd = () => {
        setEditingFoodMenu(null);
        setIsModalVisible(true);
        form.resetFields();
        setPicturePreview("");
        setIsCat(false);
    };

    // Edit an Existing Food Menu
    const handleEdit = (foodMenu) => {
        setEditingFoodMenu(foodMenu);
        setIsModalVisible(true);
        form.setFieldsValue({
            item_code: foodMenu.itemCode,
            item_desc: foodMenu.itemDesc,
            short_nm: foodMenu.shortNm,
            chinese_item_desc: foodMenu.chineseItemDesc,
            parent_cat_id: foodMenu.parentCatId,
            station_id: foodMenu.stationId,
            cat_type_id: foodMenu.catTypeId,
            is_category: foodMenu.isCategory === "Y",
            active_flag: foodMenu.activeFlag === "Y",
            per100g_flag: foodMenu.per100gFlag === "Y",
            default_price: foodMenu.defaultPrice,
            addon_price: foodMenu.addonPrice,
            picture_src: foodMenu.pictureSrc,
            default_unit_code: foodMenu.defaultUnitCode, 
            sort_order: foodMenu.sortOrder,
            disc_exempt: foodMenu.discExempt === "Y",
            allow_sc_on_exempt: foodMenu.allowScOnExempt === "Y",
            non_vat_flag: foodMenu.nonVatFlag === "Y",
            show_on_pos_flag: foodMenu.showOnPosFlag === "Y",
            track_invty_flag: foodMenu.trackInvtyFlag === "Y",
            send_to_printer_flag: foodMenu.sendToPrinterFlag === "Y",
            allow_dinein_flag: foodMenu.allowDineinFlag === "Y",
            allow_pickup_flag: foodMenu.allowPickupFlag === "Y",
            allow_delivery_flag: foodMenu.allowDeliveryFlag === "Y",
            soldout_flag: foodMenu.soldoutFlag === "Y",
            reorder_limit: foodMenu.reorderLimit,
        });

        setIsCat(foodMenu.isCategory === "Y");

        // Set picture preview URL using the file server base URL
        if (foodMenu.pictureSrc) {
            setPicturePreview(`${fileBaseUrl}${foodMenu.pictureSrc}`);
        } else {
            setPicturePreview("");
        }
    };

    // Delete a Food Menu
    const handleDelete = async (id) => {
        try {
            await axiosInstance.delete(`/ingredients/delete/${id}`);
            message.success("Ingredient deleted successfully.");

            const updatedFoodMenus = foodMenus.filter((menu) => menu.id !== id);
            setFoodMenus(updatedFoodMenus);

            if (updatedFoodMenus.length === 0) {
                setCurrentPage(1);
            }
        } catch (error) {
            message.error("Failed to delete ingredient.");
        }
    };

    // Handle Modal Submission (Add or Update Food Menu)
    const handleModalSubmit = async (values) => {
        try {
            const foodMenuData = {
                item_code: values.item_code,
                item_desc: values.item_desc,
                short_nm: values.short_nm,
                sort_order: values.sort_order,
                chinese_item_desc: values.chinese_item_desc,
                cat_type_id: 2,  // food menu
                parent_cat_id: values.parent_cat_id,
                is_category: values.is_category ? "Y" : "N",
                station_id: values.station_id,
                per100g_flag: values.per100g_flag ? "Y" : "N",
                default_price: values.default_price,
                addon_price: values.addon_price,
                picture_src: values.picture_src,
                default_unit_code: values.default_unit_code,

                disc_exempt: values.disc_exempt ? "Y" : "N",
                allow_sc_on_exempt: values.allow_sc_on_exempt ? "Y" : "N",
                non_vat_flag: values.non_vat_flag ? "Y" : "N",
                active_flag: values.active_flag ? "Y" : "N",
                show_on_pos_flag: values.show_on_pos_flag ? "Y" : "N",
                reorder_limit: values.reorder_limit,
                track_invty_flag: values.track_invty_flag ? "Y" : "N",
                send_to_printer_flag: values.send_to_printer_flag ? "Y" : "N",
                allow_dinein_flag: values.allow_dinein_flag ? "Y" : "N",
                allow_pickup_flag: values.allow_pickup_flag ? "Y" : "N",
                allow_delivery_flag: values.allow_delivery_flag ? "Y" : "N",
                soldout_flag: values.soldout_flag ? "Y" : "N",
                lastupduserid: username,
            };

            console.log("sending ingredientData: ", foodMenuData);

            const url = editingFoodMenu ? `/ingredients/update/${editingFoodMenu.id}` : `/ingredients/add`;
            const method = editingFoodMenu ? 'put' : 'post';

            await axiosInstance[method](url, null, { params: foodMenuData });

            message.success(`Ingredient ${editingFoodMenu ? 'updated' : 'added'} successfully.`);
            setIsModalVisible(false);
            handleCategoryClick(0, null);
            fetchDropdownData();
        } catch (error) {
            console.error("Error saving ingredient:", error);
            message.error(error.response?.data?.message || "Failed to save ingredient. Please try again.");
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
        formData.append("folder", "ingredients");
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

    // Paginate food menus
    const paginatedFoodMenus = foodMenus.slice(
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
                Ingredients
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
                                placeholder="Search ingredients..."
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

                        {/* Go Up One Level Button - Placed beside RESET */}
                        { (
                            <Button
                                onClick={() => handleCategoryClick(parentCategoryId, null)}
                                icon={<CgCornerLeftUp />} 
                                style={{
                                    backgroundColor: "#ff9800", // Yellowish to differentiate
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

{/* Food Menu List Container */}
<div
    style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        gap: "20px",
        marginTop: "20px",
    }}
>
    {paginatedFoodMenus.map((menu) => {
        const isCategory = menu.isCategory === "Y";

        return (
            <div
                key={menu.id}
                onClick={(e) => {
                    // Ensure category click only happens when clicking outside of buttons
                    if (isCategory && !e.target.closest(".edit-delete-buttons")) {
                        handleCategoryClick(menu.id, menu.parentCatId);
                    }
                }}
                style={{
                    backgroundColor: isCategory ? "#E6F7FF" : "#fff", // Soft blue for categories
                    borderRadius: "8px",
                    padding: "16px",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                    textAlign: "center",
                    opacity: menu.activeFlag === "N" ? 0.6 : 1, // Lower opacity if inactive
                    cursor: isCategory ? "pointer" : "default", // Make category clickable
                    transition: "background-color 0.2s, border 0.2s",
                    border: isCategory ? "2px solid #1890ff" : "1px solid #ddd", // Blue border for categories

                    /* ✅ Inline Hover Effect */
                    ...(isCategory && {
                        ":hover": {
                            backgroundColor: "#D6EFFA", // Slightly darker blue when hovered
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
        backgroundColor: menu.pictureSrc ? "#ffffff" : isCategory ? "#E6F7FF" : "#ffffff", // Blue for category, White for non-category
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundImage: menu.pictureSrc ? `url(${fileBaseUrl}${menu.pictureSrc})` : "none",
        filter: menu.activeFlag === "N" ? "grayscale(100%)" : "none", // Grayscale for inactive items
    }}
>
    {/* Show Text only if there's NO picture */}
    {!menu.pictureSrc && (
        <span
            style={{
                fontSize: "20px", // Make text larger
                fontWeight: "bold",
                textAlign: "center",
                color: "#333", // Dark text for contrast
                maxWidth: "80%", // Prevent text overflow
                wordWrap: "break-word",
            }}
        >
            {menu.itemDesc}
        </span>
    )}
</div>


{/* Food Menu Name - Keep space even when hidden */}
<div
    style={{
        fontWeight: "bold",
        fontSize: "16px",
        marginTop: "10px",
        color: menu.activeFlag === "N" ? "#666" : "#000", // Greyed-out text if inactive
        visibility: menu.pictureSrc || isCategory ? "visible" : "hidden", // Keep space even when hidden
        minHeight: "20px", // Ensures consistent height even when empty
    }}
>
    {menu.pictureSrc ? menu.itemDesc : ""}
</div>

                {/* Active/Inactive Status */}
                <div
                    style={{
                        marginTop: "8px",
                        fontWeight: "bold",
                        color: menu.activeFlag === "Y" ? "red" : "black",
                    }}
                >
                    {menu.activeFlag === "Y" ? "ACTIVE" : "INACTIVE"}
                </div>

                {/* Action Buttons (Edit & Delete Always Visible) */}
                <Space className="edit-delete-buttons" style={{ marginTop: "10px" }}>
                    <Button icon={<EditOutlined />} onClick={() => {
                         handleEdit(menu);
                    }} />
                    <Popconfirm
                        title="Are you sure to delete this ingredient?"
                        onConfirm={() => {
                            //e?.stopPropagation(); // Prevents category click from triggering
                            handleDelete(menu.id);
                        }}
                        onCancel={(e) => e.stopPropagation()} // Prevents category click when canceling
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button icon={<DeleteOutlined />} danger 
                        onClick={(e) => e.stopPropagation()}
                        />
                    </Popconfirm>
                </Space>
            </div>
        );
    })}
</div>


            <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={foodMenus.length}
                onChange={(page, size) => {
                    setCurrentPage(page);
                    setPageSize(size);
                }}
                style={{ marginTop: "10px", textAlign: "right" }}
            />

            <Modal
                title={editingFoodMenu ? "Edit Ingredient" : "Add New Ingredient"}
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
        default_price: 0.00, // Default value 0.00
        addon_price: 0.00, // Default value 0.00
        reorder_limit: 0,
        default_unit_code: "PC",
        active_flag: true,
        track_invty_flag:true,
        send_to_printer_flag: false,
    }}
>
    <Row gutter={16}>
        {/* Row 1: Item Code and Picture */}
        <Col span={18}>
            <Form.Item
                name="item_code"
                label="Item Code"
                onChange={(e) => {
                    form.setFieldsValue({ item_code: e.target.value.toUpperCase() });
                }}
            >
                <Input placeholder="Enter item code" />
            </Form.Item>
            <Form.Item
                name="item_desc"
                label="Item Description"
                rules={[{ required: true, message: "Please enter the item description!" }]}
                onChange={(e) => {
                    form.setFieldsValue({ item_desc: e.target.value.toUpperCase() });
                }}
            >
                <Input placeholder="Enter item description" />
            </Form.Item>
            <Form.Item
                name="short_nm"
                label="Short Name"
                onChange={(e) => {
                    form.setFieldsValue({ short_nm: e.target.value.toUpperCase() });
                }}
            >
                <Input placeholder="Enter short name" />
            </Form.Item>
            <Form.Item
                name="chinese_item_desc"
                label="Special Name"
            >
                <Input placeholder="Enter special name" />
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


    {/* Row 5: Parent Category Dropdown and Food Station Dropdown */}
    <Row gutter={16}>
        <Col span={12}>
            <Form.Item
                name="parent_cat_id"
                label="Parent Category"
            >
                <Select 
                        placeholder="Select Parent Category"
                        allowClear  
                        onChange={(value) => {
                            form.setFieldsValue({ parent_cat_id: value || null });
                        }}
                >
                        {/* Add an empty option at the top */}
                    <Option value={null}>None</Option>  

                    {Array.isArray(categories) && categories.length > 0 ? (
                        categories.map((category) => (
                            <Option key={category.id} value={category.id}>
                                {category.itemDesc}
                            </Option>
                        ))
                    ) : (
                        <Option disabled>No categories available</Option>
                    )}
                </Select>
            </Form.Item>
        </Col>
        <Col span={12}>
            <Form.Item
                name="sort_order"
                label="Sort Order"
            >
                <Input type="number" placeholder="Enter sort order" />
            </Form.Item>
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
                    setIsCat(checked);                        
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


{/* Render these tabs only if isCat is false */}
{!isCat ? (
    <>
<Tabs
    defaultActiveKey="1"
    tabBarStyle={{
    backgroundColor: "#fff",
    borderBottom: "1px solid #d9d9d9",
    padding: "0 16px",
    marginBottom: 0,
    }}
    tabBarGutter={0}
>

<TabPane tab="Unit of Measure" key="1">
    {/* Row 6: Default Unit Code and Per 100g Flag Checkbox */}
    <Row gutter={16}>
        <Col span={12}>
            <Form.Item
                name="default_unit_code"
                label="Default Unit Code"
            >
                <Select 
                        placeholder="Select Unit"
                        allowClear  
                        onChange={(value) => {
                            form.setFieldsValue({ default_unit_code: value || null });
                        }}
                >
                        {/* Add an empty option at the top */}
                    <Option value={null}>None</Option>  

                    {Array.isArray(units) && units.length > 0 ? (
                        units.map((unit) => (
                            <Option key={unit.unitCode} value={unit.unitCode}>
                                {unit.unitCode}
                            </Option>
                        ))
                    ) : (
                        <Option disabled>No units available</Option>
                    )}
                </Select>
            </Form.Item>
        </Col>
        <Col span={12}>
            <Form.Item
                name="reorder_limit"
                label="Reorder Limit"
            >
                <Input type="number" placeholder="Enter reorder limit" />
            </Form.Item>
        </Col>

        <Col span={12}>
            <Form.Item
                name="per100g_flag"
                valuePropName="checked"
                hidden
            >
                <Checkbox />
            </Form.Item>
        </Col>
    </Row>
</TabPane>

</Tabs>

</>
) : (
<>          
    <Form.Item name="default_unit_code" style={{ display: 'none' }}>
        <input type="hidden" />
    </Form.Item>
    <Form.Item name="per100_flag" style={{ display: 'none' }}>
        <input type="hidden" />
    </Form.Item>
    <Form.Item name="reorder_limit" style={{ display: 'none' }}>
        <input type="hidden" />
    </Form.Item>

</>
)
}

    <Form.Item name="track_invty_flag" style={{ display: 'none' }}>
        <input type="hidden" />
    </Form.Item>
    <Form.Item name="send_to_printer_flag" style={{ display: 'none' }}>
        <input type="hidden" />
    </Form.Item>
    <Form.Item name="non_vat_flag" style={{ display: 'none' }}>
        <input type="hidden" />
    </Form.Item>
    <Form.Item name="allow_sc_on_exempt" style={{ display: 'none' }}>
        <input type="hidden" />
    </Form.Item>
    <Form.Item name="disc_exempt" style={{ display: 'none' }}>
        <input type="hidden" />
    </Form.Item>
    <Form.Item name="default_price" style={{ display: 'none' }}>
        <input type="hidden" />
    </Form.Item>
    <Form.Item name="addon_price" style={{ display: 'none' }}>
        <input type="hidden" />
    </Form.Item>
    <Form.Item name="station_id" style={{ display: 'none' }}>
        <input type="hidden" />
    </Form.Item>
    <Form.Item name="allow_dinein_flag" style={{ display: 'none' }}>
        <input type="hidden" />
    </Form.Item>
    <Form.Item name="allow_pickup_flag" style={{ display: 'none' }}>
        <input type="hidden" />
    </Form.Item>
    <Form.Item name="allow_delivery_flag" style={{ display: 'none' }}>
        <input type="hidden" />
    </Form.Item>
    <Form.Item name="soldout_flag" style={{ display: 'none' }}>
        <input type="hidden" />
    </Form.Item>

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

export default Ingredients;