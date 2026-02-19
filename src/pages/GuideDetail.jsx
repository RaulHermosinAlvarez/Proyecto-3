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

        {topic.image && (
          <img 
            src={topic.image} 
            alt={topic.title}
            className="detail-image"
          />
        )}

        <h1>{topic.title}</h1>
        <p>{topic.content}</p>

        <button className="button" onClick={toggleFavorite}>
          {isFav ? "Quitar de favoritos" : "Añadir a favoritos"}
        </button>

      </div>
    </div>
  );
}

