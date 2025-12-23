// Modal.jsx
import React, { useState } from "react";

const AlertComponent = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) return null;

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        {children}
        <button style={buttonStyle} onClick={() => setIsOpen(false)}>
          Fermer
        </button>
      </div>
    </div>
  );
};

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const modalStyle = {
  backgroundColor: "white",
  padding: "20px 30px",
  borderRadius: "8px",
  minWidth: "300px",
  maxWidth: "90%",
  textAlign: "center",
  boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
};

const buttonStyle = {
  marginTop: "15px",
  padding: "8px 16px",
  border: "none",
  borderRadius: "5px",
  backgroundColor: "#007bff",
  color: "white",
  cursor: "pointer",
};

export default AlertComponent;
