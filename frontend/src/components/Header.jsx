import { Link } from 'react-router-dom';

export function Header() {
  return (
    <header className="bg-green-600 text-white px-6 py-4 flex justify-between">
      <h1 className="text-xl font-bold">App de Receitas</h1>
      <nav className="space-x-4">
        <Link to="/">Home</Link>
        <Link to="/estoque">Estoque</Link>
        <Link to="/lista-mercado">Lista de Mercado</Link>
        <Link to="/login">Login</Link>
      </nav>
    </header>
  );
}