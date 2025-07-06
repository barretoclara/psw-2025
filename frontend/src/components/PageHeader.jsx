import { ArrowLeft } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import './PageHeader.css';

export default function PageHeader() {
  const navigate = useNavigate();

  return (
    <header className="page-header">
      <button className="back-button" onClick={() => navigate(-1)}>
        <ArrowLeft className="back-icon" size={24} />
      </button>
      <div className="logo-container">
        <span className="logo-text">Panelinha Digital</span>
        {/* Imagem direto da pasta public */}
        <img 
          src="/Panelinha digital - Logo.png" 
          alt="Logo Panelinha Digital" 
          className="logo-image" 
        />
      </div>
    </header>
  );
}