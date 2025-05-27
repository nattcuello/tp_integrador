// src/components/Navbar.jsx
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <Link className="navbar-brand" to="/">Mi App</Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav me-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/">Inicio</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/Productos">Productos</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/Usuarios">Usuarios</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
