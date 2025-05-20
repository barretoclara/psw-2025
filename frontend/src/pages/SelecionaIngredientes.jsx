import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Modal, Button, Form } from "react-bootstrap";

const inicialIngredientes = [
  { id: "pimentareino", nome: "Pimenta do Reino", quantidade: 0, unidade: "unidade" },
  { id: "mostarda", nome: "Mostarda", quantidade: 0, unidade: "pote" },
  { id: "ketchup", nome: "Ketchup", quantidade: 0, unidade: "pote" },
  { id: "cremedeleite", nome: "Creme de Leite", quantidade: 0, unidade: "caixa" },
  { id: "manteiga", nome: "Manteiga", quantidade: 0, unidade: "tablete" },
  { id: "cebola", nome: "Cebola", quantidade: 0, unidade: "unidade" },
  { id: "frango", nome: "Frango", quantidade: 0, unidade: "kg" },
  { id: "oleo", nome: "Óleo", quantidade: 0, unidade: "litro" },
  { id: "sal", nome: "Sal", quantidade: 0, unidade: "pacote" },
  { id: "cogumelos", nome: "Cogumelos", quantidade: 0, unidade: "g" },
  { id: "batatapalha", nome: "Batata Palha", quantidade: 0, unidade: "pacote" },
  { id: "maionese", nome: "Maionese", quantidade: 0, unidade: "pote" },
  { id: "ovos", nome: "Ovos", quantidade: 0, unidade: "unidade" },
  { id: "arroz", nome: "Arroz", quantidade: 0, unidade: "kg" },
  { id: "feijao", nome: "Feijão", quantidade: 0, unidade: "kg" },
  { id: "banana", nome: "Banana", quantidade: 0, unidade: "unidade" },
  { id: "leite", nome: "Leite", quantidade: 0, unidade: "litro" },
  { id: "fermento", nome: "Fermento", quantidade: 0, unidade: "pacote" },
  { id: "acucar", nome: "Açúcar", quantidade: 0, unidade: "kg" },
];

const SelecionaIngredientes = () => {
  const [ingredientes, setIngredientes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({ id: "", nome: "", quantidade: "", unidade: "" });
  const nomeInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const selecionados = JSON.parse(localStorage.getItem("ingredientesSelecionados")) || [];
      const ingredientesAtualizados = inicialIngredientes.map((ing) => {
        const sel = selecionados.find((s) => s.id === ing.id);
        return sel ? sel : ing;
      });
      setIngredientes(ingredientesAtualizados);
    } catch {
      setIngredientes(inicialIngredientes);
    }
  }, []);

  useEffect(() => {
    if (showModal && nomeInputRef.current) nomeInputRef.current.focus();
  }, [showModal]);

  const filteredIngredientes = ingredientes.filter((ing) =>
    ing.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCheckboxChange = (id) => {
    const ingrediente = ingredientes.find((ing) => ing.id === id);
    if (!ingrediente) return;
    if (ingrediente.quantidade === 0) abrirModalEditar(id);
    else {
      const novosIngredientes = ingredientes.map((ing) =>
        ing.id === id ? { ...ing, quantidade: 0 } : ing
      );
      setIngredientes(novosIngredientes);
    }
  };

  const abrirModalAdicionar = () => {
    setModalData({ id: "", nome: "", quantidade: "", unidade: "" });
    setShowModal(true);
  };

  const abrirModalEditar = (id) => {
    const ing = ingredientes.find((i) => i.id === id);
    if (ing) {
      setModalData({
        id: ing.id,
        nome: ing.nome,
        quantidade: ing.quantidade === 0 ? "" : ing.quantidade,
        unidade: ing.unidade || "",
      });
      setShowModal(true);
    }
  };

  const salvarIngrediente = () => {
    const nome = modalData.nome.trim();
    if (!nome) return alert("Insira um nome");
    const qtd = parseInt(modalData.quantidade) || 0;
    const uni = modalData.unidade.trim();

    if (modalData.id) {
      setIngredientes((old) =>
        old.map((ing) =>
          ing.id === modalData.id ? { ...ing, nome, quantidade: qtd, unidade: uni } : ing
        )
      );
    } else {
      const novoId = nome.toLowerCase().replace(/\s+/g, "");
      if (ingredientes.some((ing) => ing.id === novoId)) {
        alert("Ingrediente já existe!");
        return;
      }
      setIngredientes((old) => [...old, { id: novoId, nome, quantidade: qtd, unidade: uni }]);
    }
    setShowModal(false);
  };

  const confirmarIngredientes = () => {
    const selecionados = ingredientes.filter((ing) => ing.quantidade > 0);
    localStorage.setItem("ingredientesSelecionados", JSON.stringify(selecionados));
    navigate('/cadastrar-receita');
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Selecionar Ingredientes</h2>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Pesquisar ingredientes..."
        />
      </div>
      
      <ul className="list-group mb-4">
        {filteredIngredientes.map((ing) => (
          <li key={ing.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <input
                type="checkbox"
                className="form-check-input me-2"
                checked={ing.quantidade > 0}
                onChange={() => handleCheckboxChange(ing.id)}
              />
              {ing.nome} ({ing.quantidade} {ing.unidade})
            </div>
            <button 
              className="btn btn-sm btn-outline-secondary"
              onClick={() => abrirModalEditar(ing.id)}
            >
              Editar
            </button>
          </li>
        ))}
      </ul>

      <div className="d-flex gap-2">
        <button 
          className="btn btn-primary"
          onClick={abrirModalAdicionar}
        >
          Adicionar Ingrediente
        </button>
        <button 
          className="btn btn-success"
          onClick={confirmarIngredientes}
        >
          Confirmar e Voltar
        </button>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>{modalData.id ? "Editar" : "Adicionar"} Ingrediente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                ref={nomeInputRef}
                type="text"
                value={modalData.nome}
                onChange={(e) => setModalData({ ...modalData, nome: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Quantidade</Form.Label>
              <Form.Control
                type="number"
                value={modalData.quantidade}
                onChange={(e) => setModalData({ ...modalData, quantidade: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Unidade</Form.Label>
              <Form.Control
                type="text"
                value={modalData.unidade}
                onChange={(e) => setModalData({ ...modalData, unidade: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancelar</Button>
          <Button variant="primary" onClick={salvarIngrediente}>Salvar</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SelecionaIngredientes;