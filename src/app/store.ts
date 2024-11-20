import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "@app/features/counter/counterSlice";
import coinReducer from "@app/features/coin/coinSlice"

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    allCoin:coinReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
