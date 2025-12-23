import React, { useState } from "react";
import { apiService } from "../main";
import { useNavigate } from "react-router-dom";
import NavbarComponent from "../components/navBar/navbarComponent";

const CreateTaskForm = () => {
  const [label, setLabel] = useState("");
  const [description, setDescription] = useState("");
  const [expireAt, setExpireAt] = useState("");
  
  const navigate = useNavigate(); 

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTask = { label, description, expireAt };

    apiService.taskList.create(newTask)
      .then((response) => {
        if (!response.error) {
          console.log("Tâche créée avec succès");
          navigate("/home", { replace: true });
        } else {
          console.log("Erreur côté serveur :", response.error);
        }
      })
      .catch((error) => {
        console.log("Erreur lors de la création de la tâche :", error);
      });
  };

  return (
    <>
    <NavbarComponent id_profile={localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).id : null}/>
    <form onSubmit={handleSubmit} style={formStyle}>
      <h2>Créer une tâche</h2>

      <label>
        Titre :
        <input
          type="text"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          required
          style={inputStyle}
        />
      </label>

      <label>
        Description :
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={textareaStyle}
        />
      </label>

      <label>
        Date d’échéance :
        <input
          type="date"
          value={expireAt}
          onChange={(e) => setExpireAt(e.target.value)}
          style={inputStyle}
        />
      </label>

      <button type="submit" style={buttonStyle}>
        Créer
      </button>
    </form>
    </>
  );
};


const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "12px",
  padding: "20px",
  border: "1px solid #ddd",
  borderRadius: "8px",
  maxWidth: "400px",
};

const inputStyle = {
  padding: "8px",
  borderRadius: "4px",
  border: "1px solid #ccc",
  width: "100%",
};

const textareaStyle = {
  padding: "8px",
  borderRadius: "4px",
  border: "1px solid #ccc",
  width: "100%",
  minHeight: "60px",
};

const buttonStyle = {
  padding: "10px 15px",
  borderRadius: "5px",
  border: "none",
  backgroundColor: "#007bff",
  color: "white",
  cursor: "pointer",
};

export default CreateTaskForm;
