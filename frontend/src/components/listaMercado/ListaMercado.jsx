import { useSelector } from 'react-redux';

const ListaMercado = () => {
  const itens = useSelector(state => state.listaMercado.entities);

  if (!itens || Object.keys(itens).length === 0) return <p>Lista de mercado está vazia.</p>;

  return (
    <ul className="space-y-2">
      {Object.values(itens).map(item => (
        <li key={item.id} className="p-2 border rounded flex justify-between">
          <span>{item.nome}</span>
          <span className="font-semibold">{item.quantidade}</span>
        </li>
      ))}
    </ul>
  );
};

export default ListaMercado;