import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ListaMercado.css';

const ListaMercado = () => {
  const navigate = useNavigate();
  const [itens, setItens] = useState([
    { id: 1, texto: '', checked: false },
    { id: 2, texto: '', checked: false },
    { id: 3, texto: '', checked: false }
  ]);

  // Adicionar novo item
  const adicionarItem = () => {
    const novoId = itens.length > 0 ? Math.max(...itens.map(item => item.id)) + 1 : 1;
    setItens([...itens, { id: novoId, texto: '', checked: false }]);
  };

  // Atualizar texto do item
  const atualizarTexto = (id, novoTexto) => {
    setItens(itens.map(item => 
      item.id === id ? { ...item, texto: novoTexto } : item
    ));
  };

  // Alternar estado checked
  const toggleChecked = (id) => {
    setItens(itens.map(item => 
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  // Remover item
  const removerItem = (id) => {
    const novosItens = itens.filter(item => item.id !== id);
    setItens(novosItens.length > 0 ? novosItens : [{ id: 1, texto: '', checked: false }]);
  };

  // Copiar lista
  const copiarLista = () => {
    const texto = itens
      .map(item => (item.checked ? '[✓] ' : '[ ] ') + item.texto.trim())
      .filter(item => item.replace(/\[[✓ ]\] /, '') !== "")
      .join("\n");
    
    if (!texto.replace(/\[[✓ ]\] /g, '').trim()) {
      alert("A lista está vazia!");
      return;
    }
    
    navigator.clipboard.writeText(texto).then(() => {
      alert("Lista copiada para a área de transferência!");
    });
  };

  // Baixar lista
  const baixarLista = () => {
    const texto = itens
      .map(item => (item.checked ? '[✓] ' : '[ ] ') + item.texto.trim())
      .filter(item => item.replace(/\[[✓ ]\] /, '') !== "")
      .join("\n");
    
    if (!texto.replace(/\[[✓ ]\] /g, '').trim()) {
      alert("A lista está vazia!");
      return;
    }
    
    const blob = new Blob([texto], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "lista_de_mercado.txt";
    a.click();

    URL.revokeObjectURL(url);
  };

  // Compartilhar lista
  const compartilharLista = async () => {
    const texto = itens
      .map(item => (item.checked ? '[✓] ' : '[ ] ') + item.texto.trim())
      .filter(item => item.replace(/\[[✓ ]\] /, '') !== "")
      .join("\n");
    
    if (!texto.replace(/\[[✓ ]\] /g, '').trim()) {
      alert("A lista está vazia!");
      return;
    }
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Minha Lista de Mercado",
          text: texto
        });
      } catch (error) {
        console.error("Erro ao compartilhar:", error);
      }
    } else {
      alert("Compartilhamento não suportado neste navegador.");
    }
  };

  // Escolher receita
  const escolherReceita = () => {
    navigate("/lista-mercado/gerar");
  };

  return (
    <div className="lista-mercado-container">
      {/* Header */}
      <header className="header">
        <button className="back-button" onClick={() => navigate(-1)}>
          <span className="back-icon">←</span>
        </button>
        <div className="logo">Panelinha Digital</div>
      </header>

      {/* Main Content */}
      <main className="flex-grow-1">
        <div className="container-custom">
          <h1 className="text-center mb-4">Lista de Mercado</h1>
          
          <ul className="list-unstyled">
            {itens.map((item) => (
              <li 
                key={item.id} 
                className={`lista-item ${item.checked ? 'checked' : ''}`}
              >
                <button 
                  className="toggle-check" 
                  onClick={() => toggleChecked(item.id)}
                >
                  {item.checked ? (
                    <span className="checked-icon">✓</span>
                  ) : (
                    <span className="unchecked-icon">○</span>
                  )}
                </button>
                <input
                  type="text"
                  className="item-text"
                  placeholder="Digite um item"
                  value={item.texto}
                  onChange={(e) => atualizarTexto(item.id, e.target.value)}
                />
                <button 
                  className="remove-item" 
                  onClick={() => removerItem(item.id)}
                >
                  <span className="trash-icon">×</span>
                </button>
              </li>
            ))}
          </ul>

          <div className="divider">ou</div>
          
          <button className="btn btn-custom recipe-btn" onClick={escolherReceita}>
            <span className="me-2">📋</span>
            Escolha uma receita
          </button>

          <button className="add-item-btn" onClick={adicionarItem}>
            <span className="plus-icon">+</span>
          </button>

          <div className="button-group">
            <button className="btn btn-custom" onClick={() => window.print()}>
              <span className="me-2">⎙</span>
              Imprimir
            </button>
            <button className="btn btn-custom" onClick={copiarLista}>
              <span className="me-2">⎘</span>
              Copiar
            </button>
            <button className="btn btn-custom" onClick={baixarLista}>
              <span className="me-2">↓</span>
              Download
            </button>
            <button className="btn btn-custom" onClick={compartilharLista}>
              <span className="me-2">↗</span>
              Compartilhar
            </button>
          </div>
        </div>
      </main>

    </div>
  );
};

export default ListaMercado;