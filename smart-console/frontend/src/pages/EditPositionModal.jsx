import React, { useState } from "react";
import { Modal, Table, Select } from "antd";
import "./EditPositionModal.css";

const { Option } = Select;

const EditPositionModal = ({ visible, onCancel, tables, setTables, tablePictures }) => {
  const [draggedTableId, setDraggedTableId] = useState(null);

  const handleMouseDown = (id) => {
    setDraggedTableId(id);
  };

  const handleMouseMove = (e) => {
    if (draggedTableId !== null) {
      const draggableArea = e.currentTarget.getBoundingClientRect();
      const offsetX = e.clientX - draggableArea.left - 50; // Adjust for the center of the image
      const offsetY = e.clientY - draggableArea.top - 50; // Adjust for the center of the image

      console.log(`Dragging table ${draggedTableId} to (${offsetX}, ${offsetY})`);

      setTables((prevTables) =>
        prevTables.map((table) =>
          table.id === draggedTableId
            ? {
                ...table,
                position: {
                  x: offsetX,
                  y: offsetY,
                },
              }
            : table
        )
      );
    }
  };

  const handleMouseUp = () => {
    setDraggedTableId(null);
  };

  const handlePictureChange = (index, value) => {
    const newTables = [...tables];
    newTables[index].picture = value;
    setTables(newTables);
  };

  return (
    <Modal
      title="Edit Table Positions"
      visible={visible}
      onCancel={onCancel}
      footer={null}
      width={800}
    >
      <div
        className="draggable-area"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        {tables.map((table) => {
          const picture = tablePictures.find((pic) => pic.filename === table.picture);
          return (
            <img
              key={table.id}
              src={picture ? picture.url : "http://localhost:8080/uploads/tables/round8.jpg"}
              alt="Table"
              style={{
                position: "absolute",
                left: table.position.x,
                top: table.position.y,
                width: "100px",
                height: "100px",
                objectFit: "cover",
                cursor: draggedTableId === table.id ? "grabbing" : "grab",
              }}
              onMouseDown={() => handleMouseDown(table.id)}
            />
          );
        })}
      </div>
      <Table
        dataSource={tables}
        columns={[
          {
            title: "Table Name",
            dataIndex: "tblName",
            key: "tblName",
          },
          {
            title: "Picture",
            dataIndex: "picture",
            key: "picture",
            render: (text, record, index) => (
              <Select
                value={text}
                onChange={(value) => handlePictureChange(index, value)}
                style={{ width: "180px" }}
              >
                {tablePictures.map((picture) => (
                  <Option key={picture.filename} value={picture.filename}>
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
        ]}
        rowKey="id"
        pagination={false}
      />
    </Modal>
  );
};

export default EditPositionModal;