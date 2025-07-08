import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addReceita, updateReceita } from '../../storeConfig/slices/receitasSlice';
import { useUserData } from '../../hooks/useUserData';
import './ReceitaForm.css';


function ReceitaForm() {
  const dispatch = useDispatch();
  const { userId } = useUserData();
  const { id: routeId } = useParams();
  const categorias = useSelector(state => state.categorias.entities);
  const receitas = useSelector(state => state.receitas.entities);

  const id = routeId || localStorage.getItem('receitaEditandoId');
  const receitaExistente = receitas?.[id];

  const [nome, setNome] = useState('');
  const [categoriaId, setCategoriaId] = useState('');
  const [tempo_preparo, setTempo_preparo] = useState('');
  const [ingredientes, setIngredientes] = useState([]);
  const [modo_preparo, setModo_preparo] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
  const dadosParciais = JSON.parse(localStorage.getItem('dadosReceitaParcial')) || {};
  const ingredientesSalvos = JSON.parse(localStorage.getItem('ingredientesSelecionados')) || [];

  if (id && receitaExistente) {
    setNome(dadosParciais.nome || receitaExistente.nome || '');
    setCategoriaId(dadosParciais.categoriaId || receitaExistente.categoriaId?.toString() || '');
    setTempo_preparo(dadosParciais.tempo_preparo || receitaExistente.tempo_preparo?.toString() || '');
    setModo_preparo(dadosParciais.modo_preparo || receitaExistente.modo_preparo || '');
    setIngredientes(ingredientesSalvos.length > 0 ? ingredientesSalvos : receitaExistente.ingredientes || []);
  } else {
    setNome(dadosParciais.nome || '');
    setCategoriaId(dadosParciais.categoriaId || '');
    setTempo_preparo(dadosParciais.tempo_preparo || '');
    setModo_preparo(dadosParciais.modo_preparo || '');
    setIngredientes(ingredientesSalvos);
  }
}, [id, receitaExistente]);

  const adicionarIngrediente = () => {
    localStorage.setItem('dadosReceitaParcial', JSON.stringify({
      nome,
      categoriaId,
      tempo_preparo,
      modo_preparo
    }));
    if (id) {
      localStorage.setItem('receitaEditandoId', id);
    }
    navigate('/selecionar-ingredientes');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nome || !categoriaId || !tempo_preparo || ingredientes.length === 0) {
      alert('Preencha todos os campos obrigatórios!');
      return;
    }

    const receitaData = {
      nome,
      tempo_preparo: Number(tempo_preparo),
      categoriaId,
      ingredientes: ingredientes.map(ing => ({
        nome: ing.nome,
        quantidade: Number(ing.quantidade),
        unidade: ing.unidade
      })),
      modo_preparo
    };

    try {
      if (id) {
        await dispatch(updateReceita({ id, ...receitaData })).unwrap();
      } else {
        await dispatch(addReceita(receitaData)).unwrap();
      }

      localStorage.removeItem('dadosReceitaParcial');
      localStorage.removeItem('ingredientesSelecionados');
      localStorage.removeItem('receitaEditandoId');

      navigate('/');
    } catch (error) {
      console.error('Erro ao salvar receita:', error);
      alert('Erro ao salvar receita');
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <h1 className="logo">Nova Receita</h1>
        <h2>{id ? 'Editar Receita' : 'Cadastrar Receita'}</h2>

        <form onSubmit={handleSubmit}>
          <div className="input-field">
            <label>Nome da Receita:</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Digite o nome da receita"
              required
            />
          </div>

          <div className="input-field">
            <label>Categoria:</label>
            <select
              value={categoriaId}
              onChange={(e) => setCategoriaId(e.target.value)}
              required
            >
              <option value="">Selecione a categoria</option>
              {categorias && Object.values(categorias).map(cat => (
                <option key={cat.id || cat._id} value={cat.id || cat._id}>{cat.nome}</option>
              ))}
            </select>
          </div>

          <div className="input-field">
            <label>Tempo de preparo (min):</label>
            <input
              type="number"
              value={tempo_preparo}
              onChange={(e) => setTempo_preparo(e.target.value)}
              placeholder="Ex: 30"
              required
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
                <li key={i}>{ing.nome} - {ing.quantidade} {ing.unidade}</li>
              ))}
            </ul>
          </div>

          <div className="input-field">
            <label>Modo de preparo:</label>
            <textarea
              value={modo_preparo}
              onChange={(e) => setModo_preparo(e.target.value)}
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
              required
            />
          </div>

          <button type="submit" className="login-btn">
            {id ? 'Salvar Alterações' : 'Cadastrar Receita'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ReceitaForm;