import { configureStore } from "@reduxjs/toolkit";
import receitasReducer from "./slices/receitasSlice";
import estoqueReducer from "./slices/estoqueSlice";
import categoriasReducer from "./slices/categoriasSlice";
// slice de user e lista de mercado ainda pendente

export const store = configureStore({
  reducer: {
    receitas: receitasReducer,
    estoque: estoqueReducer,
    categorias: categoriasReducer,
  },
});