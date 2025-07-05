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
      <div className="logo">Panelinha Digital</div>
    </header>
  );
}