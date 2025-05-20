import { useDispatch } from 'react-redux';
import { deleteEstoqueItem, updateEstoqueItem } from '../../storeConfig/slices/estoqueSlice';
import { useUserData } from '../../hooks/useUserData';

const IngredienteItem = ({ ingrediente }) => {
  const dispatch = useDispatch();
  const { validateUser } = useUserData();

  const handleDelete = () => {
    dispatch(deleteEstoqueItem({
      id: ingrediente.id,
      userId: validateUser()
    }));
  };

  const handleUpdate = (novosDados) => {
    dispatch(updateEstoqueItem({
      itemData: { ...ingrediente, ...novosDados },
      userId: validateUser()
    }));
  };

  const diminuirQuantidade = () => {
    if (ingrediente.quantidade > 0) {
      handleUpdate({ quantidade: ingrediente.quantidade - 1 });
    }
  };

  return (
    <li className="flex justify-between items-center p-2 border rounded">
      <span>{ingrediente.nome} - {ingrediente.quantidade}</span>
      <div className="space-x-2">
        <button 
          onClick={diminuirQuantidade}
          className="px-2 bg-yellow-100"
        >
          -
        </button>
        <button 
          onClick={() => handleUpdate({ quantidade: ingrediente.quantidade + 1 })}
          className="px-2 bg-green-100"
        >
          +
        </button>
        <button 
          onClick={handleDelete}
          className="px-2 bg-red-100"
        >
          Remover
        </button>
      </div>
    </li>
  );
};

export default IngredienteItem;
