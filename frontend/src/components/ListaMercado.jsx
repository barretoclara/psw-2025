import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

// Estoque mockado (exemplo por enquanto)
const estoqueUsuario = [
  { nome: "Farinha de trigo", quantidade: 1, unidade: "xícaras" },
  { nome: "Açúcar", quantidade: 1, unidade: "xícaras" },
  { nome: "Ovos", quantidade: 2, unidade: "unidades" },
];

function calcularListaDeMercado(receitas, estoque) {
  const mapaIngredientes = new Map();

  receitas.forEach(receita => {
    receita.ingredientes.forEach(ing => {
      const chave = `${ing.nome}-${ing.unidade}`;
      const atual = mapaIngredientes.get(chave) || 0;
      mapaIngredientes.set(chave, atual + ing.quantidade);
    });
  });

  estoque.forEach(item => {
    const chave = `${item.nome}-${item.unidade}`;
    const quantidadeEstoque = mapaIngredientes.get(chave);
    if (quantidadeEstoque !== undefined) {
      const restante = quantidadeEstoque - item.quantidade;
      if (restante > 0) {
        mapaIngredientes.set(chave, restante);
      } else {
        mapaIngredientes.delete(chave);
      }
    }
  });

  const listaFinal = [];
  mapaIngredientes.forEach((quantidade, chave) => {
    const [nome, unidade] = chave.split("-");
    listaFinal.push({ nome, quantidade, unidade });
  });

  return listaFinal;
}

export default function ListaMercado() {
  const [lista, setLista] = useState([]);

  useEffect(() => {
    const receitasSelecionadas = JSON.parse(localStorage.getItem("receitasSelecionadas") || "[]");
    const listaCalculada = calcularListaDeMercado(receitasSelecionadas, estoqueUsuario);
    setLista(listaCalculada);
  }, []);

  const textoLista = lista.map(item => `${item.quantidade} ${item.unidade} de ${item.nome}`).join("\n");

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

      {lista.length === 0 ? (
        <p className="text-center text-gray-600">Nenhum item necessário — você tem tudo em estoque!</p>
      ) : (
        <ul className="mb-6 space-y-2">
          {lista.map((item, index) => (
            <li key={index} className="bg-pink-100 border border-gray-400 p-2 rounded">
              {item.quantidade} {item.unidade} de {item.nome}
            </li>
          ))}
        </ul>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Button onClick={() => window.print()}>Imprimir</Button>
        <Button onClick={copiarLista}>Copiar</Button>
        <Button onClick={baixarLista}>Download</Button>
        <Button onClick={compartilharLista}>Compartilhar</Button>
      </div>
    </div>
  );
}
