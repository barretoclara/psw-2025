import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import "./HomePage.css";
import { fetchReceitas, selectAllReceitas } from "../storeConfig/slices/receitasSlice";
import { fetchCategorias, selectAllCategorias } from "../storeConfig/slices/categoriasSlice";
import { useUserData } from "../hooks/useUserData";

export default function HomePage() {
  const dispatch = useDispatch();
  const { validateUser } = useUserData();

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

  const receitasRapidas = receitas.filter(
    (r) => r.tempo_preparo && parseInt(r.tempo_preparo) <= 30
  );

  return (
    <div className="container py-3" style={{ maxWidth: '1200px', padding: '0 15px' }}>
      {/* Cabeçalho */}
      <div className="header-bar">
        <h1 className="logo">Panelinha Digital</h1>
        <div className="button-group">
          <Link to="/cadastrar-receita" className="btn btn-rosa">
            Nova Receita
          </Link>
          <Link to="/cadastrar-categoria" className="btn btn-rosa">
            Nova Categoria
          </Link>
        </div>
      </div>

      {/* Barra de pesquisa */}
      <div className="search-wrapper mb-4">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar receitas..."
            style={{
              height: '45px',
              borderRadius: '25px 0 0 25px',
              borderRight: 'none'
            }}
          />
          <button 
            className="btn btn-rosa" 
            type="button"
            style={{
              borderRadius: '0 25px 25px 0',
              padding: '0 20px'
            }}
          >
            <i className="bi bi-search"></i>
          </button>
        </div>
      </div>

      {/* Categorias */}
      <div className="d-flex flex-wrap mb-4">
        {categorias.map((cat) => (
          <button key={cat.id} className="btn btn-categoria">{cat.nome}</button>
        ))}
      </div>

      {/* Seção de receitas rápidas */}
      {receitasRapidas.length > 0 && (
        <div className="mb-5">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="section-title mb-0">Receitas Rápidas</h4>
            <a href="#" className="ver-tudo">Ver tudo</a>
          </div>
          <div className="row g-3">
            {receitasRapidas.map((rec) => (
              <div key={rec.id} className="col-6 col-md-4 col-lg-3">
                <div className="card card-receita h-100">
                  <div className="card-body p-3">
                    <h6 className="card-title">{rec.nome}</h6>
                    <p className="card-text">
                      {rec.tempo_preparo ?? "Tempo não informado"} min • 
                      {rec.ingredientes?.length ?? 0} ingredientes
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Todas as receitas */}
      <div className="mb-5">
        <h4 className="section-title">Todas as Receitas</h4>
        <div className="row g-3">
          {receitas.map((rec) => (
            <div key={rec.id} className="col-6 col-md-4 col-lg-3">
              <div className="card card-receita h-100">
                <div className="card-body p-3">
                  <h6 className="card-title">{rec.nome}</h6>
                  <p className="card-text">
                    {rec.tempo_preparo ?? "Tempo não informado"} min • 
                    {rec.ingredientes?.length ?? 0} ingredientes
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Banner promocional */}
      <div className="promo-banner text-center mt-4">
        <h5>Black da Amazon</h5>
        <p className="mb-2">Até 70% de desconto em utensílios</p>
        <button className="btn btn-light btn-sm">Conferir Ofertas</button>
      </div>

      <Footer />
    </div>
  );
}