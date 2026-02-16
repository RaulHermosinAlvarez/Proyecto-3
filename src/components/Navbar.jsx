import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/">Inicio</Link>
      <Link to="/guide">Guía</Link>
      <Link to="/recipes">Recetas</Link>
      <Link to="/projects">Proyectos</Link>
      <Link to="/favorites">Favoritos</Link>
    </nav>
  );
}

