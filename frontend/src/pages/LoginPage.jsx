import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import LoginForm from '../components/usuario/LoginForm';

const LoginPage = () => {
  const usuario = useSelector(state => state.usuario.usuario);
  
  if (usuario) {
    return <Navigate to="/" replace />;
  }

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Login</h1>
      <LoginForm />
    </div>
  );
};

export default LoginPage;