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
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">
        {id ? 'Editar Categoria' : 'Nova Categoria'}
      </h1>
      <CategoriaForm 
        categoriaExistente={categoria} 
        userId={userId} 
      />
    </div>
  );
}