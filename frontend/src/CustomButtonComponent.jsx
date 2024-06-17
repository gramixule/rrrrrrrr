// src/CustomTableComponent.jsx
import React from "react";
import CustomButtonComponent from "./CustomButtonComponent";

const CustomTableComponent = ({ data, onDelete, onYes }) => {
  const calculatePricePerSquareMeter = (price, squareMeters) => {
    if (squareMeters === 0) return 0;
    return price / squareMeters;
  };

  return (
    <table className="custom-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Zone</th>
          <th>Price</th>
          <th>Type</th>
          <th>Square Meters</th>
          <th>Price/Sq Meter</th>
          <th>Description</th>
          <th>Proprietor</th>
          <th>Phone Number</th>
          <th>Days Since Posted</th>
          <th>Date and Time Posted</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.ID}>
            <td>{row.ID}</td>
            <td>{row.Zone}</td>
            <td>{row.Price}</td>
            <td>{row.Type}</td>
            <td>{row["Square Meters"]}</td>
            <td>{calculatePricePerSquareMeter(row.Price, row["Square Meters"]).toFixed(2)}</td>
            <td>{row.Description}</td>
            <td>{row.Proprietor}</td>
            <td>{row["Phone Number"]}</td>
            <td>{row["Days Since Posted"]}</td>
            <td>{row["Date and Time Posted"]}</td>
            <td>
              <CustomButtonComponent
                row={row}
                onDelete={onDelete}
                onYes={onYes}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CustomTableComponent;
