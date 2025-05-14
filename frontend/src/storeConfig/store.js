import { configureStore } from "@reduxjs/toolkit";
import receitasReducer from "./slices/receitasSlice";
import estoqueReducer from "./slices/estoqueSlice";
import categoriasReducer from "./slices/categoriasSlice";
import usuarioReducer from "./slices/usuarioSlic";
import listaMercadoReducer from "./slices/listaMercadoSlice";

export const store = configureStore({
  reducer: {
    receitas: receitasReducer,
    estoque: estoqueReducer,
    categorias: categoriasReducer,
    usuario: usuarioReducer,
    listaMercado: listaMercadoReducer,
  },
});