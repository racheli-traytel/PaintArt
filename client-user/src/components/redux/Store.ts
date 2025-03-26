import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from './CategorySlice';
import drawingsReducer from './DrawingSlice';
import paintedDrawingsReducer from './PaintedDrawingsSlice';
import authReducer from './AuthSlice'
const Store = configureStore({
    reducer: {
        categories: categoriesReducer,
        drawings: drawingsReducer,
        paintedDrawings: paintedDrawingsReducer,
        auth:authReducer,
    },
});

export type RootStore = ReturnType<typeof Store.getState>
export type AppDispatch = typeof Store.dispatch
export default Store;