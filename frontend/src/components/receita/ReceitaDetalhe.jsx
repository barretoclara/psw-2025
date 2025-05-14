import { useSelector } from 'react-redux';

const ReceitaDetalhe = ({ id }) => {
  const receita = useSelector(state => state.receitas.entities?.[id]);
  const estoque = useSelector(state => state.estoque.entities);

  if (!receita) return <p>Receita não encontrada.</p>;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">{receita.nome}</h2>
      <p><strong>Categoria:</strong> {receita.categoria}</p>
      <p><strong>Tempo de preparo:</strong> {receita.tempo_preparo} minutos</p>
      <div>
        <h3 className="font-semibold">Ingredientes:</h3>
        <ul className="list-disc list-inside">
          {receita.ingredientes.map((idIng, idx) => (
            <li key={idx}>{estoque?.[idIng]?.nome || `Ingrediente #${idIng}`}</li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="font-semibold">Modo de preparo:</h3>
        <p>{receita.modo_preparo}</p>
      </div>
    </div>
  );
};

export default ReceitaDetalhe;