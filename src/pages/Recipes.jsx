import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [tag, setTag] = useState("");

  useEffect(() => {
    fetch("/data/recipes.json")
      .then(res => res.json())
      .then(data => setRecipes(data));
  }, []);

  const filtered = recipes.filter(r =>
    r.title.toLowerCase().includes(search.toLowerCase()) &&
    (tag ? r.tags.includes(tag) : true)
  );

  return (
    <div className="container">
      <h1 className="section-title">Recetas</h1>

      <input
      className="input"
      placeholder="Buscar..."
      onChange={e => setSearch(e.target.value)}
      />

    <select
    className="select"
    onChange={e => setTag(e.target.value)}
    >
      <option value="">Todos</option>
      <option value="auth">Auth</option>
      <option value="api">API</option>
      <option value="eloquent">Eloquent</option>
    </select>

    {filtered.map(r => (
    <div className="card" key={r.id}>
      <h3>{r.title}</h3>
      <Link to={`/recipes/${r.id}`} className="button">
        Ver receta
      </Link>
    </div>
    ))}
    </div>
  );
}
