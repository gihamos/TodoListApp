import {React,useState} from "react";
import { NavLink,useNavigate } from "react-router-dom";
import "./navbarComponent.css";

const NavLinkComponent = ({ className, to, children }) => (
  <NavLink className={({ isActive }) => `${isActive && "transparent"}` + (className ? ` ${className}` : "")} to={to}>
    {children}
  </NavLink>
);


const NavbarComponent = ({ id_profile }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("Déconnecté");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <NavLinkComponent className="nav-link" to="/">Accueil</NavLinkComponent>

      <div
        className="profile-menu"
      >
        <NavLinkComponent className="nav-link" to={`/profile/${id_profile}`}>
          Profil
        </NavLinkComponent>
          <ul className="dropdown">
            <li>
              <NavLink to={`/profile/${id_profile}/edit`}>Éditer</NavLink>
            </li>
            <li onClick={handleLogout}>Déconnecter</li>
          </ul>
      </div>
    </nav>
  );
};


export default NavbarComponent;
