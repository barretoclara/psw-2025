import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ReceitaPage from './pages/ReceitaPage';
import EstoquePage from './pages/EstoquePage';
import ListaMercadoPage from './pages/ListaMercadoPage';
import LoginPage from './pages/LoginPage';
import Header from './components/Header';
import ProtectedRoute from './components/ProtectedRoute';
import { loadUserFromStorage } from './storeConfig/slices/usuarioSlice';

const App = () => {
  return (
    <Router>
      <Header />
      <main className="p-6">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/receita/:id" element={<ReceitaPage />} />
          <Route path="/estoque" element={<ProtectedRoute><EstoquePage /></ProtectedRoute>} />
          <Route path="/lista-mercado" element={<ProtectedRoute><ListaMercadoPage /></ProtectedRoute>} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;
