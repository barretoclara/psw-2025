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
      const userId = validateUser(); // garante que está logado
      dispatch(fetchReceitas(userId));
      dispatch(fetchCategorias(userId));
    } catch (error) {
      console.error("Usuário não autenticado:", error);
    }
  }, [dispatch, validateUser]);

  return (
    <div className="container py-3">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="logo">Panelinha Digital</div>
        <div>
          <Link to="/cadastrar-receita" className="btn btn-rosa me-2">Nova Receita</Link>
          <Link to="/cadastrar-categoria" className="btn btn-rosa">Nova Categoria</Link>
        </div>
      </div>

      <div className="input-group mb-4">
        <input type="text" className="form-control" placeholder="Buscar receitas..." />
        <button className="btn btn-rosa" type="button">
          <i className="bi bi-search"></i>
        </button>
      </div>

      <div className="d-flex flex-wrap mb-3">
        {categorias.map((cat) => (
          <button key={cat.id} className="btn btn-categoria">{cat.nome}</button>
        ))}
      </div>

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

      <Footer />
    </div>
  );
}