import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from './CategorySlice';
import drawingsReducer from './DrawingSlice';
import paintedDrawingsReducer from './PaintedDrawingsSlice';
import authReducer from './AuthSlice'
import popularDrawingsReducer from './MyMostPopular'
import deletedPaintedDrawingsReducer from './DeletedPaintedDrawingsSlice'
import chatReducer from './ChatSlice'
const Store = configureStore({
    reducer: {
        categories: categoriesReducer,
        drawings: drawingsReducer,
        paintedDrawings: paintedDrawingsReducer,
        auth:authReducer,
        popularDrawings:popularDrawingsReducer,
        deletedPaintedDrawings:deletedPaintedDrawingsReducer,
        chat:chatReducer
    },
});

export type RootStore = ReturnType<typeof Store.getState>
export type AppDispatch = typeof Store.dispatch
export default Store;