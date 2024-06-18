import React from "react";
import CustomButtonComponent from "./CustomButtonComponent";
import "./CustomTableComponent.css";

const CustomTableComponent = ({ data, onDelete, onYes, onSendToEmployee }) => {
  return (
    <table className="custom-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Zone</th>
          <th>Price</th>
          <th>Type</th>
          <th>Square Meters</th>
          <th>Description</th>
          <th>Proprietor</th>
          <th>Phone Number</th>
          <th>Days Since Posted</th>
          <th>Date and Time Posted</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={row.ID} className={index % 2 === 0 ? "even-row" : "odd-row"}>
            <td>{row.ID}</td>
            <td>{row.Zone}</td>
            <td>{row.Price}</td>
            <td>{row.Type}</td>
            <td>{row["Square Meters"]}</td>
            <td>{row.Description}</td>
            <td>{row.Proprietor}</td>
            <td>{row["Phone Number"]}</td>
            <td>{row["Days Since Posted"]}</td>
            <td>{row["Date and Time Posted"]}</td>
            <td>
              <CustomButtonComponent row={row} onDelete={onDelete} onYes={onYes} onSendToEmployee={onSendToEmployee} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CustomTableComponent;
