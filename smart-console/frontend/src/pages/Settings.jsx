import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../config/axiosConfig"; // Import the configured Axios instance
import { Button, Form, Input, Row, Col, message } from "antd";
import { CheckOutlined, ArrowLeftOutlined } from "@ant-design/icons";

const Settings = () => {
    const [company, setCompany] = useState(null);
    const [form] = Form.useForm();
    const navigate = useNavigate();

    // Fetch Company details on component mount
    useEffect(() => {
        fetchCompanyDetails();
    }, []);

    // Fetch Company Details
    const fetchCompanyDetails = async () => {
        try {
            const response = await axiosInstance.get(`/company/get/1`); // Assuming the company ID is 1
            setCompany(response.data);

            // Set form values
            form.setFieldsValue({
                cmpy_nm: response.data.cmpyName,
                operated_by: response.data.operatedBy,
                tin_no: response.data.tinNo,
                address1: response.data.address1,
                address2: response.data.address2,
                roller_txt: response.data.rollerTxt,
                branch_manager: response.data.branchManager,
                branch_tel_no: response.data.branchTelNo,
                email: response.data.email,
                dinein_count: response.data.dineinCount,
                pickup_count: response.data.pickupCount,
                dlvry_count: response.data.dlvryCount,
                send_to_kitchen: response.data.sendToKitchen,
                track_invty_flag: response.data.trackInvtyFlag,
            });
        } catch (error) {
            message.error("Failed to fetch company details.");
        }
    };

    // Handle Update Submission
    const handleUpdate = async (values) => {
        try {
            await axiosInstance.put(`/company/update/1`, null, {
                params: {
                    cmpy_nm: values.cmpy_nm,
                    operated_by: values.operated_by,
                    tin_no: values.tin_no,
                    address1: values.address1,
                    address2: values.address2,
                    branch_manager: values.branch_manager,
                    branch_tel_no: values.branch_tel_no,
                    email: values.email,
                    dinein_count: values.dinein_count,
                    pickup_count: values.pickup_count,
                    dlvry_count: values.dlvry_count,
                    send_to_kitchen: values.send_to_kitchen,
                    track_invty_flag: values.track_invty_flag,
                    roller_txt: values.roller_txt,
                    logo_filename: values.logo_filename, // This will still be sent but is hidden in the form
                },
            });
            message.success("Company details updated successfully.");
            fetchCompanyDetails(); // Refresh company details
        } catch (error) {
            console.error("Update error:", error); // Log the error for debugging
            message.error("Failed to update company details. Please try again.", error);
        }
    };

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
                Settings
            </h1>

            {company && (
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleUpdate}
                    initialValues={company}
                >
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

                    {/* Visible Fields */}
                    <Form.Item
                        name="dinein_count"
                        label="Dine-in Count"
                        rules={[{ required: true, message: "Dine-in count is required." }]}
                        style={{ marginBottom: "15px" }}
                    >
                        <Input
                            placeholder="Enter dine-in count"
                            style={{
                                height: "40px",
                                borderRadius: "4px",
                                border: "1px solid #ccc",
                                padding: "8px",
                            }}
                        />
                    </Form.Item>
                    <Form.Item
                        name="pickup_count"
                        label="Pickup Count"
                        rules={[{ required: true, message: "Pickup count is required." }]}
                        style={{ marginBottom: "15px" }}
                    >
                        <Input
                            placeholder="Enter pickup count"
                            style={{
                                height: "40px",
                                borderRadius: "4px",
                                border: "1px solid #ccc",
                                padding: "8px",
                            }}
                        />
                    </Form.Item>
                    <Form.Item
                        name="dlvry_count"
                        label="Delivery Count"
                        rules={[{ required: true, message: "Delivery count is required." }]}
                        style={{ marginBottom: "15px" }}
                    >
                        <Input
                            placeholder="Enter delivery count"
                            style={{
                                height: "40px",
                                borderRadius: "4px",
                                border: "1px solid #ccc",
                                padding: "8px",
                            }}
                        />
                    </Form.Item>
                    <Form.Item
                        name="send_to_kitchen"
                        label="Send to Kitchen"
                        rules={[{ required: true, message: "Send to kitchen flag is required." }]}
                        style={{ marginBottom: "15px" }}
                    >
                        <Input
                            placeholder="Enter send to kitchen flag"
                            style={{
                                height: "40px",
                                borderRadius: "4px",
                                border: "1px solid #ccc",
                                padding: "8px",
                            }}
                        />
                    </Form.Item>
                    <Form.Item
                        name="track_invty_flag"
                        label="Track Inventory Flag"
                        rules={[{ required: true, message: "Track inventory flag is required." }]}
                        style={{ marginBottom: "15px" }}
                    >
                        <Input
                            placeholder="Enter track inventory flag"
                            style={{
                                height: "40px",
                                borderRadius: "4px",
                                border: "1px solid #ccc",
                                padding: "8px",
                            }}
                        />
                    </Form.Item>
                    <Form.Item
                        name="roller_txt"
                        label="Roller Text"
                        rules={[{ required: true, message: "Roller text is required." }]}
                        style={{ marginBottom: "15px" }}
                    >
                        <Input
                            placeholder="Enter roller text"
                            style={{
                                height: "40px",
                                borderRadius: "4px",
                                border: "1px solid #ccc",
                                padding: "8px",
                            }}
                        />
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
                            onClick={() => navigate("/")}
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
            )}
        </div>
    );
};

export default Settings;