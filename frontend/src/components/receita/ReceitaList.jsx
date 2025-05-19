import { useSelector } from 'react-redux';
import ReceitaItem from './ReceitaItem';
import { selectReceitasPorCategoria } from '../../storeConfig/slices/receitasSlice';
import { useUserData } from '../../hooks/useUserData';

const ReceitaList = () => {
  const { userId } = useUserData();
  const filtro = useSelector(state => state.receitas.filtro);
  
  const receitasFiltradas = useSelector(state => {
    if (filtro) {
      return selectReceitasPorCategoria(state, filtro)
        .filter(r => r.userId === userId);
    }
    return Object.values(state.receitas.entities)
      .filter(r => r.userId === userId);
  });

  if (receitasFiltradas.length === 0) {
    return <p>{filtro ? "Nenhuma receita nesta categoria." : "Nenhuma receita encontrada."}</p>;
  }

  return (
    <ul className="space-y-3">
      {receitasFiltradas.map(receita => (
        <ReceitaItem key={receita.id} receita={receita} />
      ))}
    </ul>
  );
};

export default ReceitaList;