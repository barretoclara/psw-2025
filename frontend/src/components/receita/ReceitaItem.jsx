import { Link } from 'react-router-dom';

const ReceitaItem = ({ receita }) => (
  <li className="border p-4 rounded shadow hover:shadow-md">
    <Link to={`/receita/${receita.id}`} className="text-lg font-semibold hover:underline">
      {receita.nome}
    </Link>
    <p className="text-sm text-gray-600">Categoria: {receita.categoria}</p>
  </li>
);

export default ReceitaItem;