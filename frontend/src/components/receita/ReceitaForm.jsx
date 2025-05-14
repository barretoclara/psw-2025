import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { adicionarIngredienteAoEstoque } from '../../storeConfig/slices/estoqueSlice';
import { v4 as uuidv4 } from 'uuid';

const ReceitaForm = ({ onSubmit }) => {
  const dispatch = useDispatch();
  const categorias = useSelector(state => state.categorias.entities);
  const estoque = useSelector(state => state.estoque.entities);

  const [nome, setNome] = useState('');
  const [categoria, setCategoria] = useState('');
  const [tempoPreparo, setTempoPreparo] = useState('');
  const [modoPreparo, setModoPreparo] = useState('');
  const [ingredientes, setIngredientes] = useState([]);
  const [novoIngrediente, setNovoIngrediente] = useState('');

  const adicionarIngrediente = () => {
    const existente = Object.values(estoque).find(i => i.nome.toLowerCase() === novoIngrediente.toLowerCase());
    let ingredienteId;
    if (existente) {
      ingredienteId = existente.id;
    } else {
      ingredienteId = uuidv4();
      dispatch(adicionarIngredienteAoEstoque({ id: ingredienteId, nome: novoIngrediente }));
    }
    setIngredientes([...ingredientes, ingredienteId]);
    setNovoIngrediente('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ id: uuidv4(), nome, categoria, tempo_preparo: tempoPreparo, modo_preparo: modoPreparo, ingredientes });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="text" value={nome} onChange={e => setNome(e.target.value)} placeholder="Nome da receita" className="border p-2 w-full" required />
      <select value={categoria} onChange={e => setCategoria(e.target.value)} className="border p-2 w-full" required>
        <option value="">Selecione a categoria</option>
        {categorias && Object.values(categorias).map(cat => (
          <option key={cat.id} value={cat.nome}>{cat.nome}</option>
        ))}
      </select>
      <input type="number" value={tempoPreparo} onChange={e => setTempoPreparo(e.target.value)} placeholder="Tempo de preparo (min)" className="border p-2 w-full" required />
      <textarea value={modoPreparo} onChange={e => setModoPreparo(e.target.value)} placeholder="Modo de preparo" className="border p-2 w-full" required />

      <div>
        <label className="block font-semibold mb-1">Ingredientes:</label>
        <div className="flex gap-2">
          <input type="text" value={novoIngrediente} onChange={e => setNovoIngrediente(e.target.value)} placeholder="Novo ingrediente" className="border p-2 flex-1" />
          <button type="button" onClick={adicionarIngrediente} className="bg-blue-500 text-white px-4 py-2 rounded">Adicionar</button>
        </div>
        <ul className="list-disc list-inside mt-2">
          {ingredientes.map((id, idx) => (
            <li key={idx}>{estoque[id]?.nome || `Ingrediente #${id}`}</li>
          ))}
        </ul>
      </div>

      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Salvar Receita</button>
    </form>
  );
};

export default ReceitaForm;