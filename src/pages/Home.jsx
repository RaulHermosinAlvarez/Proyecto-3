import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="container">
      <img src="/images/banner.jpg" alt="Laravel Banner" style={{ width: "100%", borderRadius: "12px", marginBottom: "20px" }} />

      <h1 className="section-title">Laravel Web Educativa</h1>
      <div className="card">
        <p>Laravel es un framework PHP moderno basado en MVC para desarrollar aplicaciones rápidas y seguras.</p>

        <Link to="/guide" className="button">Explorar Guía</Link>
        <Link to="/recipes" className="button">Ver Recetas</Link>
        <Link to="/projects" className="button">Proyectos</Link>
      </div>
    </div>
  );
}

