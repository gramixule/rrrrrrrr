// src/index.js
import React from "react";
import ReactDOM from "react-dom/client"; // Import createRoot
import App from "./App";
import "./index.css"; // Ensure you have the necessary styles

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement); // Use createRoot
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
