import React, { useState, useEffect } from 'react';
import './LoginForm.css';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../storeConfig/slices/usuarioSlice';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoggedIn = useSelector(state => state.usuario.isLoggedIn);

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login({ email, senha }));
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className="login-wrapper">
      <div className="logo">Panelinha Digital</div>

      <div className="login-container">
        <h1>Junte-se ao clube!</h1>
        <p className="subtitle">
          Teste receitas, faça anotações, contribua e divirta-se!<br />
          E é <span className="highlight">gratuito</span>!
        </p>

        <button className="social-btn">
          <i className="bi bi-google"></i> Continuar com Google
        </button>

        <button className="social-btn">
          <i className="bi bi-facebook"></i> Continuar com Facebook
        </button>

        <div className="divider">ou</div>

        <form onSubmit={handleLogin}>
          <div className="input-field">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-field">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              placeholder="Digite sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>

          <a href="#" className="forgot-password">Esqueceu sua senha?</a>

          <button type="submit" className="login-btn">Entrar</button>

          
          <button
            type="button"
            className="secondary-btn"
            onClick={() => navigate('/cadastro')}
          >
            Cadastre-se
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
