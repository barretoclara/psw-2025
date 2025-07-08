import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import "./styles/HomePage.css";
import { fetchReceitas, selectAllReceitas } from "../storeConfig/slices/receitasSlice";
import { fetchCategorias, selectAllCategorias } from "../storeConfig/slices/categoriasSlice";
import { useUserData } from "../hooks/useUserData";

export default function HomePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { validateUser, userId } = useUserData();

  const [filtroCategoria, setFiltroCategoria] = useState('todos');
  const [busca, setBusca] = useState('');
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

  const receitas = useSelector(selectAllReceitas);
  const categorias = useSelector(selectAllCategorias);

  useEffect(() => {
    try {
      const userId = validateUser();
      dispatch(fetchReceitas(userId));
      dispatch(fetchCategorias(userId));
    } catch (error) {
      console.error("Usuário não autenticado:", error);
    }
  }, [dispatch, validateUser]);

  const receitasUsuario = receitas.filter(r => r.userId === userId);

  const receitasFiltradas = receitasUsuario.filter((receita) => {
    if (!receita || typeof receita !== 'object') return false;

    const correspondeCategoria =
      filtroCategoria === 'todos' ||
      receita.categoriaId === filtroCategoria;

    const termoBusca = typeof busca === 'string' ? busca.toLowerCase() : '';
    const nomeReceita = receita.nome ? receita.nome.toLowerCase() : '';
    const correspondeBusca = nomeReceita.includes(termoBusca);

    return correspondeCategoria && correspondeBusca;
  });

  const getNomeCategoria = (categoriaId) => {
    const categoria = categorias.find(c => c.id === categoriaId);
    return categoria ? categoria.nome : 'Sem categoria';
  };

  const getCategoriaSelecionada = () => {
    if (filtroCategoria === 'todos') return 'Todas categorias';
    const categoria = categorias.find(c => c.id === filtroCategoria);
    return categoria ? categoria.nome : 'Selecionar categoria';
  };

  return (
    <div className="container py-3" style={{ maxWidth: '1200px', padding: '0 10px' }}>
      <div className="header-bar text-center mb-4">
        <h1 className="logo mb-3">Panelinha Digital</h1>

        <div className="d-flex flex-column align-items-center">
          <div className="mb-3">
            <Link to="/cadastrar-receita" className="btn btn-rosa me-2">
              Nova Receita
            </Link>
            <Link to="/cadastrar-categoria" className="btn btn-rosa">
              Nova Categoria
            </Link>
          </div>

          <div className="input-group mb-3" style={{ maxWidth: '400px' }}>
            <input
              type="text"
              className="form-control"
              placeholder="Buscar receitas..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
            <button className="btn btn-rosa" type="button">
              <i className="bi bi-search"></i>
            </button>
          </div>

          <div className="position-relative mb-3" style={{ maxWidth: '400px', width: '100%' }}>
            <button
              onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
              className="btn btn-light w-100 text-start"
            >
              {getCategoriaSelecionada()}
            </button>
            {showCategoryDropdown && (
              <div className="dropdown-menu show w-100">
                <button
                  className={`dropdown-item ${filtroCategoria === 'todos' ? 'active' : ''}`}
                  onClick={() => {
                    setFiltroCategoria('todos');
                    setShowCategoryDropdown(false);
                  }}
                >
                  Todas categorias
                </button>
                {categorias.map(c => (
                  <button
                    key={c.id}
                    className={`dropdown-item ${filtroCategoria === c.id ? 'active' : ''}`}
                    onClick={() => {
                      setFiltroCategoria(c.id);
                      setShowCategoryDropdown(false);
                    }}
                  >
                    {c.nome}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {receitasFiltradas.length === 0 ? (
        <div className="text-center py-5">
          <p className="text-muted">
            {filtroCategoria === 'todos'
              ? 'Você ainda não tem receitas cadastradas'
              : 'Nenhuma receita nesta categoria'}
          </p>
          <div className="d-flex justify-content-center gap-3 mt-3">
            {filtroCategoria !== 'todos' && (
              <button
                onClick={() => navigate('/cadastrar-receita', { state: { categoriaId: filtroCategoria } })}
                className="btn btn-rosa"
              >
                Criar receita nesta categoria
              </button>
            )}
            <button
              onClick={() => navigate('/cadastrar-receita')}
              className="btn btn-rosa"
            >
              Criar nova receita
            </button>
          </div>
        </div>
      ) : (
        <div className="row g-3">
          {receitasFiltradas.map((rec) => (
            <div key={rec.id} className="col-6 col-md-4 col-lg-3">
              <div
                className="card card-receita h-100 cursor-pointer"
                onClick={() => navigate(`/visualizar-receita/${rec.id}`)} // ✅ corrigido aqui
              >
                {rec.imagem ? (
                  <img
                    src={rec.imagem}
                    alt={rec.nome}
                    className="card-img-top"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/300x200?text=Sem+Imagem';
                    }}
                  />
                ) : (
                  <div className="card-img-top bg-light text-center py-5 text-muted">
                    Sem imagem
                  </div>
                )}
                <div className="card-body">
                  <h6 className="card-title text-truncate">{rec.nome}</h6>
                  <p className="card-text">
                    {rec.tempo_preparo ?? "Tempo não informado"} min
                  </p>
                  {rec.categoriaId && (
                    <span className="badge bg-secondary">
                      {getNomeCategoria(rec.categoriaId)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="promo-banner text-center mt-5">
        <h5>Black da Amazon</h5>
        <p className="mb-2">Até 70% de desconto em utensílios</p>
        <button className="btn btn-light btn-sm" onClick={() => navigate('/assinatura')}>
          Conferir Ofertas
        </button>
      </div>

      <Footer />
    </div>
  );
}
