import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import heroesListReducer from "../pages/heroes-list/heroesListSlice";
import heroesCardReducer from "../pages/heroes-card/heroesCardSlice";

export const store = configureStore({
  reducer: {
    heroesList: heroesListReducer,
    heroesCard: heroesCardReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
