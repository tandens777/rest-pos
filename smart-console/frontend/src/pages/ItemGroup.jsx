import React, { useState, useEffect } from "react";
import axiosInstance from "../config/axiosConfig"; // Import the configured Axios instance
import { Button, Table, Form, Input, Space, Modal, message, Pagination, Popconfirm, Select } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined, SearchOutlined, CheckOutlined, ArrowLeftOutlined } from "@ant-design/icons";

const ItemGroup = () => {
    const [loading, setLoading] = useState(false);

    const [itemGroups, setItemGroups] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingItemGroup, setEditingItemGroup] = useState(null);
    const [form] = Form.useForm();
    const [searchForm] = Form.useForm();  // Separate form for search    
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const [itemGroupItems, setItemGroupItems] = useState([]);
    const [searchItems, setSearchItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);    

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
            setLoading(true); // Show spinner            
            const response = await axiosInstance.get("/item_group/all");
            setItemGroups(response.data);
        } catch (error) {
            message.error("Failed to fetch food menu groups");
        } finally {
            setLoading(false); // Hide spinner
        }
    };

    const fetchItemGroupItems = async (itemGrpId) => {
        try {
            const response = await axiosInstance.get("/item_group/get_item_group_items", {
                params: { item_grp_id: itemGrpId }
            });
            setItemGroupItems(response.data);
            console.log("fetch data:", response.data);
        } catch (error) {
            message.error("Failed to fetch item group items");
        }
    };

    // Search for Item Groups
    const handleSearch = async () => {
        try {
            setLoading(true); // Show spinner
            const response = await axiosInstance.get(`/item_group/all?search=${searchTerm}`);
            setItemGroups(response.data);
        } catch (error) {
            //message.error("Failed to search food menu groups");
        } finally {
            setLoading(false); // Hide spinner
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
        setItemGroupItems([]);
        setSelectedItem(null);
        setSearchItems([]);
    };

    // Edit an Existing Item Groups
    const handleEdit = (itemGroup) => {
        setEditingItemGroup(itemGroup);
        setIsModalVisible(true);
        setSelectedItem(null);
        setSearchItems([]);
        form.setFieldsValue({
            item_grp_desc: itemGroup.itemGrpDesc,
        });
        fetchItemGroupItems(itemGroup.itemGrpId);
    };

    const handleDeleteItem = (itemId) => {
        setItemGroupItems(prevItems => prevItems.filter(item => item.itemId !== itemId));
    };

    const handleSearchItem = async (value) => {
        if (!value) return;
        try {
            const response = await axiosInstance.get("/food_menu/all_food_menus", { params: { search: value } });
            setSearchItems(response.data);
        } catch (error) {
            message.error("Failed to search items");
        }
    };

    const handleAddItem = () => {
        console.log("inside adding items: ", selectedItem);
        console.log("before itemgroupitems:", itemGroupItems);
    
        if (selectedItem && !itemGroupItems.some(item => item.itemId === selectedItem.id)) {
            setItemGroupItems(prevItems => [
                ...prevItems,
                {
                    id: prevItems.length > 0 ? Math.max(...prevItems.map(item => item.id)) + 1 : 1, // Assuming backend assigns this later
                    itemGrpId: editingItemGroup ? editingItemGroup.itemGrpId : null, // Assign item group if available
                    itemId: selectedItem.id,
                    itemCode: selectedItem.itemCode,
                    itemDesc: selectedItem.itemDesc,
                    addonPrice: 0
                }
            ]);
        }
        setSelectedItem(null);
    };
    
    // Use `useEffect` to log the updated state after it's applied
    useEffect(() => {
        console.log("Updated itemGroupItems:", itemGroupItems);
    }, [itemGroupItems]); // Runs when `itemGroupItems` updates
    
        
    // Delete a Item Group
    const handleDelete = async (id) => {
        try {
            // Delete the Item Group 
            await axiosInstance.delete(`/item_group/delete/${id}`);
            message.success("Food menu group deleted successfully");

            // Update the Item Groups state without fetching from the server
            const updatedItemGroups = itemGroups.filter((itemGroup) => itemGroup.itemGrpId !== id);
            setItemGroups(updatedItemGroups);

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
                            item_grp_desc: values.item_grp_desc,
                        },
                    }
                );
                message.success("Food menu group updated successfully");
            } else {
                // Add New Item Group 
                const response = await axiosInstance.post(
                    `/item_group/add`,
                    null,
                    {
                        params: {
                            item_grp_desc: values.item_grp_desc,
                        },
                    }
                );
                setEditingItemGroup(response.data);
                message.success("Food menu group added successfully");
            }

            // save itemGroupItems
            await updateItemGroupItems(editingItemGroup.itemGrpId, itemGroupItems);

            setIsModalVisible(false);
            fetchItemGroups();
        } catch (error) {
            message.error("Failed to save food menu group. Please try again.", error);
        }
    };

    const updateItemGroupItems = async (itemGrpId, itemGroupItems) => {
        console.log("Fetched itemGroupItems details:", itemGroupItems);
        try {
          const payload = itemGroupItems.map(grp_item => ({
            id: grp_item.id,
            itemGrpId: itemGrpId,
            itemId: grp_item.itemId,
            addonPrice: parseFloat(grp_item.addonPrice) || 0 // Ensure decimal format
          }));
    
          console.log("payload: ", payload);
          
          await axiosInstance.put(
            `/item_group/update_item_group_items/${itemGrpId}`,
            payload,
            {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
              },
            }
          );
    
          message.success(`Food menu group items updated successfully.`);
        } catch (error) {
          console.error(`Failed to update itemGroupItems:`, error);
          message.error(`Failed to update itemGroupItems:.`);
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
                    <Form form={searchForm}
                        layout="inline"
                    >
                        <Form.Item name="search">  
                            <Input
                                placeholder="Search food menu groups..."
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
                dataSource={paginatedItemGroups}
                rowKey="itemGrpId"
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
                width="800px"
                maskStyle={{
                    backgroundColor: "rgba(0, 0, 0, 0.6)",
                }}
                bodyStyle={{
                    padding: "20px",
                    borderRadius: "8px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                    maxHeight: "600px", // Limit modal height
                    overflowY: "auto" // Enable scrolling inside modal
                }}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleModalSubmit}
                >
                    <Form.Item
                        name="item_grp_desc"
                        label="Food Menu Group Name"
                        rules={[{ required: true, message: "Food Menu Group name is required." }]}
                        onChange={(e) => {
                            form.setFieldsValue({ item_grp_desc: e.target.value.toUpperCase() });
                        }}
                    >
                        <Input placeholder="Enter food menu group name" />
                    </Form.Item>

<div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
    <Select
        showSearch
        placeholder="Search and select item"
        filterOption={false}
        onSearch={handleSearchItem}
        onSelect={(value, option) => setSelectedItem(option.item)}
        style={{ flex: 1, minWidth: "250px" }} // Ensure it takes available space
    >
        {searchItems.map(item => (
            <Select.Option key={item.itemId} value={item.itemId} item={item}>
                {item.itemCode} - {item.itemDesc}
            </Select.Option>
        ))}
    </Select>

    <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={handleAddItem}
        style={{
            backgroundColor: "#28a745", // Green color for consistency
            borderColor: "#28a745",
            color: "#fff",
            height: "40px",
        }}
    >
        Add Item
    </Button>
</div>
                    
                    <Table columns={[
                        { title: "Item Code", dataIndex: "itemCode", key: "itemCode" },
                        { title: "Item Description", dataIndex: "itemDesc", key: "itemDesc" },
                        { title: "Addon Price", dataIndex: "addonPrice", key: "addonPrice", render: (text, record) => (
                            <Input type="number" value={record.addonPrice} 
                                step="0.01" // Allows decimal input
                                min="0" 
                                onChange={(e) => {
                                const newValue = e.target.value;
                                setItemGroupItems(prevItems => prevItems.map(item => item.itemId === record.itemId ? { ...item, addonPrice: newValue } : item));
                            }} />
                        ) },
                        {
                            title: "Actions", key: "actions",
                            render: (text, record) => (
                                <Button icon={<DeleteOutlined />} danger onClick={() => handleDeleteItem(record.itemId)} />
                            )
                        }
                    ]} dataSource={itemGroupItems} rowKey="id" pagination={false} />

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

export default ItemGroup;