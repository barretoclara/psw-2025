import CategoriaList from '../components/categoria/CategoriaList';
import ReceitaList from '../components/receita/ReceitaList';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchEstoque } from '../storeConfig/slices/estoqueSlice';
import { fetchReceitas } from '../storeConfig/slices/receitasSlice';
import { fetchCategorias } from '../storeConfig/slices/categoriasSlice';
import { useUserData } from '../hooks/useUserData';

const HomePage = () => {
  const dispatch = useDispatch();
  const { userId, validateUser } = useUserData();

  useEffect(() => {
    try {
      const validUserId = validateUser();
      dispatch(fetchReceitas(validUserId));
      dispatch(fetchEstoque(validUserId));
      dispatch(fetchCategorias(validUserId));
    } catch (error) {
      console.error("Erro de autenticação:", error);
    }
  }, [dispatch, validateUser]);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Categorias</h1>
      <CategoriaList />
      <h2 className="text-2xl font-semibold">Receitas</h2>
      <ReceitaList />
    </div>
  );
};

export default HomePage;