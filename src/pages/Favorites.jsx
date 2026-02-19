import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Favorites() {
  const [favorites, setFavorites] = useState({ topics: [], recipes: [] });

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favorites")) || {
      topics: [],
      recipes: []
    };
    setFavorites(stored);
  }, []);

  return (
    <div className="container">
      <h1 className="section-title">Favoritos</h1>

      <h2>Temas favoritos</h2>
      {favorites.topics.length === 0 && <p>No hay temas favoritos</p>}
      {favorites.topics.map(topic => (
        <div className="card" key={topic.slug}>
          <img 
            src={topic.image} 
            alt={topic.title}
            className="detail-image"
            style={{width: "10%"}}
          />
          <h3>{topic.title}</h3>
          <Link to={`/guide/${topic.slug}`} className="button">
            Ver tema
          </Link>
        </div>
      ))}

      <h2>Recetas favoritas</h2>
      {favorites.recipes.length === 0 && <p>No hay recetas favoritas</p>}
      {favorites.recipes.map(recipe => (
        <div className="card" key={recipe.id}>
          <h3>{recipe.title}</h3>
          <img src={recipe.image} alt={recipe.title} style={{width: "5%"}}/>
          <Link to={`/recipes/${recipe.id}`} className="button">
            Ver receta  
          </Link>
        </div>
      ))}
    </div>
  );
}
