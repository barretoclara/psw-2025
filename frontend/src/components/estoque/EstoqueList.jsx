import { useSelector } from 'react-redux';
import IngredienteItem from './IngredienteItem';

const EstoqueList = () => {
  const ingredientes = useSelector(state => state.estoque.entities);

  if (!ingredientes) return <p>Nenhum ingrediente no estoque.</p>;

  return (
    <ul className="space-y-2">
      {Object.values(ingredientes).map(ing => (
        <IngredienteItem key={ing.id} ingrediente={ing} />
      ))}
    </ul>
  );
};

export default EstoqueList;