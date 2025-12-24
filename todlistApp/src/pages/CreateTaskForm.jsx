import React, { useState } from "react";
import { apiService } from "../main";
import { useNavigate } from "react-router-dom";
import NavbarComponent from "../components/navBar/navbarComponent";
import "./CreateTaskForm.css"

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
      <NavbarComponent
        id_profile={
          localStorage.getItem("user")
            ? JSON.parse(localStorage.getItem("user")).id
            : null
        }
      />

      <div className="task-page">
        <form onSubmit={handleSubmit} className="task-form">
          <h2>Créer une tâche</h2>

          <label>
            Titre
            <input
              type="text"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              required
            />
          </label>

          <label>
            Description
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>

          <label>
            Date d’échéance
            <input
              type="date"
              value={expireAt}
              onChange={(e) => setExpireAt(e.target.value)}
            />
          </label>

          <button type="submit">Créer</button>
        </form>
      </div>
    </>
  );
};

export default CreateTaskForm;