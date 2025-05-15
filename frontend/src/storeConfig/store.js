import { configureStore } from "@reduxjs/toolkit";
import receitasReducer from "./slices/receitasSlice";
import estoqueReducer from "./slices/estoqueSlice";
import categoriasReducer from "./slices/categoriasSlice";
import usuarioReducer from "./slices/usuarioSlice";
import listaMercadoReducer from "./slices/listaMercadoSlice";

const usuarioMiddleware = store => next => action => {
  const state = store.getState();
  const userId = state.usuario.usuario?.id;
  
  if (userId && action.type.endsWith('/pending')) {
    if (action.meta?.arg?.userId === undefined) {
      if (typeof action.meta.arg === 'object') {
        action.meta.arg = { ...action.meta.arg, userId };
      }
    }
  }
  
  return next(action);
};

export const store = configureStore({
  reducer: {
    receitas: receitasReducer,
    estoque: estoqueReducer,
    categorias: categoriasReducer,
    usuario: usuarioReducer,
    listaMercado: listaMercadoReducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(usuarioMiddleware)
});
