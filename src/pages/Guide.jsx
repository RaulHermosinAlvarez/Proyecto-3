import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Guide() {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    fetch("/data/guide.json")
      .then(res => res.json())
      .then(data => setTopics(data));
  }, []);

  return (
    <div className="container">
  <h1 className="section-title">Guía Laravel</h1>

  {topics.map(topic => (
    <div className="card" key={topic.slug}>
      <h3>{topic.title}</h3>
      <Link to={`/guide/${topic.slug}`} className="button">
        Ver detalle
      </Link>
    </div>
  ))}
</div>
  );
}
