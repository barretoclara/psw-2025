import { useSelector } from 'react-redux';
import { selectCurrentUserId } from '../storeConfig/slices/usuarioSlice';

export const useUserData = () => {
  const userId = useSelector(selectCurrentUserId);
  
  const validateUser = () => {
    if (!userId) {
      throw new Error('Acesso negado: usuário não autenticado');
    }
    return userId;
  };

  return { 
    userId, 
    validateUser,
    isAuthenticated: !!userId 
  };
};