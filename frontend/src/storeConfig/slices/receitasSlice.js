import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  isAnyOf,
} from "@reduxjs/toolkit";
import baseUrl from '../../api/baseUrl';
import { httpGet, httpPost, httpPut, httpDelete } from "../../api/utils";

const receitasAdapter = createEntityAdapter({
  selectId: (entity) => entity._id || entity.id
});

const initialState = receitasAdapter.getInitialState({
  status: "idle",
  error: null,
  filtro: null,
});

export const fetchReceitas = createAsyncThunk(
  'receitas/fetchAll',
  async () => {
    return httpGet(`${baseUrl}/receitas`);
  }
);

export const addReceita = createAsyncThunk(
  'receitas/add',
  async (receitaData) => {
    return httpPost(`${baseUrl}/receitas`, {
      ...receitaData,
      tempo_preparo: Number(receitaData.tempo_preparo),
      ingredientes: receitaData.ingredientes.map(ing => ({
        ...ing,
        quantidade: Number(ing.quantidade)
      }))
    });
  }
);

export const updateReceita = createAsyncThunk(
  'receitas/update',
  async (receitaData) => {
    const { id, ...dados } = receitaData;
    return httpPut(`${baseUrl}/receitas/${id}`, {
      ...dados,
      tempo_preparo: Number(dados.tempo_preparo),
      ingredientes: dados.ingredientes?.map(ing => ({
        ...ing,
        quantidade: Number(ing.quantidade)
      }))
    });
  }
);

export const deleteReceita = createAsyncThunk(
  'receitas/delete',
  async (id) => {
    await httpDelete(`${baseUrl}/receitas/${id}`);
    return id;
  }
);

const receitasSlice = createSlice({
  name: "receitas",
  initialState,
  reducers: {
    setFiltro(state, action) {
      state.filtro = action.payload;
    }
  },
  extraReducers: (builder) => {
  builder
    .addCase(fetchReceitas.fulfilled, (state, action) => {
      state.status = "succeeded";
      const receitasComId = action.payload.map((r) => ({
        ...r,
        id: r._id,
      }));
      receitasAdapter.setAll(state, receitasComId);
    })
    .addCase(deleteReceita.fulfilled, (state, action) => {
      state.status = "updated";
      receitasAdapter.removeOne(state, action.payload);
    })
    .addMatcher(
      isAnyOf(addReceita.fulfilled, updateReceita.fulfilled),
      (state, action) => {
        state.status = "updated";
        const receitaComId = {
          ...action.payload,
          id: action.payload._id,
        };
        receitasAdapter.upsertOne(state, receitaComId);
      }
    )
    .addMatcher(
      isAnyOf(
        fetchReceitas.pending,
        addReceita.pending,
        updateReceita.pending,
        deleteReceita.pending
      ),
      (state) => {
        state.status = "loading";
      }
    )
    .addMatcher(
      isAnyOf(
        fetchReceitas.rejected,
        addReceita.rejected,
        updateReceita.rejected,
        deleteReceita.rejected
      ),
      (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      }
    );
},

});

export const {
  selectAll: selectAllReceitas,
  selectById: selectReceitaById,
} = receitasAdapter.getSelectors((state) => state.receitas);

export const selectReceitasDoUsuario = (state) => {
  const userId = state.usuario.usuario?.id;
  if (!userId) return [];
  
  return Object.values(state.receitas.entities)
    .filter(r => r.userId === userId);
};

export const selectReceitasPorCategoria = (state, categoriaId) => {
  return Object.values(state.receitas.entities).filter(
    receita => receita.categoriaId === categoriaId
  );
};

export const { setFiltro } = receitasSlice.actions;
export default receitasSlice.reducer;