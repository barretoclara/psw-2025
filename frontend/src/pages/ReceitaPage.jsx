import { useParams } from 'react-router-dom';
import ReceitaDetalhe from '../components/receita/ReceitaDetalhe';

const ReceitaPage = () => {
  const { id } = useParams();
  
  if (!id) {
    return <div>ID da receita não fornecido</div>;
  }

  return <ReceitaDetalhe id={id} />;
};

export default ReceitaPage;