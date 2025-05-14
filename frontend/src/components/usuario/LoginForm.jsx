import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../storeConfig/slices/usuarioSlice';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, senha }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block font-medium">Email</label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />
      </div>
      <div>
        <label className="block font-medium">Senha</label>
        <input
          type="password"
          value={senha}
          onChange={e => setSenha(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />
      </div>
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
        Entrar
      </button>
    </form>
  );
};

export default LoginForm;