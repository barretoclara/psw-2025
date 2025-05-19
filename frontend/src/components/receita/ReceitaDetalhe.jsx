import { useSelector } from 'react-redux';
import { selectCategoriaById } from '../../storeConfig/slices/categoriasSlice';
import { selectEstoqueById } from '../../storeConfig/slices/estoqueSlice';

const ReceitaDetalhe = ({ id }) => {
  const receita = useSelector(state => state.receitas.entities?.[id]);
  const categoria = useSelector(state => 
    receita?.categoriaId ? selectCategoriaById(state, receita.categoriaId) : null
  );

  if (!receita) return <div className="p-4 text-red-500">Receita não encontrada</div>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-purple-700 mb-4">{receita.nome}</h2>
      
      <div className="mb-4">
        <span className="font-semibold">Categoria: </span>
        <span>{categoria?.nome || 'Sem categoria'}</span>
      </div>
      
      <div className="mb-4">
        <span className="font-semibold">Tempo de preparo: </span>
        <span>{receita.tempo_preparo} minutos</span>
      </div>
      
      <div className="mb-4">
        <h3 className="font-semibold text-lg mb-2">Ingredientes:</h3>
        <ul className="list-disc pl-5">
          {receita.ingredientes?.map((ingredienteId, idx) => {
            const ingrediente = useSelector(state => 
              selectEstoqueById(state, ingredienteId)
            );
            return (
              <li key={idx}>
                {ingrediente?.nome || `Ingrediente #${ingredienteId}`}
              </li>
            );
          })}
        </ul>
      </div>
      
      <div>
        <h3 className="font-semibold text-lg mb-2">Modo de preparo:</h3>
        <p className="whitespace-pre-line">{receita.modo_preparo}</p>
      </div>
    </div>
  );
};

export default ReceitaDetalhe;