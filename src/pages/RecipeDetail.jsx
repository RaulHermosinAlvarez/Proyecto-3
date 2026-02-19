import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    fetch("/data/recipes.json")
      .then(res => res.json())
      .then(data => {
        const found = data.find(r => r.id === parseInt(id));
        setRecipe(found);

        const stored = JSON.parse(localStorage.getItem("favorites")) || { topics: [], recipes: [] };
        setIsFav(stored.recipes.some(r => r.id === parseInt(id)));
      });
  }, [id]);

  if (!recipe) return <p>Cargando...</p>;

  const toggleFavorite = () => {
    const stored = JSON.parse(localStorage.getItem("favorites")) || { topics: [], recipes: [] };

    let newRecipes;
    if (isFav) {
      newRecipes = stored.recipes.filter(r => r.id !== recipe.id);
    } else {
      newRecipes = [...stored.recipes, recipe];
    }

    const newFavs = { ...stored, recipes: newRecipes };
    localStorage.setItem("favorites", JSON.stringify(newFavs));
    setIsFav(!isFav);
  };

  return (
    <div className="container">
      <div className="card">

        {recipe.image && (
          <img 
            src={recipe.image}
            alt={recipe.title}
            className="detail-image"
          />
        )}

        <h1>{recipe.title}</h1>

        <pre>
          <code>{recipe.code}</code>
        </pre>

        <p>{recipe.steps}</p>

        <button className="button" onClick={toggleFavorite}>
          {isFav ? "Quitar de favoritos" : "Añadir a favoritos"}
        </button>

      </div>
    </div>
  );
}

