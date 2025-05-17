import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  isAnyOf,
} from "@reduxjs/toolkit";
import { baseUrl } from '../../api/baseUrl';
import { httpGet, httpPost, httpPut, httpDelete } from "../../api/utils";

const receitasAdapter = createEntityAdapter();

const initialState = receitasAdapter.getInitialState({
  status: "idle",
  error: null,
  filtro: null,
});

export const fetchReceitas = createAsyncThunk(
  'receitas/fetchAll',
  async (userId) => {
    return httpGet(`${baseUrl}/receitas?userId=${userId}`);
  }
);

export const addReceita = createAsyncThunk(
  'receitas/add',
  async ({ receitaData, userId }) => {
    return httpPost(`${baseUrl}/receitas`, { ...receitaData, userId });
  }
);

export const updateReceita = createAsyncThunk(
  'receitas/update',
  async ({ receitaData, userId }) => {
    return httpPut(`${baseUrl}/receitas/${receitaData.id}`, { ...receitaData, userId });
  }
);

export const deleteReceita = createAsyncThunk(
  'receitas/delete',
  async ({ id, userId }) => {
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
        receitasAdapter.setAll(state, action.payload);
      })
      .addCase(deleteReceita.fulfilled, (state, action) => {
        state.status = "updated";
        receitasAdapter.removeOne(state, action.payload);
      })
      .addMatcher(
        isAnyOf(addReceita.fulfilled, updateReceita.fulfilled),
        (state, action) => {
          state.status = "updated";
          receitasAdapter.upsertOne(state, action.payload);
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

export const { setFiltro } = receitasSlice.actions;
export default receitasSlice.reducer;