import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ReceitaForm.css';

function ReceitaForm() {
  const [nome, setNome] = useState('');
  const [categoria, setCategoria] = useState('');
  const [tempo, setTempo] = useState('');
  const [ingredientes, setIngredientes] = useState([]);
  const [novoIngrediente, setNovoIngrediente] = useState('');
  const [modoPreparo, setModoPreparo] = useState('');
  const navigate = useNavigate();

  const adicionarIngrediente = () => {
    navigate('/selecionar-ingredientes');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const novaReceita = { nome, categoria, tempo, ingredientes, modoPreparo };
    console.log('Receita cadastrada:', novaReceita);
    // Aqui você pode adicionar lógica de envio para o backend
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <h1 className="logo">Nova Receita</h1>
        <h2>Cadastrar Receita</h2>

        <form onSubmit={handleSubmit}>
          <div className="input-field">
            <label>Nome da Receita:</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Digite o nome da receita"
            />
          </div>

          <div className="input-field">
            <label>Categoria:</label>
            <select
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
            >
              <option value="">Selecione a categoria</option>
              <option value="Café da manhã">Café da manhã</option>
              <option value="Almoço">Almoço</option>
              <option value="Jantar">Jantar</option>
              <option value="Sobremesa">Sobremesa</option>
            </select>
          </div>

          <div className="input-field">
            <label>Tempo de preparo (min):</label>
            <input
              type="number"
              value={tempo}
              onChange={(e) => setTempo(e.target.value)}
              placeholder="Ex: 30"
            />
          </div>

          <div className="input-field">
            <label>Ingredientes:</label>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                type="button"
                className="secondary-btn"
                onClick={adicionarIngrediente}
              >
                Adicionar
              </button>
            </div>
            <ul style={{ textAlign: 'left', marginTop: '10px' }}>
              {ingredientes.map((ing, i) => (
                <li key={i}>{ing}</li>
              ))}
            </ul>
          </div>

          <div className="input-field">
            <label>Modo de preparo:</label>
            <textarea
              value={modoPreparo}
              onChange={(e) => setModoPreparo(e.target.value)}
              placeholder="Descreva o modo de preparo"
              rows="4"
              style={{
                width: '90%',
                padding: '12px 15px',
                borderRadius: '8px',
                backgroundColor: '#faf0fb',
                border: '1px solid #e0e0e0',
                resize: 'none'
              }}
            />
          </div>

          <button type="submit" className="login-btn">Cadastrar Receita</button>
        </form>
      </div>
    </div>
  );
}

export default ReceitaForm;
