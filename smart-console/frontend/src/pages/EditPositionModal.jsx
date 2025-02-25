import React, { useState, useEffect, useRef } from "react";
import { Modal, Button, Select } from "antd";
import { CheckOutlined, ArrowLeftOutlined } from "@ant-design/icons"; // Import icons
import styles from "./EditPositionModal.module.css";

const { Option } = Select;

const EditPositionModal = ({ visible, onCancel, ttables, ffloors, onSave }) => {
  // Environment variables for API and file server URLs
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL; // e.g., http://192.168.68.118:8081
  const fileBaseUrl = import.meta.env.VITE_FILE_BASE_URL + "/uploads/tables/"; // e.g., http://192.168.68.118:8080

  // State to store the positions of all tables
  const [tables, setTables] = useState(() => {
    // Create a deep copy of ttables
    return JSON.parse(JSON.stringify(ttables));
  });

  // State to store the positions of all tables
  const [floors, setFloors] = useState(() => {
    // Create a deep copy of ffloors
    return JSON.parse(JSON.stringify(ffloors));
  });

  // State to store the original positions when the modal is opened
  const [originalTables, setOriginalTables] = useState([]);

  // State to track which table is being dragged
  const [draggedTableId, setDraggedTableId] = useState(null);

  // State to track the selected floor
  const [selectedFloor, setSelectedFloor] = useState(floors[0]?.id || null);

  // Reference to the modal container for relative positioning
  const modalRef = useRef(null);

  // Load saved positions from localStorage on component mount
  useEffect(() => {
    const savedTables = JSON.parse(localStorage.getItem("tables"));
    if (savedTables) {
      setTables(savedTables);
      setOriginalTables(savedTables); // Set original positions to saved positions
    } else {
      setOriginalTables(tables); // Set original positions to initial positions
    }
  }, []);

  // Save positions to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("tables", JSON.stringify(tables));
  }, [tables]);

  // Update tables state when ttables prop changes
  useEffect(() => {
    setTables(() => {
      // Create a deep copy of ttables
      return JSON.parse(JSON.stringify(ttables));
    });
  }, [ttables]);

  // Handle mouse down event (start dragging)
  const handleMouseDown = (id) => {
    setDraggedTableId(id);
  };

  // Handle mouse move event (update position while dragging)
  const handleMouseMove = (e) => {
    if (draggedTableId !== null && modalRef.current) {
      const modalRect = modalRef.current.getBoundingClientRect();

      // Calculate the relative position within the modal
      const x = e.clientX - modalRect.left - 50; // Adjust for the center of the image
      const y = e.clientY - modalRect.top - 50; // Adjust for the center of the image

      // Restrict the movement within the modal's bounds
      const maxX = modalRect.width - 100; // Subtract image width
      const maxY = modalRect.height - 100; // Subtract image height

      setTables((prevTables) =>
        prevTables.map((table) =>
          table.id === draggedTableId
            ? {
                ...table,
                position: {
                  x: Math.max(0, Math.min(x, maxX)), // Clamp x between 0 and maxX
                  y: Math.max(0, Math.min(y, maxY)), // Clamp y between 0 and maxY
                },
              }
            : table
        )
      );
    }
  };

  // Handle mouse up event (stop dragging)
  const handleMouseUp = () => {
    setDraggedTableId(null);
  };

  // Handle save button click
  const handleSave = () => {
    localStorage.setItem("tables", JSON.stringify(tables));
    onSave(tables); // Pass the updated tables back to the parent
    onCancel(); // Close the modal
  };

  // Handle cancel button click
  const handleCancel = () => {
    setTables(originalTables); // Revert to original positions
    onCancel(); // Close the modal
  };

  // Toggle table status between "available", "occupied", "reserved", and "billing"
  const toggleTableStatus = (id) => {
    setTables((prevTables) =>
      prevTables.map((table) =>
        table.id === id
          ? {
              ...table,
              status:
                table.status === "available"
                  ? "occupied"
                  : table.status === "occupied"
                  ? "reserved"
                  : table.status === "reserved"
                  ? "billing"
                  : "available",
            }
          : table
      )
    );
  };

  // Define status colors with very light shades
  const statusColors = {
    available: "#f0f0f0", // Very light gray
    occupied: "#c8f7c8", // Slightly darker light green
    reserved: "#ffb3b3", // Slightly darker light red
    billing: "#b3e6ff", // Slightly darker light blue
  };

  // Filter tables based on the selected floor
  const filteredTables = tables.filter((table) => table.floor_id === selectedFloor);

  return (
    <Modal
    title={
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <h2 style={{ margin: 0 }}>Edit Table Positions</h2>
        {floors.map((floor) => (
          <Button
            key={floor.id}
            type="default"
            style={{
              backgroundColor: selectedFloor === floor.id ? "#006400" : "#28a745", // Dark Green when selected
              color: "white",
              borderRadius: "5px",
              padding: "8px 16px",
              fontWeight: "bold",
            }}
            onClick={() => setSelectedFloor(floor.id)}
          >
            {floor.name}
          </Button>
        ))}
      </div>
    }
      visible={visible}
      onCancel={handleCancel}
      className={styles.modalContent}
      footer={[
        <div style={{ textAlign: "right", marginTop: "20px" }}>
          <Button
            type="primary"
            onClick={handleSave}
            icon={<CheckOutlined />} // Add icon
            style={{
              backgroundColor: "#007bff", // blue color for save button
              color: "white",
              borderRadius: "4px",
              height: "40px",
              padding: "0 20px",
              marginRight: "10px",
            }}
          >
            Save Positions
          </Button>
          <Button
            onClick={handleCancel}
            icon={<ArrowLeftOutlined />} // Add icon
            style={{
              backgroundColor: "#f5222d", // Red color for cancel button
              color: "white",
              borderRadius: "4px",
              height: "40px",
              padding: "0 20px",
            }}
          >
            Cancel
          </Button>
        </div>,
      ]}
      width="100%"
      style={{
        top: 0,
        height: "100vh",
        maxWidth: "100vw",
        margin: 0,
        padding: 0,
      }}
      bodyStyle={{
        height: "calc(100vh - 140px)", // Subtract modal header height
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div
        ref={modalRef}
        className="App"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          backgroundColor: "#f0f0f0",
        }}
      >
        {filteredTables.map((table) => (
          <div
            key={table.id}
            style={{
              position: "absolute",
              left: table.position.x,
              top: table.position.y,
              width: "100px", // Set the width to 100px
              height: "100px", // Set the height to 100px
              cursor: draggedTableId === table.id ? "grabbing" : "grab",
            }}
            onMouseDown={() => handleMouseDown(table.id)}
            onClick={() => toggleTableStatus(table.id)} // Toggle status on click
          >
            <img
              src={table.picture} // Use the table's picture URL
              alt="Table"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain", // Maintain aspect ratio
              }}
            />
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                color: "black", // Black text
                fontSize: "20px", // Increased font size
                fontWeight: "bold",
                backgroundColor: statusColors[table.status], // Use statusColors for background
                padding: "5px 10px", // Padding for better visibility
                borderRadius: "5px", // Rounded corners
                textAlign: "center",
              }}
            >
              {table.tblName}
            </div>
          </div>
        ))}
      </div>
    </Modal>
  );
};

export default EditPositionModal;