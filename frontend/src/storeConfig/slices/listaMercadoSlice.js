import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { selectCurrentUserId } from './usuarioSlice';

export const gerarListaMercado = createAsyncThunk(
  'listaMercado/gerar',
  async ({ receitasIds }, { getState }) => {
    const state = getState();
    const userId = selectCurrentUserId(state);

    const receitas = Object.values(state.receitas.entities)
      .filter(r => r.userId === userId && receitasIds.includes(r.id));

    const estoque = Object.values(state.estoque.entities)
      .filter(e => e.userId === userId);

    const normalizar = (texto) => texto.trim().toLowerCase();

    const ingredientesNecessarios = {};

    receitas.forEach(receita => {
      receita.ingredientes.forEach(ing => {
        const chave = `${normalizar(ing.nome)}|${normalizar(ing.unidade)}`;

        if (!ingredientesNecessarios[chave]) {
          ingredientesNecessarios[chave] = {
            nome: ing.nome,
            unidade: ing.unidade,
            quantidadeNecessaria: 0
          };
        }

        ingredientesNecessarios[chave].quantidadeNecessaria += ing.quantidade;
      });
    });

    Object.keys(ingredientesNecessarios).forEach(chave => {
      const { nome, unidade, quantidadeNecessaria } = ingredientesNecessarios[chave];

      const encontrado = estoque.find(e =>
        normalizar(e.nome) === normalizar(nome) &&
        normalizar(e.unidade) === normalizar(unidade)
      );

      const quantidadeEstoque = encontrado ? encontrado.quantidade : 0;
      const quantidadeFaltante = Math.max(quantidadeNecessaria - quantidadeEstoque, 0);

      ingredientesNecessarios[chave].quantidade = quantidadeFaltante;
    });

    const resultado = Object.values(ingredientesNecessarios)
      .filter(item => item.quantidade > 0)
      .map(item => ({
        nome: item.nome,
        unidade: item.unidade,
        quantidade: item.quantidade
      }));

    return resultado;
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