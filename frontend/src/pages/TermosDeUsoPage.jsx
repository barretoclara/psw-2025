import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import PageHeader from '../components/PageHeader';
import Footer from '../components/Footer';
import './styles/TermosDeUsoPage.css';

const TermosDeUsoPage = () => {
  const navigate = useNavigate();

  return (
    <div className="termos-page-wrapper">
      <PageHeader showBackButton={true} onBackClick={() => navigate(-1)} />
      
      <div className="termos-content-container">
        <Container className="termos-polished-content">
          <h1><i className="bi bi-shield-lock"></i> Política de Privacidade</h1>
          
          <section className="termos-section">
            <p>No Panelinha Digital, valorizamos a privacidade dos nossos usuários e estamos comprometidos em proteger suas informações pessoais...</p>
            
            <h2><i className="bi bi-collection"></i> Dados Coletados</h2>
              <p>As informações que podemos recolher incluem nome, e-mail, número de telefone, endereço, data de nascimento e outros dados pertinentes para os serviços oferecidos.</p>
            </section>

          <section className="termos-section">
            <h2><i className="bi bi-megaphone"></i> Anúncios</h2>
            <p>Assim como muitos outros websites, coletamos e utilizamos informações contidas nos anúncios exibidos no nosso site. Esses dados podem incluir seu endereço IP, provedor de internet (ISP), navegador utilizado, tempo de permanência no site e páginas acessadas.</p>
          </section>

          <section className="termos-section">
            <h2><i className="bi bi-google"></i> Cookie DoubleClick DART</h2>
            <p>O Google, como fornecedor terceirizado, utiliza cookies para exibir anúncios no nosso site. Através do cookie DART, o Google pode apresentar anúncios com base nas visitas anteriores do usuário a outros websites.</p>
          </section>

          <section className="termos-section">
            <h2><i className="bi bi-asterisk"></i> Cookies e Web Beacons</h2>
            <p>Utilizamos cookies para guardar informações que personalizam sua experiência, como suas preferências ao visitar o Panelinha Digital. Isso pode incluir funcionalidades como pop-ups ou acesso a serviços como fóruns.</p>
          </section>

          <section className="termos-section">
            <h2><i className="bi bi-link-45deg"></i> Ligações para Sites de Terceiros</h2>
            <p>O Panelinha Digital pode conter links para sites de terceiros que acreditamos oferecer conteúdos ou ferramentas úteis aos nossos visitantes. No entanto, nossa Política de Privacidade se aplica apenas ao nosso site.</p>
          </section>

          <section className="termos-section">
            <h2><i className="bi bi-pencil-square"></i> Atualizações</h2>
            <p>Ao utilizar o site Panelinha Digital, você concorda com esta Política de Privacidade. Reservamo-nos o direito de alterá-la a qualquer momento, sem aviso prévio. Por isso, recomendamos que consulte esta página regularmente para estar sempre atualizado.</p>
           </section>
        </Container>
      </div>

      <Footer />
    </div>
  );
};

export default TermosDeUsoPage;