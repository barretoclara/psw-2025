import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addReceita, updateReceita } from '../../storeConfig/slices/receitasSlice';
import { useUserData } from '../../hooks/useUserData';
import './ReceitaForm.css';

function ReceitaForm() {
  const dispatch = useDispatch();
  const { userId } = useUserData();
  const { id } = useParams();
  const categorias = useSelector(state => state.categorias.entities);
  const receitaExistente = useSelector(state => state.receitas.entities?.[id]);

  const [nome, setNome] = useState('');
  const [categoriaId, setCategoriaId] = useState('');
  const [tempo_preparo, setTempo_preparo] = useState('');
  const [ingredientes, setIngredientes] = useState([]);
  const [modo_preparo, setModo_preparo] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (id && receitaExistente) {
      setNome(receitaExistente.nome || '');
      setCategoriaId(receitaExistente.categoriaId?.toString() || '');
      setTempo_preparo(receitaExistente.tempo_preparo?.toString() || '');
      setModo_preparo(receitaExistente.modo_preparo || '');
      setIngredientes(receitaExistente.ingredientes || []);
    } else {
      const dadosSalvos = JSON.parse(localStorage.getItem('dadosReceitaParcial')) || {};
      setNome(dadosSalvos.nome || '');
      setCategoriaId(dadosSalvos.categoriaId || '');
      setTempo_preparo(dadosSalvos.tempo_preparo || '');
      setModo_preparo(dadosSalvos.modo_preparo || '');

      const ingredientesSalvos = JSON.parse(localStorage.getItem('ingredientesSelecionados')) || [];
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
    navigate('/selecionar-ingredientes');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nome || !categoriaId || !tempo_preparo || ingredientes.length === 0) {
      alert('Preencha todos os campos obrigatórios!');
      return;
    }

    const receitaData = {
      id: id ? Number(id) : undefined,
      nome,
      tempo_preparo: Number(tempo_preparo),
      categoriaId: Number(categoriaId),
      ingredientes: ingredientes.map(ing => ({
        id: ing.id,
        nome: ing.nome,
        quantidade: Number(ing.quantidade),
        unidade: ing.unidade
      })),
      modo_preparo,
      userId: Number(userId)
    };

    try {
      if (id) {
        await dispatch(updateReceita({ id: Number(id), receitaData })).unwrap();
      } else {
        await dispatch(addReceita({ receitaData, userId })).unwrap();
      }

      localStorage.removeItem('dadosReceitaParcial');
      localStorage.removeItem('ingredientesSelecionados');
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
                <option key={cat.id} value={cat.id}>{cat.nome}</option>
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