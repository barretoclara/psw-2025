import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  addCategoria,
  updateCategoria,
  fetchCategorias
} from '../../storeConfig/slices/categoriasSlice';

export default function CategoriaForm({ categoriaExistente, userId }) {
  const [nome, setNome] = useState(categoriaExistente?.nome || '');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const categoriaData = { nome, userId };

    if (categoriaExistente) {
      await dispatch(updateCategoria({
        categoria: { ...categoriaExistente, ...categoriaData },
        userId
      }));
    } else {
      await dispatch(addCategoria(categoriaData));
      await dispatch(fetchCategorias(userId)); 
    }

    navigate('/');
  };

  return (
    <div className="card p-4 rounded-4 shadow" style={{ width: '100%', maxWidth: '400px' }}>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 text-center">
          <label className="form-label fw-bold">Nome da Categoria</label>
          <input
            type="text"
            className="form-control text-center"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>
        <div className="d-flex justify-content-center">
          <button
            type="submit"
            className="btn text-white"
            style={{ backgroundColor: '#dda1df' }}
          >
            {categoriaExistente ? 'Atualizar' : 'Salvar'}
          </button>
        </div>
      </form>
    </div>
  );
}
