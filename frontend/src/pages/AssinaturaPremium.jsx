import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './styles/AssinaturaPremium.css'; 
import Footer from "../components/Footer";
import PageHeader from "../components/PageHeader";

export default function AssinaturaPremium() {
  return (
    <div className="favoritos-page">
      <PageHeader />
      
      {/* Conteúdo principal */}
      <div className="card-premium">
        <i className="bi bi-stars beneficio-icon"></i>
        <h2>Assinatura Premium</h2>
        <p className="lead">Acesso completo a todos os recursos exclusivos</p>

        <div className="preco">
          <strong>R$ 2,90/mês</strong><br />
          <small>7 dias grátis • Cancele quando quiser</small>
        </div>

        <Link to="/termos-de-uso">
          <button className="btn-premium">Experimente Grátis</button>
        </Link>

        <p className="text-muted">Cobrança mensal apenas após o teste gratuito.</p>
      </div>

      {/* Benefícios */}
      <div className="beneficios-container">
        <div className="beneficio-card">
          <i className="bi bi-megaphone beneficio-icon" style={{ transform: 'rotate(-15deg)' }}></i>
          <h5>Sem Anúncios</h5>
          <p>Navegação sem interrupções em todo o app</p>
        </div>
        <div className="beneficio-card">
          <i className="bi bi-unlock beneficio-icon"></i>
          <h5>Funcionalidades Exclusivas</h5>
          <p>Acesso a todos os recursos premium</p>
        </div>
      </div>

      {/* Termos */}
      <div className="termos">
        <p>
          Ao assinar, você concorda com nossos <Link to="/termos-de-uso">Termos de Uso e Política de Privacidade</Link>
        </p>
      </div>

      <Footer />
    </div>
  );
}