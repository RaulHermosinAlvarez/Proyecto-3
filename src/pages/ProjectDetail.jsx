import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    fetch("/data/projects.json")
      .then(res => res.json())
      .then(data => {
        const found = data.find(p => p.id === parseInt(id));
        setProject(found);
      });
  }, [id]);

  if (!project) return <p>Cargando...</p>;

  return (
    <div className="container">
  <div className="card">
    <h1>{project.name}</h1>

    <p><strong>Objetivo:</strong> {project.objective}</p>

    <div>
      {project.modules.map((mod, index) => (
        <span key={index} className="badge">{mod}</span>
      ))}
    </div>

    <p><strong>Stack:</strong> {project.stack}</p>
    <p><strong>Dificultad:</strong> {project.difficulty}</p>
  </div>
</div>
  );
}
