import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  fetchEstoque,
  addEstoqueItem,
  selectEstoqueDoUsuario 
} from '../storeConfig/slices/estoqueSlice';
import { useUserData } from '../hooks/useUserData';
import IngredienteItem from './IngredienteItem';

const EstoqueList = () => {
  const dispatch = useDispatch();
  const { userId, validateUser } = useUserData();
  const estoque = useSelector(selectEstoqueDoUsuario);

  useEffect(() => {
    if (userId) {
      dispatch(fetchEstoque(userId));
    }
  }, [userId, dispatch]);

  const handleAddItem = (novoItem) => {
    dispatch(addEstoqueItem({
      itemData: novoItem,
      userId: validateUser()
    }));
  };

  if (!estoque) return <p>Carregando estoque...</p>;
  if (ingredientes.length === 0) return <p>Nenhum ingrediente no estoque.</p>;

  return (
    <div>
      <ul className="space-y-2">
        {estoque.map(ing => (
          <IngredienteItem key={ing.id} ingrediente={ing} />
        ))}
      </ul>
      
      <button 
        onClick={() => handleAddItem({ nome: "Novo Ingrediente", quantidade: 0 })}
        className="mt-4 p-2 bg-blue-500 text-white"
      >
        Adicionar Item
      </button>
    </div>
  );
};

export default EstoqueList;