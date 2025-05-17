import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const usuario = useSelector(state => state?.usuario?.usuario);
  
  if (!usuario) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

export default ProtectedRoute;