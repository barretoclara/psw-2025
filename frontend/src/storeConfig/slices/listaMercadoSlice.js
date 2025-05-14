import { createSlice } from '@reduxjs/toolkit';

const listaMercadoSlice = createSlice({
  name: 'listaMercado',
  initialState: [],
  reducers: {
    gerarLista: (state, action) => {
      return action.payload; // lista de ingredientes faltando (objeto com nome e quantidade necessária)
    },
    limparLista: () => [],
  }
});

export const { gerarLista, limparLista } = listaMercadoSlice.actions;
export default listaMercadoSlice.reducer;