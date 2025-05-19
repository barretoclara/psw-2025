import React, { useState } from 'react';
import './CadastroUsuario.css'; // você pode criar um CSS parecido com o do login

const CadastroUsuario = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [erroSenha, setErroSenha] = useState(false);

  // Função para formatar telefone (igual ao JS do seu exemplo)
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
    // Aqui você integraria a lógica de cadastro (ex: chamar API)
    alert('Cadastro feito com sucesso!');
    // Depois de cadastrar, pode redirecionar para login ou home
  };

  return (
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
            />
          </div>

          {erroSenha && (
            <div style={{ color: 'red', marginBottom: '10px', textAlign: 'center' }}>
              As senhas não são iguais!
            </div>
          )}

          <button type="submit" className="login-btn">
            Salvar cadastro
          </button>
        </form>
      </div>
    </div>
  );
};

export default CadastroUsuario;
