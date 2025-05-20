import { useState, useEffect } from "react";
import { Heart, HeartFill, Search } from "react-bootstrap-icons";
import "./FavoritosPage.css";

export default function FavoritosPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [showSearch, setShowSearch] = useState(false);
  const [recipes, setRecipes] = useState([]); // Lista vazia inicialmente

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

      {recipes.length === 0 ? (
        <div className="empty-state">
          <Heart size={48} />
          <h3>Nenhuma receita favoritada</h3>
          <p>Adicione receitas aos favoritos para vê-las aqui</p>
        </div>
      ) : (
        <div className="recipes-container">
          {recipes.map((recipe) => (
            <div key={recipe.id} className="recipe-card">
              <div className="recipe-info">
                <button
                  className="favorite-btn"
                  onClick={() => setRecipes(recipes.filter(r => r.id !== recipe.id))}
                >
                  <HeartFill />
                </button>
                <div className="recipe-title">{recipe.title}</div>
                <div className="recipe-meta">
                  <span>{recipe.time} • {recipe.ingredients}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}