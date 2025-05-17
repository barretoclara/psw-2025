import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import baseUrl from '../api/baseUrl';

export const login = createAsyncThunk(
  'usuario/login',
  async ({ email, senha }, thunkAPI) => {
    try {
      const response = await fetch(`${baseUrl}/usuarios?email=${email}&senha=${senha}`);
      const data = await response.json();

      if (data.length === 1) {
        localStorage.setItem('currentUserId', data[0].id);
        return data[0];
      } else {
        return thunkAPI.rejectWithValue({ error: 'Credenciais inválidas' });
      }
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
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
        state.usuario = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.error || 'Erro ao fazer login';
      });
  },
});

export const { logout, loadUserFromStorage } = usuarioSlice.actions;
export const selectCurrentUserId = (state) => state.usuario.usuario?.id;
export default usuarioSlice.reducer;