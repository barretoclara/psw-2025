import { ArrowLeft } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import './PageHeader.css';

export default function PageHeader({ title = "Panelinha Digital", showBackButton = true }) {
  const navigate = useNavigate();

  return (
    <header className="page-header">
      {showBackButton && (
        <button className="back-button" onClick={() => navigate(-1)}>
          <ArrowLeft className="back-icon" size={24} />
        </button>
      )}
      <div className="logo-container">
        <span className="logo-text">{title}</span>
        <img 
          src="/Panelinha digital - Logo.png" 
          alt="Logo Panelinha Digital" 
          className="logo-image" 
        />
      </div>
    </header>
  );
}