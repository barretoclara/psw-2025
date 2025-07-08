import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  isAnyOf,
} from "@reduxjs/toolkit";
import baseUrl from '../../api/baseUrl';
import { httpGet, httpPost, httpPut, httpDelete } from "../../api/utils";

const categoriasAdapter = createEntityAdapter({
  selectId: (entity) => entity._id || entity.id
});

const initialState = categoriasAdapter.getInitialState({
  status: "idle",
  error: null,
});

export const fetchCategorias = createAsyncThunk(
  'categorias/fetchAll',
  async (userId) => {
    return httpGet(`${baseUrl}/categorias?userId=${userId}`);
  }
);

export const addCategoria = createAsyncThunk(
  'categorias/add',
  async (categoriaData, { getState }) => {
    const userId = getState().usuario.usuario?.id;
    return httpPost(`${baseUrl}/categorias`, { ...categoriaData, userId });
  }
);

export const updateCategoria = createAsyncThunk(
  'categorias/update',
  async (categoriaData) => {
    return httpPut(`${baseUrl}/categorias/${categoriaData._id || categoriaData.id}`, categoriaData);
  }
);

export const deleteCategoria = createAsyncThunk(
  'categorias/delete',
  async (id) => {
    await httpDelete(`${baseUrl}/categorias/${id}`);
    return id;
  }
);

const categoriasSlice = createSlice({
  name: "categorias",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategorias.fulfilled, (state, action) => {
        state.status = "succeeded";
        categoriasAdapter.setAll(state, action.payload);
      })
      .addCase(deleteCategoria.fulfilled, (state, action) => {
        state.status = "updated";
        categoriasAdapter.removeOne(state, action.payload);
      })
      .addMatcher(
        isAnyOf(addCategoria.fulfilled, updateCategoria.fulfilled),
        (state, action) => {
          state.status = "updated";
          categoriasAdapter.upsertOne(state, action.payload);
        }
      )
      .addMatcher(
        isAnyOf(
          fetchCategorias.pending,
          addCategoria.pending,
          updateCategoria.pending,
          deleteCategoria.pending
        ),
        (state) => {
          state.status = "loading";
        }
      )
      .addMatcher(
        isAnyOf(
          fetchCategorias.rejected,
          addCategoria.rejected,
          updateCategoria.rejected,
          deleteCategoria.rejected
        ),
        (state, action) => {
          state.status = "failed";
          state.error = action.error.message;
        }
      );
  },
});

export const {
  selectAll: selectAllCategorias,
  selectById: selectCategoriaById,
} = categoriasAdapter.getSelectors((state) => state.categorias);

export const selectCategoriasDoUsuario = (state) => {
  const userId = state.usuario.usuario?.id;
  if (!userId) return [];
  
  return Object.values(state.categorias.entities)
    .filter(c => c.userId === userId);
};

export default categoriasSlice.reducer;