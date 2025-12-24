import {React} from "react";
import { NavLink} from "react-router-dom";
import "./navbarComponent.css";

const NavLinkComponent = ({ className, to, children }) => (
  <NavLink className={({ isActive }) => `${isActive && "transparent"}` + (className ? ` ${className}` : "")} to={to}>
    {children}
  </NavLink>
);


const NavbarComponent = () => {

  return (
    <header>
    <nav className="navbar">
      <NavLinkComponent className="nav-link" to="/">Accueil</NavLinkComponent>
      <NavLinkComponent className="nav-link" to={`/Task`}>Creer une tache</NavLinkComponent>

      <div
        className="profile-menu"
      >
        <NavLinkComponent className="nav-link" >
          Profil
        </NavLinkComponent>
          <ul className="dropdown">
            <li>
              <NavLink to={`/profile/edit`}>Éditer</NavLink>
            </li>
            <li >
              <NavLink to={"/logout"}>  Déconnecter</NavLink>
              </li>
          </ul>
      </div>
    </nav>
    </header>
  );
};


export default NavbarComponent;
