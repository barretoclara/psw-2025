import { Link, useLocation } from "react-router-dom";
import { HouseDoor, Heart, BoxSeam, Cart3, Person } from "react-bootstrap-icons";
import './Footer.css';

export default function Footer() {
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path) => currentPath === path;

  return (
    <nav className="nav-footer">
      <Link to="" className={`nav-item ${isActive("") ? "active" : ""}`}>
        <HouseDoor />
        Início
      </Link>
      <Link to="#" className="nav-item">
        <Heart />
        Favoritos
      </Link>
      <Link to="/estoque" className="nav-item">
        <BoxSeam />
        Estoque
      </Link>
      <Link to="/lista-mercado" className="nav-item">
        <Cart3 />
        Lista de mercado
      </Link>
      <Link to="/assinatura" className={`nav-item ${isActive("/assinatura") ? "active" : ""}`}>
        <Person />
        Assinatura
      </Link>
    </nav>
  );
}