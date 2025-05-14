import { useDispatch } from 'react-redux';
import { setFiltro } from '../../storeConfig/slices/receitasSlice';

const CategoriaItem = ({ categoria }) => {
  const dispatch = useDispatch();

  return (
    <button
      onClick={() => dispatch(setFiltro(categoria.nome))}
      className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
    >
      {categoria.nome}
    </button>
  );
};

export default CategoriaItem;