import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { gerarListaMercado, limparLista } from "../../storeConfig/slices/listaMercadoSlice";
import { selectAllReceitas } from "../../storeConfig/slices/receitasSlice";
import { selectCurrentUserId } from '../../storeConfig/slices/usuarioSlice';
import { fetchEstoque } from "../../storeConfig/slices/estoqueSlice";
import './GerarListaMercado.css';

export default function GerarListaMercado() {
  const dispatch = useDispatch();
  const { items, status } = useSelector(state => state.listaMercado);
  const receitas = useSelector(selectAllReceitas);
  const [receitasSelecionadas, setReceitasSelecionadas] = useState([]);
  const userId = useSelector(selectCurrentUserId);

  useEffect(() => {
    if (userId) {
      dispatch(fetchEstoque(userId));
    }

    if (userId && receitasSelecionadas.length > 0) {
      dispatch(gerarListaMercado({ 
        receitasIds: receitasSelecionadas,
        userId 
      }));
    } else {
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

  const textoLista = items.map(item => {
    const unidadeFormatada = item.quantidade === 1 ? item.unidade : item.unidade + 's';
    return `${item.quantidade} ${unidadeFormatada} de ${item.nome}`;
  }).join("\n");

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
    <div className="gerar-lista-container">
      <h1 className="titulo">Lista de Mercado</h1>

      <section className="receitas-selecao">
        <h2 className="subtitulo">Escolha uma ou mais receitas:</h2>
        <div className="lista-receitas">
          {receitas.map(receita => (
            <div
              key={receita.id}
              className={`card-receita ${receitasSelecionadas.includes(receita.id) ? 'selecionada' : ''}`}
              onClick={() => toggleReceita(receita.id)}
            >
              <p>{receita.nome}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="resultado-lista">
        {status === 'loading' ? (
          <p className="status-msg">Calculando lista...</p>
        ) : items.length === 0 ? (
          <p className="status-msg">
            {receitasSelecionadas.length > 0 
              ? "Você tem todos os ingredientes em estoque!" 
              : "Selecione receitas para gerar a lista"}
          </p>
        ) : (
          <>
            <ul className="itens-lista">
              {items.map((item, index) => (
                <li key={index} className="item-lista">
                  {item.quantidade} {item.unidade} de {item.nome}
                </li>
              ))}
            </ul>

            <div className="botoes-acao">
              <button onClick={() => window.print()}>Imprimir</button>
              <button onClick={copiarLista}>Copiar</button>
              <button onClick={baixarLista}>Download</button>
              <button onClick={compartilharLista}>Compartilhar</button>
            </div>
          </>
        )}
      </section>
    </div>
  );
}