import React from 'react';
import './VisualizacaoReceita.css';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { deleteReceita } from '../../storeConfig/slices/receitasSlice';

export default function VisualizacaoReceita() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const receita = useSelector((state) => state.receitas.entities[id]);

  if (!receita) {
    return <p>Receita não encontrada.</p>;
  }

  const handleEditar = () => {
    navigate(`/editar-receita/${id}`);
  };

  const handleDeletar = () => {
    if (window.confirm('Tem certeza que deseja excluir esta receita?')) {
      dispatch(deleteReceita({ id, userId: receita.userId }));
      navigate('/');
    }
  };

  return (
    <div className="visualizacao-receita">
      <h1>{receita.nome}</h1>

      <p className="tempo-preparo">
        Tempo de preparo: {receita.tempo_preparo} minutos
      </p>

      <section className="ingredientes">
        <h2>Ingredientes</h2>
        <ul>
          {receita.ingredientes.map((item) => (
            <li key={item.id}>
              {item.quantidade} {item.unidade} de {item.nome}
            </li>
          ))}
        </ul>
      </section>

      <section className="modo-preparo">
        <h2>Modo de Preparo</h2>
        <p>{receita.modo_preparo}</p>
      </section>

      <div className="botoes">
        <button className="btn-editar" onClick={handleEditar}>Editar</button>
        <button className="btn-deletar" onClick={handleDeletar}>Excluir</button>
      </div>
    </div>
  );
}