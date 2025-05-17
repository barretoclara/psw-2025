import { useParams } from 'react-router-dom';
import ReceitaDetalhe from '../components/receita/ReceitaDetalhe';

const ReceitaPage = () => {
  const { id } = useParams();
  return <ReceitaDetalhe id={id} />;
};

export default ReceitaPage;