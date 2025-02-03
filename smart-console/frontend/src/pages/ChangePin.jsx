import React from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../config/axiosConfig"; // Import the configured Axios instance
import { Button, Form, Input, message } from "antd";
import { CheckOutlined, ArrowLeftOutlined } from "@ant-design/icons";

const ChangePin = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const username = localStorage.getItem("username") || "User";

    // Handle Change PIN Submission
    const handleChangePin = async (values) => {
        try {
            await axiosInstance.put("/employees/change_pin", null, {
                params: {
                    username: username,
                    old_password: values.old_password,
                    new_password: values.new_password,
                },
            });
            message.success("PIN changed successfully.");
            navigate("/");
        } catch (error) {
            console.error("Change PIN error:", error); // Debugging
    
            // Extract error message from the response
            const errorMessage =
                error.response?.data?.message || // Backend error message
                error.response?.data?.error ||  // Alternative error field
                "Failed to change PIN. Please try again."; // Fallback message
    
            message.error(errorMessage); // Display specific error message
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
                Change PIN
            </h1>

            <Form
                form={form}
                layout="vertical"
                onFinish={handleChangePin}
                style={{ maxWidth: "300px", margin: "0 auto" }} // Center the form and limit its width
            >
                <Form.Item
                    name="old_password"
                    label="Current Password PIN"
                    rules={[
                        { required: true, message: "Current password PIN is required." },
                        { len: 6, message: "PIN must be exactly 6 numbers." }, // Ensure PIN is exactly 6 digits
                    ]}
                    style={{ marginBottom: "15px" }}
                >
                    <Input.Password
                        placeholder="Enter current password PIN"
                        maxLength={6} // Limit input to 6 characters
                        style={{
                            height: "40px",
                            borderRadius: "4px",
                            border: "1px solid #ccc",
                            padding: "8px",
                            textAlign: "center", // Center the text inside the input
                            maxWidth: "300px", // Limit the width of the input box
                            margin: "0 auto", // Center the input box
                        }}
                    />
                </Form.Item>
                <Form.Item
                    name="new_password"
                    label="New Password PIN"
                    rules={[
                        { required: true, message: "New password PIN is required." },
                        { len: 6, message: "PIN must be exactly 6 numbers." }, // Ensure PIN is exactly 6 digits
                    ]}
                    style={{ marginBottom: "15px" }}
                >
                    <Input.Password
                        placeholder="Enter new password PIN"
                        maxLength={6} // Limit input to 6 characters
                        style={{
                            height: "40px",
                            borderRadius: "4px",
                            border: "1px solid #ccc",
                            padding: "8px",
                            textAlign: "center", // Center the text inside the input
                            maxWidth: "300px", // Limit the width of the input box
                            margin: "0 auto", // Center the input box
                        }}
                    />
                </Form.Item>
                <div style={{ textAlign: "center", marginTop: "20px" }}> {/* Center the buttons */}
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
                            marginRight: "10px", // Space between buttons
                        }}
                    >
                        Change
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
        </div>
    );
};

export default ChangePin;