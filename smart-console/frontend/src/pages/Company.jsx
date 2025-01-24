import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../config/axiosConfig"; // Import the configured Axios instance
import { Button, Form, Input, Row, Col, message, Upload } from "antd";
import { UploadOutlined, CheckOutlined, ArrowLeftOutlined  } from "@ant-design/icons";

const Company = () => {
    const [company, setCompany] = useState(null);
    const [logoPreview, setLogoPreview] = useState(""); // State for logo preview
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

            // working format  
            // cmpy_nm: response.data.cmpyName
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
                logo_filename: response.data.logoFilename,
                dinein_count: response.data.dineinCount,
                pickup_count: response.data.pickupCount,
                dlvry_count: response.data.dlvryCount,
                send_to_kitchen: response.data.sendToKitchen,
                track_invty_flag: response.data.trackInvtyFlag,
            });

            if (response.data.logoFilename) {
                setLogoPreview(`http://localhost:8080${response.data.logoFilename}`); // Generate the full URL for preview
            } else {
                setLogoPreview("");
            }

        } catch (error) {
            message.error("Failed to fetch company details.");
        }
    };

    // Handle Update Submission
    const handleUpdate = async (values) => {
        // Check if logo_filename is [object Object] and set it to null
        if (values.logo_filename && values.logo_filename.toString() === "[object Object]") {
            values.logo_filename = null;
        }        

        try {

            /*message.success(
                `Form Values:
                Logo Filename: ${values.logo_filename || "No logo"}
                `
            );*/

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
                    logo_filename: values.logo_filename,
                },
            });
            message.success("Company details updated successfully.");
            fetchCompanyDetails(); // Refresh company details
        } catch (error) {
            console.error("Update error:", error); // Log the error for debugging
            message.error("Failed to update company details. Please try again.", error);
        }
    };

    // Handle File Upload
    const handleUpload = async (file) => {
        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await axiosInstance.post("/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            const filePath = response.data.filePath; // The relative path returned by the backend
            form.setFieldsValue({ logo_filename: filePath });
            setLogoPreview(`http://localhost:8080${filePath}`); // Generate the full URL for preview
            message.success("File uploaded successfully.");
        } catch (error) {
            console.error("Upload error:", error);
            message.error("Failed to upload file.");
        }
    };

    // Handle File Removal
    const handleRemove = async () => {
        try {

            // Set logo_filename to an empty string and clear the preview
            form.setFieldsValue({ logo_filename: "" });
            setLogoPreview("");

            // Get the current form values
            const values = form.getFieldsValue();

            // Display the form values in a single message
            /*message.success(
                `Form Values:
                Logo Filename: ${values.logo_filename || "No logo"}`
            );*/            

            message.success("Logo removed successfully.");
        } catch (error) {
            console.error("Remove error:", error); // Log the error for debugging
            message.error("Failed to remove logo.");
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
                Company Details
            </h1>

            {company && (
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleUpdate}
                    initialValues={company}
                >
                    <Form.Item
                        name="cmpy_nm"
                        label="Company Name"
                        rules={[{ required: true, message: "Company name is required." }]}
                        style={{ marginBottom: "15px" }}
                    >
                        <Input
                            placeholder="Enter company name"
                            style={{
                                height: "40px",
                                borderRadius: "4px",
                                border: "1px solid #ccc",
                                padding: "8px",
                            }}
                        />
                    </Form.Item>
                    <Form.Item
                        name="operated_by"
                        label="Operated By"
                        rules={[{ required: true, message: "Operator name is required." }]}
                        style={{ marginBottom: "15px" }}
                    >
                        <Input
                            placeholder="Enter operator name"
                            style={{
                                height: "40px",
                                borderRadius: "4px",
                                border: "1px solid #ccc",
                                padding: "8px",
                            }}
                        />
                    </Form.Item>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="tin_no"
                                label="TIN Number"
                                rules={[{ required: true, message: "TIN number is required." }]}
                                style={{ marginBottom: "15px" }}
                            >
                                <Input
                                    placeholder="Enter TIN number"
                                    style={{
                                        height: "40px",
                                        borderRadius: "4px",
                                        border: "1px solid #ccc",
                                        padding: "8px",
                                    }}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="branch_manager"
                                label="Branch Manager"
                                style={{ marginBottom: "15px" }}
                            >
                                <Input
                                    placeholder="Enter branch manager name"
                                    style={{
                                        height: "40px",
                                        borderRadius: "4px",
                                        border: "1px solid #ccc",
                                        padding: "8px",
                                    }}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="branch_tel_no"
                                label="Branch Telephone Number"
                                style={{ marginBottom: "15px" }}
                            >
                                <Input
                                    placeholder="Enter branch telephone number"
                                    style={{
                                        height: "40px",
                                        borderRadius: "4px",
                                        border: "1px solid #ccc",
                                        padding: "8px",
                                    }}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="email" label="Email" style={{ marginBottom: "15px" }}>
                                <Input
                                    placeholder="Enter email"
                                    style={{
                                        height: "40px",
                                        borderRadius: "4px",
                                        border: "1px solid #ccc",
                                        padding: "8px",
                                    }}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item name="address1" label="Address Line 1" style={{ marginBottom: "15px" }}>
                        <Input
                            placeholder="Enter address line 1"
                            style={{
                                height: "40px",
                                borderRadius: "4px",
                                border: "1px solid #ccc",
                                padding: "8px",
                            }}
                        />
                    </Form.Item>
                    <Form.Item name="address2" label="Address Line 2" style={{ marginBottom: "15px" }}>
                        <Input
                            placeholder="Enter address line 2"
                            style={{
                                height: "40px",
                                borderRadius: "4px",
                                border: "1px solid #ccc",
                                padding: "8px",
                            }}
                        />
                    </Form.Item>
                    <Form.Item name="logo_filename" label="Company Logo">
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
                                              name: "Company Logo",
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
                    <Form.Item name="dinein_count" style={{ display: "none" }}>
                        <Input type="hidden" />
                    </Form.Item>
                    <Form.Item name="pickup_count" style={{ display: "none" }}>
                        <Input type="hidden" />
                    </Form.Item>
                    <Form.Item name="dlvry_count" style={{ display: "none" }}>
                        <Input type="hidden" />
                    </Form.Item>
                    <Form.Item name="send_to_kitchen" style={{ display: "none" }}>
                        <Input type="hidden" />
                    </Form.Item>
                    <Form.Item name="track_invty_flag" style={{ display: "none" }}>
                        <Input type="hidden" />
                    </Form.Item>
                    <Form.Item name="roller_txt" style={{ display: "none" }}>
                        <Input type="hidden" />
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

export default Company;
