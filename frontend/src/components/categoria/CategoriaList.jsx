import { useSelector } from 'react-redux';
import CategoriaItem from './CategoriaItem';

const CategoriaList = () => {
  const categorias = useSelector(state => state.categorias.entities);

  if (!categorias) return <p>Nenhuma categoria cadastrada.</p>;

  return (
    <div className="flex gap-4 flex-wrap">
      {Object.values(categorias).map(cat => (
        <CategoriaItem key={cat.id} categoria={cat} />
      ))}
    </div>
  );
};

export default CategoriaList;