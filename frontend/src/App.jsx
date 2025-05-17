import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import EstoquePage from './pages/EstoquePage';
import ListaMercadoPage from './pages/ListaMercadoPage';
import LoginPage from './pages/LoginPage';
import ReceitaPage from './pages/ReceitaPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={
          <ProtectedRoute>
            <HomePage />
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
        <Route path="/receita/:id" element={
          <ProtectedRoute>
            <ReceitaPage />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;