import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addCategoria, updateCategoria } from '../../storeConfig/slices/categoriasSlice';

export default function CategoriaForm({ categoriaExistente, userId }) {
  const [nome, setNome] = useState(categoriaExistente?.nome || '');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const categoriaData = { nome, userId };
    
    if (categoriaExistente) {
      dispatch(updateCategoria({ 
        categoria: { ...categoriaExistente, ...categoriaData },
        userId
      }));
    } else {
      dispatch(addCategoria(categoriaData));
    }
    
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block mb-1">Nome da Categoria</label>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <button
        type="submit"
        className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
      >
        {categoriaExistente ? 'Atualizar' : 'Salvar'}
      </button>
    </form>
  );
}