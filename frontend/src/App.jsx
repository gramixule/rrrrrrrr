import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminPage from "./AdminPage";
import EmployeePage from "./EmployeePage";
import LoginForm from "./LoginForm";
import "./App.css"; // Ensure you have the necessary styles

const App = () => {
  const [role, setRole] = useState(null);
  const [rowData, setRowData] = useState([]);
  const [error, setError] = useState('');

  const handleLogin = (message, role) => {
    setRole(role);
    console.log("Logged in as:", role);
    fetchData(); // Fetch data after login
  };

  const fetchData = () => {
  axios.get('http://localhost:5000/api/convert', { withCredentials: true })
    .then(response => {
      console.log("Data fetched:", response.data);
      if (Array.isArray(response.data)) {
        setRowData(response.data);
      } else {
        console.error('Data is not an array:', response.data);
        setRowData([]);
      }
    })
    .catch(error => {
      console.error('There was an error fetching the data!', error);
      setError('There was an error fetching the data!');
    });
};

  return (
    <div>
      <nav className="navbar">
        <h1>ORICE</h1>
        {role && (
          <button
            className="button blue"
            onClick={() => {
              axios.post('http://localhost:5000/api/logout', {}, { withCredentials: true })
                .then(() => {
                  setRole(null);
                  setRowData([]);
                  console.log("Logged out");
                })
                .catch(err => console.error('Logout error:', err));
            }}
          >
            Sign Out
          </button>
        )}
      </nav>
      {role ? (
        role === "admin" ? (
          <AdminPage rowData={rowData} />
        ) : (
          <EmployeePage />
        )
      ) : (
        <LoginForm onLogin={handleLogin} />
      )}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default App;
