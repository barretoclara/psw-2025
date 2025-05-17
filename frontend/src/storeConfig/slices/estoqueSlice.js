import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  isAnyOf,
} from "@reduxjs/toolkit";
import { baseUrl } from '../api/baseUrl';
import { httpGet, httpPost, httpPut, httpDelete } from "../api/utils";

const estoqueAdapter = createEntityAdapter();

const initialState = estoqueAdapter.getInitialState({
  status: "idle",
  error: null,
});

export const fetchEstoque = createAsyncThunk(
  'estoque/fetchAll',
  async (userId) => {
    return httpGet(`${baseUrl}/estoque?userId=${userId}`);
  }
);

export const addEstoqueItem = createAsyncThunk(
  'estoque/add',
  async ({ itemData, userId }) => {
    return httpPost(`${baseUrl}/estoque`, { ...itemData, userId });
  }
);

export const updateEstoqueItem = createAsyncThunk(
  'estoque/update',
  async ({ itemData, userId }) => {
    return httpPut(`${baseUrl}/estoque/${itemData.id}`, { ...itemData, userId });
  }
);

export const deleteEstoqueItem = createAsyncThunk(
  'estoque/delete',
  async ({ id, userId }) => {
    await httpDelete(`${baseUrl}/estoque/${id}`);
    return id;
  }
);

const estoqueSlice = createSlice({
  name: "estoque",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchEstoque.fulfilled, (state, action) => {
        state.status = "succeeded";
        estoqueAdapter.setAll(state, action.payload);
      })
      .addCase(deleteEstoqueItem.fulfilled, (state, action) => {
        state.status = "updated";
        estoqueAdapter.removeOne(state, action.payload);
      })
      .addMatcher(
        isAnyOf(addEstoqueItem.fulfilled, updateEstoqueItem.fulfilled),
        (state, action) => {
          state.status = "updated";
          estoqueAdapter.upsertOne(state, action.payload);
        }
      )
      .addMatcher(
        isAnyOf(
          fetchEstoque.pending,
          addEstoqueItem.pending,
          updateEstoqueItem.pending,
          deleteEstoqueItem.pending
        ),
        (state) => {
          state.status = "loading";
        }
      )
      .addMatcher(
        isAnyOf(
          fetchEstoque.rejected,
          addEstoqueItem.rejected,
          updateEstoqueItem.rejected,
          deleteEstoqueItem.rejected
        ),
        (state, action) => {
          state.status = "failed";
          state.error = action.error.message;
        }
      );
  },
});

export const {
  selectAll: selectAllEstoque,
  selectById: selectEstoqueById,
} = estoqueAdapter.getSelectors((state) => state.estoque);

export default estoqueSlice.reducer;