import { useParams } from 'react-router-dom';
import ReceitaDetalhe from '../components/receitas/ReceitaDetalhe';

const ReceitaPage = () => {
  const { id } = useParams();
  return <ReceitaDetalhe id={id} />;
};

export default ReceitaPage;