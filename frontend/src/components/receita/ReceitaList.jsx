import { useSelector } from 'react-redux';
import ReceitaItem from './ReceitaItem';
import { useUserData } from '../hooks/useUserData';

const ReceitaList = () => {
  const { userId } = useUserData();
  const filtro = useSelector(state => state.receitas.filtro);
  
  const receitasFiltradas = useSelector(state => {
    const todasReceitas = Object.values(state.receitas.entities);
    const doUsuario = todasReceitas.filter(r => r.userId === userId);
    
    return filtro 
      ? doUsuario.filter(r => r.categoria === filtro)
      : doUsuario;
  });

  if (!receitasFiltradas.length) {
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