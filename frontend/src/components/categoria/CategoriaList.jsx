import { useSelector, useDispatch } from 'react-redux';
import CategoriaItem from './CategoriaItem';
import { useUserData } from '../hooks/useUserData';
import { fetchCategorias } from '../storeConfig/slices/categoriasSlice';

const CategoriaList = () => {
  const dispatch = useDispatch();
  const { userId, validateUser } = useUserData();
  
  useEffect(() => {
    if (userId) {
      dispatch(fetchCategorias(validateUser()));
    }
  }, [userId, dispatch, validateUser]);

  const categorias = useSelector(state => 
    Object.values(state.categorias.entities).filter(c => c.userId === userId)
  );

  if (!categorias) return <p>Carregando categorias...</p>;
  if (categorias.length === 0) return <p>Nenhuma categoria cadastrada.</p>;

  return (
    <div className="flex gap-4 flex-wrap">
      {categorias.map(cat => (
        <CategoriaItem key={cat.id} categoria={cat} />
      ))}
    </div>
  );
};

export default CategoriaList;