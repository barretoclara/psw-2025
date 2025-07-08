import { useDispatch } from 'react-redux';
import { deleteEstoqueItem, updateEstoqueItem } from '../../storeConfig/slices/estoqueSlice';
import { useUserData } from '../../hooks/useUserData';

const IngredienteItem = ({ ingrediente }) => {
  const dispatch = useDispatch();
  const { userId } = useUserData();

  const handleDelete = () => {
    dispatch(deleteEstoqueItem({
      id: ingrediente._id || ingrediente.id,
      userId
    }));
  };

  const handleUpdate = (novosDados) => {
    dispatch(updateEstoqueItem({
      ...ingrediente,
      ...novosDados,
      id: ingrediente._id || ingrediente.id,
      userId
    }));
  };

  const diminuirQuantidade = () => {
    if (ingrediente.quantidade > 0) {
      handleUpdate({ quantidade: ingrediente.quantidade - 1 });
    }
  };

  const aumentarQuantidade = () => {
    handleUpdate({ quantidade: ingrediente.quantidade + 1 });
  };

  return (
    <li className="ingrediente-item">
      <span className="ingrediente-nome">
        {ingrediente.nome} - {ingrediente.quantidade} {ingrediente.unidade}
      </span>
      <div className="ingrediente-acoes">
        <button onClick={diminuirQuantidade}>-</button>
        <button onClick={aumentarQuantidade}>+</button>
        <button onClick={handleDelete}>🗑</button>
      </div>
    </li>
  );
};

export default IngredienteItem;