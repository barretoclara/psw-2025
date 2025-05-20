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
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh', backgroundColor: '#fceeff' }}>
      <ReceitaForm 
        receitaExistente={receita} 
        userId={userId} 
      />
    </div>
  );
}