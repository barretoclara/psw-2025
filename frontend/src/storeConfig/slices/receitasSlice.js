import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  isAnyOf,
} from "@reduxjs/toolkit";
import baseUrl from "../../api/baseUrl";
import { httpGet, httpPost, httpPut, httpDelete } from "../../api/utils";

const receitasAdapter = createEntityAdapter();

const initialState = receitasAdapter.getInitialState({
  status: "idle",
  error: null,
});

export const fetchReceitas = createAsyncThunk("receitas/fetchAll", async () => {
  return httpGet(`${baseUrl}/receitas`);
});

export const addReceita = createAsyncThunk("receitas/add", async (novaReceita) => {
  return httpPost(`${baseUrl}/receitas`, novaReceita);
});

export const updateReceita = createAsyncThunk("receitas/update", async (receita) => {
  return httpPut(`${baseUrl}/receitas/${receita.id}`, receita);
});

export const deleteReceita = createAsyncThunk("receitas/delete", async (id) => {
  await httpDelete(`${baseUrl}/receitas/${id}`);
  return id;
});

const receitasSlice = createSlice({
  name: "receitas",
  initialState,
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
  selectIds: selectReceitaIds,
} = receitasAdapter.getSelectors((state) => state.receitas);

export default receitasSlice.reducer;