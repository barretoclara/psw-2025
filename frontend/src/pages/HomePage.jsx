import CategoriaList from '../components/categorias/CategoriaList';
import ReceitaList from '../components/receitas/ReceitaList';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchEstoque } from '../storeConfig/slices/estoqueSlice';
import { fetchReceitas } from '../storeConfig/slices/receitasSlice';

const HomePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchEstoque());
    dispatch(fetchReceitas());
  }, [dispatch]);

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