import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAllReceitas } from '../storeConfig/slices/receitasSlice';
import { selectCategoriasDoUsuario } from '../storeConfig/slices/categoriasSlice';
import { useUserData } from '../hooks/useUserData';

export default function Home() {
  const navigate = useNavigate();
  const { userId } = useUserData();
  const [filtroCategoria, setFiltroCategoria] = useState('todos');
  const [busca, setBusca] = useState('');

  const todasReceitas = useSelector(selectAllReceitas);
  const categorias = useSelector(selectCategoriasDoUsuario);

  const receitasUsuario = todasReceitas.filter(
    receita => receita.userId === userId
  );

  const receitasFiltradas = receitasUsuario.filter((receita) => {
    const correspondeCategoria = 
      filtroCategoria === 'todos' || 
      receita.categoriaId === filtroCategoria;
    
    const correspondeBusca = 
      receita.nome.toLowerCase().includes(busca.toLowerCase());
    
    return correspondeCategoria && correspondeBusca;
  });

  const getNomeCategoria = (categoriaId) => {
    const categoria = categorias.find(c => c.id === categoriaId);
    return categoria ? categoria.nome : 'Sem categoria';
  };

  return (
    <div className="p-4 md:p-8">
      {/* Cabeçalho */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Minhas Receitas</h1>
        <button 
          onClick={() => navigate('/cadastrar-receita')}
          className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
        >
          Nova Receita
        </button>
      </div>

      {/* Filtros */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Buscar receita..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="form-input px-4 py-2 border rounded w-full md:w-2/3"
        />
        <div className="flex flex-wrap gap-2 w-full md:w-1/3">
          <button 
            onClick={() => setFiltroCategoria('todos')}
            className={`px-4 py-2 rounded ${filtroCategoria === 'todos' ? 'bg-purple-500 text-white' : 'bg-gray-200'}`}
          >
            Todos
          </button>
          {categorias.map((categoria) => (
            <button
              key={categoria.id}
              onClick={() => setFiltroCategoria(categoria.id)}
              className={`px-4 py-2 rounded ${filtroCategoria === categoria.id ? 'bg-purple-500 text-white' : 'bg-gray-200'}`}
            >
              {categoria.nome}
            </button>
          ))}
        </div>
      </div>

      {/* Lista de receitas */}
      {receitasFiltradas.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">
            {filtroCategoria === 'todos' 
              ? 'Você ainda não tem receitas cadastradas' 
              : 'Nenhuma receita nesta categoria'}
          </p>
          <button 
            onClick={() => navigate('/cadastrar-receita')}
            className="mt-4 bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
          >
            {filtroCategoria === 'todos' 
              ? 'Criar primeira receita' 
              : 'Criar receita nesta categoria'}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {receitasFiltradas.map((receita) => (
            <div
              key={receita.id}
              className="bg-white rounded-xl shadow overflow-hidden flex flex-col hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => navigate(`/receita/${receita.id}`)}
            >
              {receita.imagem && (
                <img 
                  src={receita.imagem} 
                  alt={receita.nome} 
                  className="h-48 object-cover w-full"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/300x200?text=Sem+Imagem';
                  }}
                />
              )}
              <div className="p-4 flex flex-col flex-grow">
                <h2 className="text-lg font-semibold mb-2">{receita.nome}</h2>
                <p className="text-gray-600 mb-2">
                  {receita.tempo_preparo || 'Tempo não especificado'}
                </p>
                {receita.categoriaId && (
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                    {getNomeCategoria(receita.categoriaId)}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}