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
import PageHeader from "../components/PageHeader";

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
      <PageHeader />

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