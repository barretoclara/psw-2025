import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadUserFromStorage } from './storeConfig/slices/usuarioSlice';
import HomePage from './pages/HomePage';
import EstoquePage from './pages/EstoquePage';
import ListaMercadoPage from './pages/ListaMercadoPage';
import LoginPage from './pages/LoginPage';
import ReceitaPage from './pages/ReceitaPage';
import CadastroReceitaPage from './pages/CadastroReceitaPage';
import CadastroCategoriaPage from './pages/CadastroCategoriaPage';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import CadastroUsuario from './pages/CadastroUsuario';
import SelecionaIngredientes from './pages/SelecionaIngredientes';
import AssinaturaPremium from './pages/AssinaturaPremium';
import GerarListaMercado from "./components/listaMercado/GerarListaMercado";
import FavoritosPage from './pages/FavoritosPage'; 
import VisualizacaoReceita from './components/receita/VisualizacaoReceita';
import TermosDeUsoPage from './pages/TermosDeUsoPage';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUserFromStorage());
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cadastro" element={<CadastroUsuario />} />
        <Route path="/" element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        } />
        <Route path="/favoritos" element={ 
          <ProtectedRoute>
            <FavoritosPage />
          </ProtectedRoute>
        } />
        <Route path="/estoque" element={
          <ProtectedRoute>
            <EstoquePage />
          </ProtectedRoute>
        } />
        <Route path="/lista-mercado" element={
          <ProtectedRoute>
            <ListaMercadoPage />
          </ProtectedRoute>
        } />
        <Route path="/lista-mercado/gerar" element={
          <ProtectedRoute>
            <GerarListaMercado />
          </ProtectedRoute>
        } />
        <Route path="/receita/:id" element={
          <ProtectedRoute>
            <ReceitaPage />
          </ProtectedRoute>
        } />
        <Route path="/cadastrar-receita" element={
          <ProtectedRoute>
            <CadastroReceitaPage />
          </ProtectedRoute>
        } />
        <Route path="/selecionar-ingredientes" element={
          <ProtectedRoute>
            <SelecionaIngredientes />
          </ProtectedRoute>
        } />
        <Route path="/editar-receita/:id" element={
          <ProtectedRoute>
            <CadastroReceitaPage />
          </ProtectedRoute>
        } />
        <Route path="/visualizar-receita/:id" element={
          <ProtectedRoute>
            <VisualizacaoReceita />
          </ProtectedRoute>
        } />
        <Route path="/cadastrar-categoria" element={
          <ProtectedRoute>
            <CadastroCategoriaPage />
          </ProtectedRoute>
        } />
        <Route path="/editar-categoria/:id" element={
          <ProtectedRoute>
            <CadastroCategoriaPage />
          </ProtectedRoute>
        } />
        <Route path="/assinatura" element={
          <ProtectedRoute>
            <AssinaturaPremium />
          </ProtectedRoute>
        } />
        <Route path="/termos-de-uso" element={
          <ProtectedRoute>
            <TermosDeUsoPage />
          </ProtectedRoute>
        } />

      </Routes>
    </Router>
  );
}

export default App;
