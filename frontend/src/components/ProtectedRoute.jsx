import { useSelector } from 'react-redux'

const ProtectedRoute = ({ children }) => {
  const usuario = useSelector(state => state?.usuario?.usuario)
  
  if (!usuario) {
    window.location.href = '/login'
    return null
  }
  
  return children
}

export default ProtectedRoute