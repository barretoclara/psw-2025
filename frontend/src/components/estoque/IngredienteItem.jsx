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
      ...ingrediente,
      ...novosDados,
      userId: validateUser()
    }));

  };

  const diminuirQuantidade = () => {
    if (ingrediente.quantidade > 0) {
      handleUpdate({ quantidade: ingrediente.quantidade - 1 });
    }
  };

  return (
    <li className="ingrediente-item">
      <span className="ingrediente-nome">
        {ingrediente.nome} - {ingrediente.quantidade}
      </span>
      <div className="ingrediente-acoes">
        <button onClick={diminuirQuantidade}>-</button>
        <button onClick={() => handleUpdate({ quantidade: ingrediente.quantidade + 1 })}>+</button>
        <button onClick={handleDelete}>🗑</button>
      </div>
    </li>
  );
};

export default IngredienteItem;