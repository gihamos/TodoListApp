import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { apiService } from "../main";
import "./SignUpPage.css"

function SignUp() {
  const navigate = useNavigate();
  const [form, setForm] = useState({fitst_name:"",last_name:"",adresse:"", username: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    apiService.auth
      .signUp(form)
      .then((response) => {
        if (response.error) {
          setError(response.message);
          return;
        }

        navigate("/signin");
      })
      .catch((err) => {
        setError(err.message);
      });
  };

 return (
    <div className="signup-page">
      <div className="signup-container">
        <h1>Inscription</h1>

        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              id="first_name"
              name="first_name"
              value={form.first_name}
              onChange={handleChange}
              required
              className={form.first_name ? "has-value" : ""}
            />
            <label htmlFor="first_name">Prénom</label>
          </div>

          <div className="input-group">
            <input
              type="text"
              id="last_name"
              name="last_name"
              value={form.last_name}
              onChange={handleChange}
              required
              className={form.last_name ? "has-value" : ""}
            />
            <label htmlFor="last_name">Nom</label>
          </div>

          <div className="input-group">
            <input
              type="text"
              id="adresse"
              name="adresse"
              value={form.adresse}
              onChange={handleChange}
              className={form.adresse ? "has-value" : ""}
            />
            <label htmlFor="adresse">Adresse</label>
          </div>

          <div className="input-group">
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className={form.email ? "has-value" : ""}
            />
            <label htmlFor="email">Email</label>
          </div>

          <div className="input-group">
            <input
              type="password"
              id="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className={form.password ? "has-value" : ""}
            />
            <label htmlFor="password">Mot de passe</label>
          </div>

          <button type="submit" className="signup-button">
            Créer un compte
          </button>
        </form>

        <p className="login-text">
          Déjà un compte ? <Link to="/signin">Se connecter</Link>
        </p>
      </div>
    </div>
  );
}
export default SignUp;
