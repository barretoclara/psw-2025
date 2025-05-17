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
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

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

  const getCategoriaSelecionada = () => {
    if (filtroCategoria === 'todos') return 'Todas categorias';
    const categoria = categorias.find(c => c.id === filtroCategoria);
    return categoria ? categoria.nome : 'Selecionar categoria';
  };

  return (
    <div className="p-4 md:p-8">
      {/* Cabeçalho */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold">Minhas Receitas</h1>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <button 
            onClick={() => navigate('/cadastrar-categoria')}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 whitespace-nowrap"
          >
            Gerenciar Categorias
          </button>
          <button 
            onClick={() => navigate('/cadastrar-receita')}
            className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 whitespace-nowrap"
          >
            Nova Receita
          </button>
        </div>
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
        
        <div className="relative w-full md:w-1/3">
          <button 
            onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
            className="w-full flex justify-between items-center px-4 py-2 bg-white border rounded hover:bg-gray-50"
          >
            <span>{getCategoriaSelecionada()}</span>
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {showCategoryDropdown && (
            <div className="absolute z-10 w-full mt-1 bg-white border rounded shadow-lg max-h-60 overflow-auto">
              <button
                key="todos"
                onClick={() => {
                  setFiltroCategoria('todos');
                  setShowCategoryDropdown(false);
                }}
                className={`w-full text-left px-4 py-2 ${filtroCategoria === 'todos' ? 'bg-purple-100 text-purple-800' : 'hover:bg-gray-100'}`}
              >
                Todas categorias
              </button>
              {categorias.map((categoria) => (
                <button
                  key={categoria.id}
                  onClick={() => {
                    setFiltroCategoria(categoria.id);
                    setShowCategoryDropdown(false);
                  }}
                  className={`w-full text-left px-4 py-2 ${filtroCategoria === categoria.id ? 'bg-purple-100 text-purple-800' : 'hover:bg-gray-100'}`}
                >
                  {categoria.nome}
                </button>
              ))}
            </div>
          )}
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
          <div className="flex justify-center gap-4 mt-4">
            {filtroCategoria !== 'todos' && (
              <button 
                onClick={() => navigate('/cadastrar-receita', { state: { categoriaId: filtroCategoria } })}
                className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
              >
                Criar receita nesta categoria
              </button>
            )}
            <button 
              onClick={() => navigate('/cadastrar-receita')}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Criar nova receita
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {receitasFiltradas.map((receita) => (
            <div
              key={receita.id}
              className="bg-white rounded-xl shadow overflow-hidden flex flex-col hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => navigate(`/receita/${receita.id}`)}
            >
              {receita.imagem ? (
                <img 
                  src={receita.imagem} 
                  alt={receita.nome} 
                  className="h-48 w-full object-cover"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/300x200?text=Sem+Imagem';
                  }}
                />
              ) : (
                <div className="h-48 bg-gray-100 flex items-center justify-center">
                  <span className="text-gray-400">Sem imagem</span>
                </div>
              )}
              
              <div className="p-4 flex flex-col flex-grow">
                <h2 className="text-lg font-semibold mb-2 line-clamp-2">{receita.nome}</h2>
                
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-600">
                    {receita.tempo_preparo || 'Tempo não especificado'}
                  </span>
                </div>
                
                {receita.categoriaId && (
                  <div className="mt-auto">
                    <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                      {getNomeCategoria(receita.categoriaId)}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}