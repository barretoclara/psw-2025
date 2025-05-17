import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { gerarListaMercado, limparLista } from "../../storeConfig/slices/listaMercadoSlice";
import { selectAllReceitas } from "../../storeConfig/slices/receitasSlice";
import { selectCurrentUserId } from '../../storeConfig/slices/usuarioSlice';

export default function ListaMercado() {
  const dispatch = useDispatch();
  const { items, status } = useSelector(state => state.listaMercado);
  const receitas = useSelector(selectAllReceitas);
  const [receitasSelecionadas, setReceitasSelecionadas] = useState([]);
  const userId = useSelector(selectCurrentUserId);

  useEffect(() => {
    if (userId && receitasSelecionadas.length > 0) {
      dispatch(gerarListaMercado({ 
        receitasIds: receitasSelecionadas,
        userId 
      }));
    } else {    // !
      dispatch(limparLista());
    }
  }, [receitasSelecionadas, userId, dispatch]);

  const toggleReceita = (id) => {
    setReceitasSelecionadas(prev => 
      prev.includes(id) 
        ? prev.filter(rId => rId !== id)
        : [...prev, id]
    );
  };

  const textoLista = items.map(item => 
    `${item.quantidade} ${item.unidade} de ${item.nome}`
  ).join("\n");

  function copiarLista() {
    navigator.clipboard.writeText(textoLista).then(() => {
      alert("Lista copiada para a área de transferência!");
    });
  }

  function baixarLista() {
    const blob = new Blob([textoLista], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "lista_de_mercado.txt";
    a.click();
    URL.revokeObjectURL(url);
  }

  function compartilharLista() {
    if (navigator.share) {
      navigator
        .share({
          title: "Lista de Mercado",
          text: textoLista,
        })
        .catch((error) => console.error("Erro ao compartilhar:", error));
    } else {
      alert("Compartilhamento não suportado neste navegador.");
    }
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4 text-center">Lista de Mercado</h1>
      
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Selecione as receitas:</h2>
        <div className="space-y-2">
          {receitas.map(receita => (
            <div key={receita.id} className="flex items-center">
              <input
                type="checkbox"
                id={`receita-${receita.id}`}
                checked={receitasSelecionadas.includes(receita.id)}
                onChange={() => toggleReceita(receita.id)}
                className="mr-2"
              />
              <label htmlFor={`receita-${receita.id}`}>{receita.nome}</label>
            </div>
          ))}
        </div>
      </div>

      {status === 'loading' ? (
        <p>Calculando lista...</p>
      ) : items.length === 0 ? (
        <p className="text-center text-gray-600">
          {receitasSelecionadas.length > 0 
            ? "Você tem todos os ingredientes em estoque!" 
            : "Selecione receitas para gerar a lista"}
        </p>
      ) : (
        <>
          <ul className="mb-6 space-y-2">
            {items.map((item, index) => (
              <li key={index} className="bg-pink-100 border border-gray-400 p-2 rounded">
                {item.quantidade} {item.unidade} de {item.nome}
              </li>
            ))}
          </ul>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <button onClick={() => window.print()}>Imprimir</button>
            <button onClick={copiarLista}>Copiar</button>
            <button onClick={baixarLista}>Download</button>
            <button onClick={compartilharLista}>Compartilhar</button>
          </div>
        </>
      )}
    </div>
  );
}
