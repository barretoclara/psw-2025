import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl } from '../../utils/baseUrl';

export const login = createAsyncThunk(
  'usuario/login',
  async ({ email, senha }, thunkAPI) => {
    try {
      const response = await fetch(`${baseUrl}/usuarios?email=${email}&senha=${senha}`);
      const data = await response.json();

      if (data.length === 1) {
        return data[0];
      } else {
        return thunkAPI.rejectWithValue({ error: 'Email ou senha inválidos' });
      }
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

const initialState = {
  usuario: null,
  status: 'idle',
  error: null,
};

const usuarioSlice = createSlice({
  name: 'usuario',
  initialState,
  reducers: {
    logout(state) {
      state.usuario = null;
      state.status = 'idle';
      state.error = null;
    },
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

export const { logout } = usuarioSlice.actions;
export default usuarioSlice.reducer;