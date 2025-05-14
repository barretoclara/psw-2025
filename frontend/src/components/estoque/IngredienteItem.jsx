const IngredienteItem = ({ ingrediente }) => (
  <li className="p-2 border rounded shadow flex justify-between">
    <span>{ingrediente.nome}</span>
    <span className="font-semibold">{ingrediente.quantidade}</span>
  </li>
);

export default IngredienteItem;