import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import LoginForm from '../components/usuario/LoginForm';

const LoginPage = () => {
  const usuario = useSelector(state => state.usuario.usuario);
  const status = useSelector(state => state.usuario.status);

  if (usuario && status === 'succeeded') {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh', background: '#fceeff' }}>
      <LoginForm />
    </div>
  );
};

export default LoginPage;