import { useEffect, useState } from "react";
import { Search, Heart, HeartFill } from "react-bootstrap-icons";
import { HouseDoor, BoxSeam, Cart3, Person } from "react-bootstrap-icons";
import "./FavoritosPage.css";

export default function FavoritosPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const recipes = [
    {
      id: 1,
      name: "bolo de chocolate premium",
      image: "https://images.unsplash.com/photo-1518779578993-ec3579fee39f",
      title: "Bolo de Chocolate Premium",
      time: "45 min",
      ingredients: "8 ingredientes",
      rating: "⭐ 4.9"
    },
    // Adicione outras receitas aqui
  ];

  const filteredRecipes = recipes.filter(recipe =>
    recipe.name.includes(searchTerm.toLowerCase())
  );

  const removeFavorite = (id) => {
    // Implemente a lógica para remover dos favoritos
    console.log("Remover favorito:", id);
  };

  return (
    <div className="favoritos-page">
      <div className="header">
        <div className="logo">Panelinha Digital</div>
        <div className="search-container">
          {(!isMobile || showSearch) && (
            <input
              type="text"
              className="search-input"
              placeholder="Pesquisar favoritos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          )}
          <Search
            className="search-icon"
            onClick={() => isMobile && setShowSearch(!showSearch)}
          />
        </div>
      </div>

      <div className="page-title">
        <HeartFill />
        Receitas Favoritas
      </div>

      {filteredRecipes.length === 0 ? (
        <div className="empty-state">
          <Heart />
          <h3>
            {searchTerm ? "Nenhuma receita encontrada" : "Nenhuma receita favoritada"}
          </h3>
          <p>
            {searchTerm
              ? "Tente buscar com outros termos"
              : "Salve suas receitas preferidas clicando no coração"}
          </p>
        </div>
      ) : (
        <div className="recipes-container">
          {filteredRecipes.map((recipe) => (
            <div key={recipe.id} className="recipe-card">
              <img src={recipe.image} className="recipe-image" alt={recipe.title} />
              <div className="recipe-info">
                <button
                  className="favorite-btn"
                  onClick={() => removeFavorite(recipe.id)}
                >
                  <HeartFill />
                </button>
                <div className="recipe-title">{recipe.title}</div>
                <div className="recipe-meta">
                  <span>{recipe.time} • {recipe.ingredients}</span>
                  <span>{recipe.rating}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}