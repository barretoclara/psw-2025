import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ReceitaForm from '../components/receita/ReceitaForm';
import { useUserData } from '../hooks/useUserData';

export default function CadastroReceitaPage() {
  const { id } = useParams();
  const { userId } = useUserData();
  const receita = useSelector(state => 
    id ? state.receitas.entities[id] : null
  );

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">
        {id ? 'Editar Receita' : 'Nova Receita'}
      </h1>
      <ReceitaForm 
        receitaExistente={receita} 
        userId={userId} 
      />
    </div>
  );
}