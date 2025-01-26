import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../config/axiosConfig"; // Keep using axiosInstance for localhost:8081
import { Button, Form, Input, Row, Col, message, InputNumber, Checkbox, Table, Tabs, Select } from "antd";
import { CheckOutlined, ArrowLeftOutlined, PlusOutlined } from "@ant-design/icons";
import "./Settings.css"; // Import custom CSS for tab styling

const { TabPane } = Tabs;
const { Option } = Select;

const Settings = () => {
    const [company, setCompany] = useState(null);
    const [dineInAliases, setDineInAliases] = useState([]);
    const [pickupAliases, setPickupAliases] = useState([]);
    const [deliveryAliases, setDeliveryAliases] = useState([]);
    const [tablePictures, setTablePictures] = useState([
        { filename: "round2.jpg", url: "http://localhost:8080/uploads/tables/round2.jpg" },
        { filename: "round4.jpg", url: "http://localhost:8080/uploads/tables/round4.jpg" },
        { filename: "round6.jpg", url: "http://localhost:8080/uploads/tables/round6.jpg" },
    ]); // Hardcoded list with image URLs
    const [form] = Form.useForm();
    const navigate = useNavigate();

    // Fetch Company details and aliases on component mount
    useEffect(() => {
        fetchCompanyDetails();
        fetchAliases('N', setDineInAliases);
        fetchAliases('P', setPickupAliases);
        fetchAliases('D', setDeliveryAliases);
    }, []);

    // Fetch Company Details
    const fetchCompanyDetails = async () => {
        try {
            const response = await axiosInstance.get(`/company/get/1`); // Use axiosInstance for localhost:8081
            setCompany(response.data);

            // Set form fields with the fetched data, including hidden fields
            form.setFieldsValue({
                cmpy_nm: response.data.cmpyName,
                operated_by: response.data.operatedBy,
                tin_no: response.data.tinNo,
                address1: response.data.address1,
                address2: response.data.address2,
                branch_manager: response.data.branchManager,
                branch_tel_no: response.data.branchTelNo,
                email: response.data.email,
                logo_filename: response.data.logoFilename,
                dinein_count: response.data.dineinCount,
                pickup_count: response.data.pickupCount,
                dlvry_count: response.data.dlvryCount,
                send_to_kitchen: response.data.sendToKitchen === 'Y', // Convert 'Y' to true, 'N' to false
                track_invty_flag: response.data.trackInvtyFlag === 'Y', // Convert 'Y' to true, 'N' to false
                roller_txt: response.data.rollerTxt,
            });
        } catch (error) {
            console.error("Failed to fetch company details:", error); // Debugging
            message.error("Failed to fetch company details.");
        }
    };

    // Fetch Aliases
    const fetchAliases = async (orderType, setAliases) => {
        try {
            const response = await axiosInstance.get(`/order_type/getAliases`, {
                params: { order_type: orderType }
            });
            setAliases(response.data);

            // Update the corresponding form field with the count of aliases
            if (orderType === 'N') {
                form.setFieldsValue({ dinein_count: response.data.length });
            } else if (orderType === 'P') {
                form.setFieldsValue({ pickup_count: response.data.length });
            } else if (orderType === 'D') {
                form.setFieldsValue({ dlvry_count: response.data.length });
            }
        } catch (error) {
            console.error(`Failed to fetch ${orderType} aliases:`, error);
            message.error(`Failed to fetch ${orderType} aliases.`);
        }
    };

    // Handle Generate Aliases
    const handleGenerateAliases = async (orderType, startNum, skipNums) => {
        try {
            // If skipNums is null or undefined, set it to an empty string
            const skipNumsValue = skipNums || '';

            await axiosInstance.post(`/order_type/generate`, null, {
                params: { 
                    order_type: orderType, 
                    start_num: startNum,
                    skip_nums: skipNumsValue, // Use skipNumsValue instead of skipNums
                }
            });
            message.success(`${orderType} aliases generated successfully.`);
            fetchAliases(orderType, orderType === 'N' ? setDineInAliases : orderType === 'P' ? setPickupAliases : setDeliveryAliases);
        } catch (error) {
            console.error(`Failed to generate ${orderType} aliases:`, error);
            message.error(`Failed to generate ${orderType} aliases.`);
        }
    };

    // Update Order Aliases
    const updateOrderAliases = async (orderType, aliases) => {
        try {
            // Prepare the payload
            const payload = aliases.map(alias => ({
                id: alias.id, // Ensure each alias has an `id` field
                orderType: orderType,
                tblNum: alias.tblNum,
                tblName: alias.tblName//,
                //picture: alias.picture, // Include the picture filename (only for Dine-in)
            }));
    
            // Log the payload for debugging
            console.log("Payload:", payload);
    
            // Make the API request
            const response = await axiosInstance.put(
                `/order_type/update/${orderType}`, // Use PUT instead of POST
                payload,
                {
                    headers: {
                        'Content-Type': 'application/json', // Ensure the correct content type
                        'Authorization': `Bearer ${localStorage.getItem('token')}`, // Add Authorization header
                    },
                }
            );
    
            // Log the response for debugging
            console.log("Response:", response.data);
    
            message.success(`${orderType} aliases updated successfully.`);
        } catch (error) {
            console.error(`Failed to update ${orderType} aliases:`, error);
    
            // Log the error response for debugging
            if (error.response) {
                console.error("Error Response Data:", error.response.data);
                console.error("Error Response Status:", error.response.status);
                console.error("Error Response Headers:", error.response.headers);
            }
    
            message.error(`Failed to update ${orderType} aliases.`);
        }
    };
        
    // Handle Update Submission
    const handleUpdate = async (values) => {
        try {
            // Ensure form fields are updated with the latest values
            const updatedValues = {
                ...values,
                dinein_count: dineInAliases.length,
                pickup_count: pickupAliases.length,
                dlvry_count: deliveryAliases.length,
                send_to_kitchen: values.send_to_kitchen ? 'Y' : 'N',
                track_invty_flag: values.track_invty_flag ? 'Y' : 'N',
            };

            await axiosInstance.put(`/company/update/1`, null, {
                params: {
                    cmpy_nm: updatedValues.cmpy_nm,
                    operated_by: updatedValues.operated_by,
                    tin_no: updatedValues.tin_no,
                    address1: updatedValues.address1,
                    address2: updatedValues.address2,
                    branch_manager: updatedValues.branch_manager,
                    branch_tel_no: updatedValues.branch_tel_no,
                    email: updatedValues.email,
                    logo_filename: updatedValues.logo_filename,
                    dinein_count: updatedValues.dinein_count,
                    pickup_count: updatedValues.pickup_count,
                    dlvry_count: updatedValues.dlvry_count,
                    send_to_kitchen: updatedValues.send_to_kitchen,
                    track_invty_flag: updatedValues.track_invty_flag,
                    roller_txt: updatedValues.roller_txt,
                },
            });
            message.success("Settings updated successfully.");

            // Update order aliases after updating company details
            await updateOrderAliases('N', dineInAliases); // Update Dine-in aliases
            await updateOrderAliases('P', pickupAliases); // Update Take-out aliases
            await updateOrderAliases('D', deliveryAliases); // Update Delivery aliases

            fetchCompanyDetails(); // Refresh company details
        } catch (error) {
            console.error("Update error:", error); // Debugging
            message.error("Failed to update settings. Please try again.");
        }
    };

    // Render Alias Section with Conditional Picture Dropdown
    const renderAliasSection = (orderType, aliases, setAliases, countField, startNumField, skipNumsField, numberLabel, nameLabel) => (
        <div style={{ border: "1px solid #d9d9d9", borderTop: "none", borderRadius: "0 0 4px 4px", padding: "16px", backgroundColor: "#fff" }}>
            <Row gutter={8}>
                <Col span={12}>
                    <Form.Item name={countField} label={`${numberLabel} Count`} style={{ marginBottom: "15px" }}>
                        <InputNumber min={0} style={{ width: "120px" }} placeholder="Count" />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item name={startNumField} label="Start No." style={{ marginBottom: "15px" }}>
                        <InputNumber min={0} style={{ width: "120px" }} placeholder="Start No." />
                    </Form.Item>
                </Col>
            </Row>
            <Form.Item name={skipNumsField} label="Skip Numbers" style={{ marginBottom: "15px" }}>
                <Input placeholder="e.g., 1,2,3" style={{ width: "100%" }} />
            </Form.Item>
            <Button type="primary" icon={<PlusOutlined />} onClick={() => handleGenerateAliases(orderType, form.getFieldValue(startNumField), form.getFieldValue(skipNumsField))}>
                Generate
            </Button>
            <Table
                dataSource={aliases}
                columns={[
                    {
                        title: numberLabel,
                        dataIndex: 'tblNum',
                        key: 'tblNum',
                    },
                    {
                        title: nameLabel,
                        dataIndex: 'tblName',
                        key: 'tblName',
                        render: (text, record, index) => (
                            <Input
                                value={text}
                                onChange={(e) => {
                                    const newAliases = [...aliases];
                                    newAliases[index].tblName = e.target.value;
                                    setAliases(newAliases);
                                }}
                                maxLength={10} // Limit input to 10 characters
                                style={{ width: "120px" }} // Set a fixed width for the input field
                            />
                        ),
                    },
                    // Conditionally render the "Picture" column only for Dine-in (orderType === 'N')
                    ...(orderType === 'N' ? [
                        {
                            title: 'Picture',
                            dataIndex: 'picture',
                            key: 'picture',
                            render: (text, record, index) => (
                                <Select
                                    value={{
                                        value: text, // The value of the selected option (filename)
                                        label: (
                                            <div style={{ display: "flex", alignItems: "center" }}>
                                                {text ? (
                                                    <img
                                                        src={tablePictures.find(pic => pic.filename === text)?.url || ''}
                                                        alt={text}
                                                        style={{ width: "24px", height: "24px", marginRight: "8px" }}
                                                    />
                                                ) : (
                                                    <span></span>
                                                )}
                                                {text || "No Pic"}
                                            </div>
                                        ),
                                    }}
                                    onChange={(value) => {
                                        const newAliases = [...aliases];
                                        //newAliases[index].picture = value; // This line is intentionally commented
                                        setAliases(newAliases);
                                    }}
                                    optionLabelProp="label"
                                    style={{ width: "120px" }}
                                    labelInValue
                                >
                                    {tablePictures.map((picture) => (
                                        <Option key={picture.filename} value={picture.filename} label={picture.filename}>
                                            <div style={{ display: "flex", alignItems: "center" }}>
                                                <img
                                                    src={picture.url}
                                                    alt={picture.filename}
                                                    style={{ width: "24px", height: "24px", marginRight: "8px" }}
                                                />
                                                {picture.filename}
                                            </div>
                                        </Option>
                                    ))}
                                </Select>
                            ),
                        },
                    ] : []),
                ]}
                rowKey="tblNum"
                pagination={false}
                style={{ marginTop: "16px" }}
            />
        </div>
    );

    return (
        <div style={{ padding: "20px", fontFamily: "'Roboto', sans-serif", backgroundColor: "#f9f9f9", borderRadius: "8px", maxWidth: "800px", margin: "40px auto", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
            <h1 style={{ fontSize: "24px", fontWeight: "bold", textAlign: "center", marginBottom: "20px", color: "#333" }}>Settings</h1>

            {company && (
                <Form form={form} layout="vertical" onFinish={handleUpdate} initialValues={company}>
                    <Form.Item name="roller_txt" label="Roller Text" style={{ marginBottom: "15px" }}>
                        <Input placeholder="Enter roller text" style={{ height: "40px", borderRadius: "4px", border: "1px solid #ccc", padding: "8px" }} />
                    </Form.Item>

                    <Tabs
                        defaultActiveKey="1"
                        tabBarStyle={{
                            backgroundColor: "#fff",
                            borderBottom: "1px solid #d9d9d9",
                            padding: "0 16px",
                            marginBottom: 0, // Remove margin at the bottom of the tabs
                        }}
                        tabBarGutter={0} // Remove gutter between tabs
                    >
                        <TabPane tab="Dine-in" key="1">
                            {renderAliasSection('N', dineInAliases, setDineInAliases, 'dinein_count', 'dinein_start_num', 'dinein_skip_nums', 'Table Number', 'Table Name')}
                        </TabPane>
                        <TabPane tab="Take-out" key="2">
                            {renderAliasSection('P', pickupAliases, setPickupAliases, 'pickup_count', 'pickup_start_num', 'pickup_skip_nums', 'Take-out Number', 'Take-out Name')}
                        </TabPane>
                        <TabPane tab="Delivery" key="3">
                            {renderAliasSection('D', deliveryAliases, setDeliveryAliases, 'dlvry_count', 'dlvry_start_num', 'dlvry_skip_nums', 'Delivery Number', 'Delivery Name')}
                        </TabPane>
                    </Tabs>

                    {/* Hidden Fields */}
                    <Form.Item name="cmpy_nm" style={{ display: "none" }}>
                        <Input type="hidden" />
                    </Form.Item>
                    <Form.Item name="operated_by" style={{ display: "none" }}>
                        <Input type="hidden" />
                    </Form.Item>
                    <Form.Item name="tin_no" style={{ display: "none" }}>
                        <Input type="hidden" />
                    </Form.Item>
                    <Form.Item name="address1" style={{ display: "none" }}>
                        <Input type="hidden" />
                    </Form.Item>
                    <Form.Item name="address2" style={{ display: "none" }}>
                        <Input type="hidden" />
                    </Form.Item>
                    <Form.Item name="branch_manager" style={{ display: "none" }}>
                        <Input type="hidden" />
                    </Form.Item>
                    <Form.Item name="branch_tel_no" style={{ display: "none" }}>
                        <Input type="hidden" />
                    </Form.Item>
                    <Form.Item name="email" style={{ display: "none" }}>
                        <Input type="hidden" />
                    </Form.Item>
                    <Form.Item name="logo_filename" style={{ display: "none" }}>
                        <Input type="hidden" />
                    </Form.Item>

                    {/* Send to Kitchen and Track Inventory */}
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item name="send_to_kitchen" valuePropName="checked" style={{ marginBottom: "15px" }}>
                                <Checkbox>Send to Kitchen</Checkbox>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="track_invty_flag" valuePropName="checked" style={{ marginBottom: "15px" }}>
                                <Checkbox>Track Inventory</Checkbox>
                            </Form.Item>
                        </Col>
                    </Row>

                    <div style={{ textAlign: "right", marginTop: "20px" }}>
                        <Button type="primary" htmlType="submit" icon={<CheckOutlined />} style={{ backgroundColor: "#007bff", color: "white", borderRadius: "4px", height: "40px", padding: "0 20px", marginRight: "10px" }}>
                            Save
                        </Button>
                        <Button onClick={() => navigate("/")} icon={<ArrowLeftOutlined />} style={{ backgroundColor: "#dc3545", color: "white", borderRadius: "4px", height: "40px", padding: "0 20px" }}>
                            Cancel
                        </Button>
                    </div>
                </Form>
            )}
        </div>
    );
};

export default Settings;