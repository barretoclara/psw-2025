import EstoqueList from '../components/estoque/EstoqueList';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchEstoque } from '../../storeConfig/slices/estoqueSlice';
import { useUserData } from '../../hooks/useUserData';

const EstoquePage = () => {
  const dispatch = useDispatch();
  const { validateUser } = useUserData();

  useEffect(() => {
    try {
      const userId = validateUser();
      dispatch(fetchEstoque(userId));
    } catch (error) {
      console.error("Erro de autenticação:", error);
    }
  }, [dispatch, validateUser]);

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Estoque</h1>
      <EstoqueList />
    </div>
  );
};

export default EstoquePage;