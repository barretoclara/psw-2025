import { useSelector } from 'react-redux';
import ReceitaItem from './ReceitaItem';

const ReceitaList = () => {
  const receitas = useSelector(state => state.receitas.entities);
  const filtro = useSelector(state => state.receitas.filtro);

  const receitasFiltradas = filtro
    ? Object.values(receitas).filter(r => r.categoria === filtro)
    : Object.values(receitas);

  if (!receitasFiltradas.length) return <p>Nenhuma receita encontrada.</p>;

  return (
    <ul className="space-y-3">
      {receitasFiltradas.map(receita => (
        <ReceitaItem key={receita.id} receita={receita} />
      ))}
    </ul>
  );
};

export default ReceitaList;