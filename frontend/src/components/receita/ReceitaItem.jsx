import { Link } from 'react-router-dom';

const ReceitaItem = ({ receita }) => (
  <li className="border p-4 rounded shadow hover:shadow-md transition-shadow">
    <Link 
      to={`/receita/${receita.id || receita._id}`} 
      className="text-lg font-semibold text-purple-600 hover:underline block"
    >
      {receita.nome}
    </Link>
    <p className="text-sm text-gray-600 mt-1">
      Categoria: {receita.categoriaId || 'Sem categoria'}
    </p>
  </li>
);

export default ReceitaItem;