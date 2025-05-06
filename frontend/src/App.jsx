import {
  BrowserRouter,
  Router,
  Routes,
  Route 
} from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import ReceitaDetalhe from './components/ReceitaDetalhe';
import ListaMercado from './components/ListaMercado';
import Estoque from './components/Estoque';
import NotFound from './components/NotFound';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/receita/:id" element={<ReceitaDetalhe />} />
        <Route path="/lista-mercado" element={<ListaMercado />} />
        <Route path="/estoque" element={<Estoque />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
