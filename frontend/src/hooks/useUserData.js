import { useSelector } from 'react-redux';
import { selectCurrentUserId } from '../storeConfig/slices/usuarioSlice';

export const useUserData = () => {
  const userId = useSelector(selectCurrentUserId);
  
  const validateUser = () => {
    if (!userId) {
      console.warn('Usuário não autenticado - redirecionando para login');
      return null;
    }
    return userId;
  };

  return { 
    userId, 
    validateUser,
    isAuthenticated: !!userId 
  };
};