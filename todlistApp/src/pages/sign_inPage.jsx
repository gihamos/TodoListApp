import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { apiService } from "../main";
import "./sign_inPage.css";
function SignIn() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" ,});
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    apiService.auth
      .signIn(form)
      .then((response) => {
        if (response.error) {
          setError(response.message);
          return;
        }

        localStorage.setItem("token", response.data.token);
        apiService.updateAccessToken(response.data.token);

        navigate("/home");
      })
      .catch((err) => {
        console.log(err);
        setError(err.message);
      });
  };
   return (
    <div className="login-page">
      <div className="login-container">
        <h1>Connexion</h1>

        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleSubmit}>
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

          <button type="submit" className="login-button">
            Se connecter
          </button>
        </form>

        <p className="signup-text">
          Pas de compte ? <Link to="/signup">Créer un compte</Link>
        </p>
      </div>
    </div>
  );
}
export default SignIn;
