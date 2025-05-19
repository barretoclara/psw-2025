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
    <div className="container-fluid py-4 d-flex justify-content-center">
      <div className="container px-3" style={{ maxWidth: '1140px' }}>
        <div className="header-bar mb-4 d-flex justify-content-between align-items-center">
          <h1 className="logo">Panelinha Digital</h1>
          <div className="button-group d-flex gap-2">
            <Link to="/cadastrar-receita" className="btn btn-rosa">Nova Receita</Link>
            <Link to="/cadastrar-categoria" className="btn btn-rosa">Nova Categoria</Link>
          </div>
        </div>

        {/* Barra de pesquisa */}
        <div className="search-wrapper mb-4">
          <div className="input-group w-100">
            <input type="text" className="form-control form-control-lg" placeholder="Buscar receitas..." />
            <button className="btn btn-rosa px-4" type="button">
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
            <div className="row">
              {receitasRapidas.map((rec) => (
                <div key={rec.id} className="col-6 col-md-4 col-lg-3">
                  <div className="card card-receita">
                    <div className="card-body">
                      <h6 className="card-title">{rec.nome}</h6>
                      <p className="card-text">{rec.tempo_preparo ?? "Tempo não informado"}</p>
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
          <div className="row">
            {receitas.map((rec) => (
              <div key={rec.id} className="col-6 col-md-4 col-lg-3">
                <div className="card card-receita">
                  <div className="card-body">
                    <h6 className="card-title">{rec.nome}</h6>
                    <p className="card-text">{rec.tempo_preparo ?? "Tempo não informado"}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Banner promocional */}
        <div className="ad-banner text-center">
          <h2>Compre agora com desconto exclusivo!</h2>
          <button>Saiba mais</button>
        </div>

        <Footer />
      </div>
    </div>
  );
}