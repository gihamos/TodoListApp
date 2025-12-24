import React, { useState, useEffect } from "react";
import { apiService } from "../main";
import { useNavigate } from "react-router-dom";

function EditProfile() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    adresse: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");


  useEffect(() => {

    apiService.user.getUser().then((response)=>{
      if(!response.error){
          setForm({
              first_name: response.data.first_name || "",
               last_name: response.data.last_name || "",
               adresse: response.data.adress || "",
                email: response.data.email || "",
                 password: "",
              });
            }
         } )
         .catch((error)=>{
           console.log(error)


         })},[]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

   
    const payload = { ...form };
    if (!payload.password) delete payload.password;

    apiService.user
      .updateUser(payload)
      .then((response) => {
        if (response.error) {
          setError(response.message);
          return;
        }
        setSuccess("Profil mis à jour avec succès");
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      })
      .catch((err) => setError(err.message));
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <h1>Modifier le profil</h1>

        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              name="first_name"
              min={3}
              value={form.first_name}
              onChange={handleChange}
              required
              className={form.first_name ? "has-value" : ""}
            />
            <label>Prénom</label>
          </div>

          <div className="input-group">
            <input
              type="text"
              name="last_name"
              min={3}
              value={form.last_name}
              onChange={handleChange}
              required
              className={form.last_name ? "has-value" : ""}
            />
            <label>Nom</label>
          </div>

          <div className="input-group">
            <input
              type="text"
              name="adresse"
              min={7}
              value={form.adresse}
              onChange={handleChange}
              className={form.adresse ? "has-value" : ""}
            />
            <label>Adresse</label>
          </div>

          <div className="input-group">
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className={form.email ? "has-value" : ""}
            />
            <label>Email</label>
          </div>

          <div className="input-group">
            <input
              type="password"
              name="password"
              min={6}
              value={form.password}
              onChange={handleChange}
              className={form.password ? "has-value" : ""}
            />
            <label>Nouveau mot de passe (optionnel)</label>
          </div>

          <div style={{ display: "flex", gap: "10px" }}>
            <button type="submit" className="signup-button">
              Enregistrer
            </button>

            <button
              type="button"
              className="signup-button"
              style={{ background: "#666" }}
              onClick={()=>  navigate("/home", { replace: true })}
            >
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;
