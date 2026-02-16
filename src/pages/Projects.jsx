import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  useEffect(() => { fetch("/data/projects.json").then(r=>r.json()).then(d=>setProjects(d)); }, []);

  return (
    <div className="container">
      <h1 className="section-title">Proyectos</h1>
      {projects.map(p=>(
        <div className="card" key={p.id}>
          {p.image && <img src={p.image} alt={p.name} />}
          <h3>{p.name}</h3>
          <p>{p.objective}</p>
          <div>{p.modules.map((m,i)=><span key={i} className="badge">{m}</span>)}</div>
          <p><strong>Stack:</strong> {p.stack}</p>
          <p><strong>Dificultad:</strong> {p.difficulty}</p>
          <Link to={`/projects/${p.id}`} className="button">Ver proyecto</Link>
        </div>
      ))}
    </div>
  );
}

