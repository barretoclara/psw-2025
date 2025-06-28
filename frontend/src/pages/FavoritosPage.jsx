import { useState, useEffect } from "react";
import { 
  HeartFill, 
  Search, 
  ArrowLeft,
  Heart
} from "react-bootstrap-icons";
import './styles/FavoritosPage.css';
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

export default function FavoritosPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [showSearch, setShowSearch] = useState(false);
  const [recipes] = useState([]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="favoritos-page">

      <div className="header">
        <div className="logo-container">
          <ArrowLeft 
            className="back-arrow"
            onClick={() => navigate(-1)}
          />
          <div className="logo">Panelinha Digital</div>
        </div>
        <div className="search-container">
          {(!isMobile || showSearch) && (
            <input
              type="text"
              className={`search-input ${isMobile && showSearch ? 'visible' : ''}`}
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
        <HeartFill className="title-icon" />
        Receitas Favoritas
      </div>

      <div className="empty-state">
        <Heart className="empty-icon" size={48} />
        <h3>Nenhuma receita favoritada</h3>
        <p>Adicione receitas aos favoritos para vê-las aqui</p>
      </div>

      <Footer />
    </div>
  );
}