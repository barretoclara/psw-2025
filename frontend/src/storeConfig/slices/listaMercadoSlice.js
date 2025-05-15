import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { selectAllReceitas } from './receitasSlice';
import { selectAllEstoque } from './estoqueSlice';

export const gerarListaMercado = createAsyncThunk(
  'listaMercado/gerar',
  async (receitasIds, { getState }) => {
    const state = getState();
    const receitas = selectAllReceitas(state);
    const estoque = selectAllEstoque(state);
    
    const receitasSelecionadas = receitas.filter(r => receitasIds.includes(r.id));
    
    const ingredientesNecessarios = {};
    
    receitasSelecionadas.forEach(receita => {
      receita.ingredientes.forEach(ing => {
        const estoqueItem = estoque.find(e => e.id === ing.id);
        const quantidadeNecessaria = ing.quantidade - (estoqueItem?.quantidade || 0);
        
        if (quantidadeNecessaria > 0) {
          if (!ingredientesNecessarios[ing.id]) {
            ingredientesNecessarios[ing.id] = {
              ...ing,
              quantidade: quantidadeNecessaria
            };
          } else {
            ingredientesNecessarios[ing.id].quantidade += quantidadeNecessaria;
          }
        }
      });
    });
    
    return Object.values(ingredientesNecessarios);
  }
);

const listaMercadoSlice = createSlice({
  name: 'listaMercado',
  initialState: {
    items: [],
    status: 'idle',
    error: null
  },
  reducers: {
    limparLista: (state) => {
      state.items = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(gerarListaMercado.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(gerarListaMercado.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(gerarListaMercado.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export const { limparLista } = listaMercadoSlice.actions;
export default listaMercadoSlice.reducer;