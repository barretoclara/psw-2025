import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { 
  fetchEstoque,
  addEstoqueItem,
  selectAllEstoque
} from "../storeConfig/slices/estoqueSlice";
import { useUserData } from "../hooks/useUserData";
import { Modal, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const SelecionaIngredientes = () => {
  const dispatch = useDispatch();
  const { userId } = useUserData();
  const estoque = useSelector(selectAllEstoque);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({ 
    id: "",
    nome: "", 
    quantidade: "", 
    unidade: "unidades",
    isEditing: false
  });
  const [ingredientesSelecionados, setIngredientesSelecionados] = useState([]);
  const nomeInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      dispatch(fetchEstoque(userId));
    }
    const selecionadosSalvos = JSON.parse(localStorage.getItem("ingredientesSelecionados")) || [];
    setIngredientesSelecionados(selecionadosSalvos);
  }, [userId, dispatch]);

  const filteredIngredientes = estoque.filter((ing) =>
    ing.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCheckboxChange = (id) => {
    setIngredientesSelecionados(prev => {
      const existe = prev.find(ing => ing.id === id);
      if (existe) {
        return prev.filter(ing => ing.id !== id);
      } else {
        const ingrediente = estoque.find(ing => ing.id === id);
        return [...prev, { 
          id: ingrediente.id, 
          nome: ingrediente.nome, 
          quantidade: 1, 
          unidade: ingrediente.unidade 
        }];
      }
    });
  };

  const abrirModalAdicionar = () => {
    setModalData({ 
      id: "",
      nome: "", 
      quantidade: "", 
      unidade: "unidades",
      isEditing: false
    });
    setShowModal(true);
  };

  const abrirModalEditar = (id) => {
    const ingSelecionado = ingredientesSelecionados.find(i => i.id === id);
    const ingEstoque = estoque.find(i => i.id === id);
    
    if (ingSelecionado) {
      setModalData({
        id: ingSelecionado.id,
        nome: ingSelecionado.nome,
        quantidade: ingSelecionado.quantidade,
        unidade: ingSelecionado.unidade,
        isEditing: true
      });
      setShowModal(true);
    } else if (ingEstoque) {
      setModalData({
        id: ingEstoque.id,
        nome: ingEstoque.nome,
        quantidade: 1,
        unidade: ingEstoque.unidade,
        isEditing: true
      });
      setShowModal(true);
    }
  };

  const salvarIngrediente = async () => {
    const nome = modalData.nome.trim();
    if (!nome) return alert("Insira um nome");
    
    const qtdReceita = parseInt(modalData.quantidade) || 0;
    if (qtdReceita <= 0) return alert("Quantidade deve ser maior que zero");
    
    const uni = modalData.unidade.trim() || "unidades";

    try {
      if (modalData.isEditing) {
        setIngredientesSelecionados(prev =>
          prev.map(ing =>
            ing.id === modalData.id
              ? { ...ing, quantidade: qtdReceita, unidade: uni }
              : ing
          )
        );
      } else {
        const resultAction = await dispatch(addEstoqueItem({
          itemData: { 
            nome,
            quantidade: 0,
            unidade: uni
          },
          userId
        }));

        const novoIngrediente = resultAction.payload;
        
        setIngredientesSelecionados(prev => [
          ...prev, 
          { 
            id: novoIngrediente.id, 
            nome: novoIngrediente.nome, 
            quantidade: qtdReceita, 
            unidade: novoIngrediente.unidade 
          }
        ]);
      }

      setShowModal(false);
    } catch (error) {
      console.error("Erro ao salvar ingrediente:", error);
      alert("Erro ao salvar ingrediente");
    }
  };

  const confirmarIngredientes = () => {
    const selecionados = ingredientesSelecionados
      .filter(ing => ing.quantidade > 0)
      .map(({ id, nome, quantidade, unidade }) => ({ 
        id, 
        nome, 
        quantidade, 
        unidade 
      }));
    
    localStorage.setItem("ingredientesSelecionados", JSON.stringify(selecionados));
    navigate('/cadastrar-receita');
  };

  const cancelar = () => {
    localStorage.removeItem("ingredientesSelecionados");
    navigate('/cadastrar-receita');
  };

  const estaSelecionado = (id) => {
    return ingredientesSelecionados.some(ing => ing.id === id);
  };

  const getQuantidadeSelecionada = (id) => {
    const ing = ingredientesSelecionados.find(ing => ing.id === id);
    return ing ? ing.quantidade : 0;
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
                checked={estaSelecionado(ing.id)}
                onChange={() => handleCheckboxChange(ing.id)}
              />
              {ing.nome} (
              {estaSelecionado(ing.id) ? 
                `${getQuantidadeSelecionada(ing.id)} ${ingredientesSelecionados.find(i => i.id === ing.id)?.unidade || ing.unidade}` : 
                `0 ${ing.unidade}`}
              )
            </div>
            {estaSelecionado(ing.id) && (
              <button 
                className="btn btn-sm btn-outline-secondary"
                onClick={() => abrirModalEditar(ing.id)}
              >
                Editar
              </button>
            )}
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
        <button 
          className="btn btn-danger"
          onClick={cancelar}
        >
          Cancelar
        </button>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>
            {modalData.isEditing ? "Editar" : "Adicionar"} Ingrediente
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nome do Ingrediente</Form.Label>
              <Form.Control
                ref={nomeInputRef}
                type="text"
                value={modalData.nome}
                onChange={(e) => setModalData({ ...modalData, nome: e.target.value })}
                placeholder="Ex: Farinha de trigo"
                required
                readOnly={modalData.isEditing}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Quantidade na Receita</Form.Label>
              <Form.Control
                type="number"
                min="1"
                value={modalData.quantidade}
                onChange={(e) => setModalData({ ...modalData, quantidade: e.target.value })}
                placeholder="Quantidade usada na receita"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Unidade de Medida</Form.Label>
              <Form.Control
                type="text"
                value={modalData.unidade}
                onChange={(e) => setModalData({ ...modalData, unidade: e.target.value })}
                placeholder="Ex: xícaras, gramas, unidades"
                required
                readOnly={modalData.isEditing}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={salvarIngrediente}>
            {modalData.isEditing ? "Atualizar" : "Salvar"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SelecionaIngredientes;