import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function GuideDetail() {
  const { slug } = useParams();
  const [topic, setTopic] = useState(null);
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    fetch("/data/guide.json")
      .then(res => res.json())
      .then(data => {
        const found = data.find(t => t.slug === slug);
        setTopic(found);

        // Comprobar si ya está en favoritos
        const stored = JSON.parse(localStorage.getItem("favorites")) || { topics: [], recipes: [] };
        setIsFav(stored.topics.some(t => t.slug === slug));
      });
  }, [slug]);

  if (!topic) return <p>Cargando...</p>;

  const toggleFavorite = () => {
    const stored = JSON.parse(localStorage.getItem("favorites")) || { topics: [], recipes: [] };
    let newTopics;
    if (isFav) {
      newTopics = stored.topics.filter(t => t.slug !== slug);
    } else {
      newTopics = [...stored.topics, topic];
    }
    const newFavs = { ...stored, topics: newTopics };
    localStorage.setItem("favorites", JSON.stringify(newFavs));
    setIsFav(!isFav);
  };

  return (
    <div className="container">
      <div className="card">
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <img
            src={`/images/icons/${topic.slug}.png`}
            alt={topic.title}
            style={{ width: 40, height: 40 }}
          />
          <h1>{topic.title}</h1>
        </div>

        <p>{topic.content}</p>

        <button className="button" onClick={toggleFavorite}>
          {isFav ? "Quitar de favoritos" : "Añadir a favoritos"}
        </button>
      </div>
    </div>
  );
}

