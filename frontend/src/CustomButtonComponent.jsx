// src/CustomButtonComponent.jsx
import React from "react";

const CustomButtonComponent = ({ row, onDelete, onYes, onSendToEmployee }) => {
  const handleYesClick = () => {
    onYes(row);
  };

  const handleDeleteClick = () => {
    onDelete(row.ID);
  };

  const handleSendToEmployeeClick = () => {
    onSendToEmployee(row);
  };

  return (
    <div>
      <button className="btn-yes" onClick={handleYesClick}>Yes</button>
      <button className="btn-no" onClick={handleDeleteClick}>Delete</button>
      <button className="btn-send" onClick={handleSendToEmployeeClick}>Send to Employee</button>
    </div>
  );
};

export default CustomButtonComponent;
