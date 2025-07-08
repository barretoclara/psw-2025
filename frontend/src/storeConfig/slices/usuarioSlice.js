import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import baseUrl from '../../api/baseUrl';
import { httpPost } from '../../api/utils';

export const login = createAsyncThunk(
  'usuario/login',
  async ({ email, senha }, thunkAPI) => {
    try {
      const response = await fetch(`${baseUrl}/usuarios/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, senha })
      });

      if (!response.ok) {
        return thunkAPI.rejectWithValue('Email ou senha inválidos');
      }

      const data = await response.json();
      localStorage.setItem('currentUserId', data.userId);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const registerUser = createAsyncThunk(
  'usuario/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await httpPost(`${baseUrl}/api/usuarios/register`, {
        nome: userData.nome,
        email: userData.email,
        senha: userData.senha
      });
      return response;
    } catch (error) {
      return rejectWithValue(error.message || 'Erro desconhecido no cadastro');
    }
  }
);

const initialState = {
  usuario: null,
  status: localStorage.getItem('currentUserId') ? 'succeeded' : 'idle',
  error: null
};

const usuarioSlice = createSlice({
  name: 'usuario',
  initialState,
  reducers: {
    logout(state) {
      localStorage.removeItem('currentUserId');
      state.usuario = null;
      state.status = 'idle';
      state.error = null;
    },
    loadUserFromStorage(state) {
      const userId = localStorage.getItem('currentUserId');
      if (userId) {
        state.status = 'loading';
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.usuario = {
          id: action.payload.userId,
          nome: action.payload.nome,
          token: action.payload.token
        };
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Erro ao fazer login';
      })
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.status = 'idle';
        state.usuario = null;
      })
      
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  }
});

export const { logout, loadUserFromStorage } = usuarioSlice.actions;
export const selectCurrentUserId = (state) => state.usuario.usuario?.id;
export default usuarioSlice.reducer;