import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CategoriaForm from '../components/categoria/CategoriaForm';
import { useUserData } from '../hooks/useUserData';

export default function CadastroCategoriaPage() {
  const { id } = useParams();
  const { userId } = useUserData();
  const categoria = useSelector(state =>
    id ? state.categorias.entities[id] : null
  );

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh', backgroundColor: '#fceeff' }}>
      <CategoriaForm
        categoriaExistente={categoria}
        userId={userId}
      />
    </div>
  );
}