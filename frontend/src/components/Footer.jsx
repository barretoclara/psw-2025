import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HouseDoor, Heart, BoxSeam, Cart3, Person } from 'react-bootstrap-icons';
import './Footer.css'; // caso queira isolar o CSS

const Footer = () => {
  const navigate = useNavigate();

  return (
    <nav className="nav-footer">
      <button className="nav-item" onClick={() => navigate('/')}>
        <HouseDoor />
        <span>Início</span>
      </button>
      <button className="nav-item" onClick={() => navigate('/favoritos')}>
        <Heart />
        <span>Favoritos</span>
      </button>
      <button className="nav-item" onClick={() => navigate('/estoque')}>
        <BoxSeam />
        <span>Estoque</span>
      </button>
      <button className="nav-item" onClick={() => navigate('/lista-mercado')}>
        <Cart3 />
        <span>Lista de mercado</span>
      </button>
      <button className="nav-item" onClick={() => window.location.href = '/assinatura.html'}>
         <Person />
         <span>Assinatura</span>
      </button>
    </nav>
  );
};

export default Footer;