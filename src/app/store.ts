import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { photoAPI } from '../components/Photos/store/slices';

export const store = configureStore({
  reducer: {
    [photoAPI.reducerPath]: photoAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(photoAPI.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action
>;
