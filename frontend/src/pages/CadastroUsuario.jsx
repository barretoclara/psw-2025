import React, { useState } from 'react';
import './styles/CadastroUsuario.css';
import { Container } from 'react-bootstrap';

const CadastroUsuario = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [erroSenha, setErroSenha] = useState(false);

  const formatarTelefone = (valor) => {
    let v = valor.replace(/\D/g, '');
    if (v.length > 2) v = `(${v.substring(0, 2)}) ${v.substring(2)}`;
    if (v.length > 10) v = `${v.substring(0, 10)}-${v.substring(10, 14)}`;
    return v;
  };

  const handleTelefoneChange = (e) => {
    setTelefone(formatarTelefone(e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (senha !== confirmarSenha) {
      setErroSenha(true);
      return;
    }
    setErroSenha(false);
    alert('Cadastro feito com sucesso!');
  };

  return (
    <Container fluid className="d-flex justify-content-center align-items-center min-vh-100 p-0 m-0 bg-light-purple">
      <Container className="py-5" style={{ maxWidth: '400px' }}>
        <div className="login-wrapper">
          <div className="logo">Panelinha Digital</div>

          <div className="login-container">
            <h1>Cadastro</h1>

            <form onSubmit={handleSubmit}>
              <div className="input-field">
                <label>Nome completo</label>
                <input
                  type="text"
                  placeholder="Digite seu nome completo"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  required
                  className="form-control"
                />
              </div>

              <div className="input-field">
                <label>E-mail</label>
                <input
                  type="email"
                  placeholder="Digite seu e-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="form-control"
                />
              </div>

              <div className="input-field">
                <label>Telefone</label>
                <input
                  type="text"
                  placeholder="(xx) xxxx-xxxx"
                  value={telefone}
                  onChange={handleTelefoneChange}
                  maxLength={15}
                  className="form-control"
                />
              </div>

              <div className="input-field">
                <label>Senha</label>
                <input
                  type="password"
                  placeholder="Digite a senha"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  required
                  className="form-control"
                />
              </div>

              <div className="input-field">
                <label>Confirme a senha</label>
                <input
                  type="password"
                  placeholder="Confirme a senha"
                  value={confirmarSenha}
                  onChange={(e) => setConfirmarSenha(e.target.value)}
                  required
                  className="form-control"
                />
              </div>

              {erroSenha && (
                <div className="text-danger mb-3 text-center">
                  As senhas não são iguais!
                </div>
              )}

              <button type="submit" className="login-btn w-100">
                Salvar cadastro
              </button>
            </form>
          </div>
        </div>
      </Container>
    </Container>
  );
};

export default CadastroUsuario;