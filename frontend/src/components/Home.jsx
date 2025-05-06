import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const receitasMock = [
  {
    id: 1,
    nome: "Bolo de Chocolate",
    tempoPreparo: "45 minutos",
    categoria: "doce",
    imagem: "https://images.unsplash.com/photo-1626263468007-a9e0cf83f1ac?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 2,
    nome: "Pizza Caseira",
    tempoPreparo: "30 minutos",
    categoria: "salgado",
    imagem: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 3,
    nome: "Lasanha de Carne",
    tempoPreparo: "50 minutos",
    categoria: "salgado",
    imagem: "https://images.unsplash.com/photo-1709429790175-b02bb1b19207?q=80&w=1932&auto=format&fit=crop",
  },
];

export default function Home() {
  const navigate = useNavigate();
  const [filtroCategoria, setFiltroCategoria] = useState('todos');
  const [busca, setBusca] = useState('');

  const receitasFiltradas = receitasMock.filter((r) => {
    const correspondeCategoria = filtroCategoria === 'todos' || r.categoria === filtroCategoria;
    const correspondeBusca = r.nome.toLowerCase().includes(busca.toLowerCase());
    return correspondeCategoria && correspondeBusca;
  });

  return (
    <div className="p-4 md:p-8">
      {/* Cabeçalho */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Minhas Receitas</h1>
        <Button onClick={() => navigate('/cadastrar')}>Nova Receita</Button>
      </div>

      {/* Filtros */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Buscar receita..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="form-input px-4 py-2 border rounded w-full md:w-2/3"
        />
        <div className="flex gap-2 w-full md:w-1/3">
          <Button onClick={() => setFiltroCategoria('doce')} className="w-full">Doces</Button>
          <Button onClick={() => setFiltroCategoria('salgado')} className="w-full">Salgados</Button>
          <Button onClick={() => setFiltroCategoria('todos')} className="w-full">Todos</Button>
        </div>
      </div>

      {/* Lista de receitas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {receitasFiltradas.map((r) => (
          <div
            key={r.id}
            className="bg-white rounded-xl shadow overflow-hidden flex flex-col"
          >
            <img src={r.imagem} alt={r.nome} className="h-48 object-cover w-full" />
            <div className="p-4 flex flex-col flex-grow">
              <h2 className="text-lg font-semibold mb-2">{r.nome}</h2>
              <p className="mb-4">Tempo de preparo: {r.tempoPreparo}</p>
              <Button onClick={() => navigate(`/receita/${r.id}`)} className="mt-auto">Ver Receita</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
