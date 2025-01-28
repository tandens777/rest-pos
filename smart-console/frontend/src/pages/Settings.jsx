import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../config/axiosConfig";
import { Button, Form, Input, Row, Col, message, InputNumber, Switch, Table, Tabs, Select } from "antd";
import { CheckOutlined, ArrowLeftOutlined, PlusOutlined, EditOutlined } from "@ant-design/icons";
import EditPositionModal from "./EditPositionModal";
import "./Settings.css";

const { TabPane } = Tabs;
const { Option } = Select;

// Environment variables for API and file server URLs
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
const fileBaseUrl = import.meta.env.VITE_FILE_BASE_URL + '/uploads/tables/';

const Settings = () => {
  const [company, setCompany] = useState(null);
  const [dineInAliases, setDineInAliases] = useState([]);
  const [pickupAliases, setPickupAliases] = useState([]);
  const [deliveryAliases, setDeliveryAliases] = useState([]);
  /*const [tablePictures] = useState([
    { id: 1, filename: "round2.png" },
    { id: 2, filename: "round4.png" },
    { id: 3, filename: "round6.png" },
  ]);
  const [floors] = useState([
    { id: 1, name: "Gnd Floor" },
    { id: 2, name: "2nd Floor" },
  ]);*/
  const [tablePictures, setTablePictures] = useState([]); // State for table pictures
  const [floors, setFloors] = useState([]); // State for floors

  // Fetch table pictures from the API
  const fetchTablePictures = async () => {
    try {
      const response = await axiosInstance.get("/table_pictures/all");
      setTablePictures(response.data); // Update state with fetched data
    } catch (error) {
      console.error("Failed to fetch table pictures:", error);
    }
  };

  // Fetch floors from the API
  const fetchFloors = async () => {
    try {
      const response = await axiosInstance.get("/floors/all");
      setFloors(response.data); // Update state with fetched data
    } catch (error) {
      console.error("Failed to fetch floors:", error);
    }
  };

  const [editPositionsModalVisible, setEditPositionsModalVisible] = useState(false);
  const [loading, setLoading] = useState(true); // Add loading state
  const [form] = Form.useForm();
  const navigate = useNavigate();

  // Fetch company details and aliases on component mount
  useEffect(() => {
    fetchTablePictures();
    fetchFloors();
    fetchCompanyDetails();
    fetchAliases("N", setDineInAliases);
    fetchAliases("P", setPickupAliases);
    fetchAliases("D", setDeliveryAliases);
  }, []);

  // Fetch company details
  const fetchCompanyDetails = async () => {
    try {
      const response = await axiosInstance.get(`/company/get/1`);
      setCompany(response.data);

      // Transform "Y" to true and "N" to false for the Switch components
      const sendToKitchenBoolean = response.data.sendToKitchen === "Y";
      const trackInvtyFlagBoolean = response.data.trackInvtyFlag === "Y";

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
        send_to_kitchen: sendToKitchenBoolean, // Set as boolean
        track_invty_flag: trackInvtyFlagBoolean, // Set as boolean
        roller_txt: response.data.rollerTxt,
      });

      console.log("Fetched company details:", response.data);
    } catch (error) {
      console.error("Failed to fetch company details:", error);
      message.error("Failed to fetch company details.");
    } finally {
      setLoading(false); // Set loading to false after fetching
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
      fetchAliases(orderType, orderType === "N" ? setDineInAliases : orderType === "P" ? setPickupAliases : setDeliveryAliases);
    } catch (error) {
      console.error(`Failed to generate ${orderType} aliases:`, error);
      message.error(`Failed to generate ${orderType} aliases.`);
    }
  };

  // Update Order Aliases
  const updateOrderAliases = async (orderType, aliases) => {
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

  // Handle Update Submission
  const handleUpdate = async (values) => {
    try {
      console.log("Form values on submit:", values);

      const updatedValues = {
        ...values,
        dinein_count: values.dinein_count ?? dineInAliases.length,
        pickup_count: values.pickup_count ?? pickupAliases.length,
        dlvry_count: values.dlvry_count ?? deliveryAliases.length,
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

      await updateOrderAliases('N', dineInAliases);
      await updateOrderAliases('P', pickupAliases);
      await updateOrderAliases('D', deliveryAliases);

      fetchCompanyDetails();
    } catch (error) {
      console.error("Update error:", error);
      message.error("Failed to update settings. Please try again.");
    }
  };

  // Function to handle updated table positions
  const handleSavePositions = (updatedTables) => {
    const updatedAliases = dineInAliases.map((alias, index) => ({
      ...alias,
      positionX: updatedTables[index].position.x,
      positionY: updatedTables[index].position.y,
    }));
    setDineInAliases(updatedAliases);
  };

  // Render alias section
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
      <Row justify="space-between" style={{ marginBottom: "16px" }}>
        <Col>
          <Button type="primary" icon={<PlusOutlined />} onClick={() => handleGenerateAliases(orderType, form.getFieldValue(startNumField), form.getFieldValue(skipNumsField))}>
            Generate
          </Button>
        </Col>
        {orderType === "N" && (
          <Col>
            <Button
              type="primary"
              icon={<EditOutlined />}
              style={{ backgroundColor: "#52c41a" }}
              onClick={() => setEditPositionsModalVisible(true)}
            >
              Edit Positions
            </Button>
          </Col>
        )}
      </Row>
      <Table
        dataSource={aliases}
        columns={[
          {
            title: numberLabel,
            dataIndex: "tblNum",
            key: "tblNum",
          },
          {
            title: nameLabel,
            dataIndex: "tblName",
            key: "tblName",
            render: (text, record, index) => (
              <Input
                value={text}
                onChange={(e) => {
                  const newAliases = [...aliases];
                  newAliases[index].tblName = e.target.value;
                  setAliases(newAliases);
                }}
                maxLength={10}
                style={{ width: "120px" }}
                required={true}
              />
            ),
          },
          ...(orderType === "N"
            ? [
                {
                  title: "Floor",
                  dataIndex: "floor",
                  key: "floor",
                  render: (text, record, index) => (
                    <Select
                      value={text}
                      onChange={(value) => {
                        const newAliases = [...aliases];
                        newAliases[index].floor = value;
                        setAliases(newAliases);                        
                      }}
                      style={{ width: "120px" }}
                    >
                      {floors.map((floor) => (
                        <Option key={floor.id} value={floor.id}>
                          {floor.name}
                        </Option>
                      ))}
                    </Select>
                  ),
                },
              ]
            : []),
          ...(orderType === "N"
            ? [
                {
                  title: "Picture",
                  dataIndex: "picture",
                  key: "picture",
                  render: (text, record, index) => (
                    <Select
                      value={text}
                      onChange={(value) => {
                        const newAliases = [...aliases];
                        newAliases[index].picture = value;
                        setAliases(newAliases);
                      }}
                      style={{ width: "180px" }}
                    >
                      {tablePictures.map((picture) => (
                        <Option key={picture.filename} value={picture.filename}>
                          <div style={{ display: "flex", alignItems: "center" }}>
                            <img
                              src={`${fileBaseUrl}${picture.filename}`}
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
              ]
            : []),
          ...(orderType === "N"
            ? [
                {
                  title: "Position X",
                  dataIndex: "positionX",
                  key: "positionX",
                  render: (text, record, index) => (
                    <InputNumber
                      value={text}
                      onChange={(value) => {
                        const newAliases = [...aliases];
                        newAliases[index].positionX = value;
                        setAliases(newAliases);
                      }}
                      style={{ width: "100px" }}
                    />
                  ),
                },
                {
                  title: "Position Y",
                  dataIndex: "positionY",
                  key: "positionY",
                  render: (text, record, index) => (
                    <InputNumber
                      value={text}
                      onChange={(value) => {
                        const newAliases = [...aliases];
                        newAliases[index].positionY = value;
                        setAliases(newAliases);
                      }}
                      style={{ width: "100px" }}
                    />
                  ),
                },
              ]
            : []),
        ]}
        rowKey="tblNum"
        pagination={false}
        style={{ marginTop: "16px" }}
      />
    </div>
  );

  return (
    <div class="ant-modal-content2" style={{ padding: "20px", fontFamily: "'Roboto', sans-serif", backgroundColor: "#f9f9f9", borderRadius: "8px", maxWidth: "1000px", margin: "40px auto", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
      <h1 style={{ fontSize: "24px", fontWeight: "bold", textAlign: "center", marginBottom: "20px", color: "#333" }}>Settings</h1>

      {loading ? (
        <div>Loading...</div>
      ) : (
        company && (
          <Form form={form} layout="vertical" key={company?.id || 'default'} onFinish={handleUpdate} 
          initialValues={{
            send_to_kitchen: true, // Default
            track_invty_flag: false, // Default
          }} >
            <Form.Item name="roller_txt" label="Roller Text" style={{ marginBottom: "15px" }}>
              <Input placeholder="Enter roller text" style={{ height: "40px", borderRadius: "4px", border: "1px solid #ccc", padding: "8px" }} />
            </Form.Item>

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
              <TabPane tab="Dine-in" key="1">
                {renderAliasSection("N", dineInAliases, setDineInAliases, "dinein_count", "dinein_start_num", "dinein_skip_nums", "Table Number", "Table Name")}
              </TabPane>
              <TabPane tab="Take-out" key="2">
                {renderAliasSection("P", pickupAliases, setPickupAliases, "pickup_count", "pickup_start_num", "pickup_skip_nums", "Take-out Number", "Take-out Name")}
              </TabPane>
              <TabPane tab="Delivery" key="3">
                {renderAliasSection("D", deliveryAliases, setDeliveryAliases, "dlvry_count", "dlvry_start_num", "dlvry_skip_nums", "Delivery Number", "Delivery Name")}
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
                <Form.Item
                  name="send_to_kitchen"
                  valuePropName="checked"
                  label="Send to Kitchen"
                  style={{ marginBottom: "15px", display: "flex", alignItems: "center" }}
                >
                  <Switch
                    onChange={(checked) => {
                      form.setFieldsValue({ send_to_kitchen: checked });
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="track_invty_flag"
                  valuePropName="checked"
                  label="Track Inventory"
                  style={{ marginBottom: "15px", display: "flex", alignItems: "center" }}
                >
                  <Switch
                    onChange={(checked) => {
                      form.setFieldsValue({ track_invty_flag: checked });
                    }}
                  />
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

            {/* Edit Position Modal */}
            <EditPositionModal
              visible={editPositionsModalVisible}
              onCancel={() => setEditPositionsModalVisible(false)}
              ttables={dineInAliases.map((alias, index) => ({
                id: index,
                position: { x: alias.positionX || 0, y: alias.positionY || 0 },
                picture: `${fileBaseUrl}${alias.picture}`,
                tblName: alias.tblName,
                status: "available",
              }))}
              onSave={handleSavePositions}
            />
          </Form>
        )
      )}
    </div>
  );
};

export default Settings;