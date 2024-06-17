// src/App.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import CustomTableComponent from "./CustomTableComponent";
import DetailsSection from "./DetailsSection";
import Modal from "./Modal";
import "./App.css"; // Ensure you have the necessary styles

const App = () => {
  const [rowData, setRowData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get('http://localhost:5000/api/convert')
      .then(response => {
        if (Array.isArray(response.data)) {
          setRowData(response.data);
        } else {
          console.error('Data is not an array:', response.data);
          setRowData([]);
        }
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  };

  const handlePostRequest = () => {
    axios.post('http://localhost:5000/api/data', { data: 'trigger' })
      .then(response => {
        if (response.data.alert) {
          alert(response.data.alert);
        }
      })
      .catch(error => {
        console.error('There was an error with the POST request!', error);
      });
  };

  const handleDelete = (id) => {
    axios.post('http://localhost:5000/api/delete', { id })
      .then(response => {
        if (response.data.status === 'success') {
          fetchData(); // Refresh the data
        } else {
          console.error('Error deleting row:', response.data.error);
        }
      })
      .catch(error => {
        console.error('There was an error deleting the row!', error);
      });
  };

  const handleYes = (row) => {
    setSelectedRow(row);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <nav className="navbar">
        <h1>ORICE</h1>
        <button onClick={handlePostRequest} className="button">Send POST Request</button>
      </nav>
      <CustomTableComponent data={rowData} onDelete={handleDelete} onYes={handleYes} />
      <Modal show={showModal} onClose={handleCloseModal}>
        {selectedRow && <DetailsSection row={selectedRow} />}
      </Modal>
    </div>
  );
};

export default App;
