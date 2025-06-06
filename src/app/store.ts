import type {
  Action,
  EnhancedStore,
  StoreEnhancer,
  ThunkAction,
  ThunkDispatch,
  Tuple,
  UnknownAction,
} from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

export type RootState = ReturnType<typeof store.getState>;

export const makeStore = (): EnhancedStore<
  unknown,
  UnknownAction,
  Tuple<
    [
      StoreEnhancer<{
        dispatch: ThunkDispatch<unknown, undefined, UnknownAction>;
      }>,
      StoreEnhancer,
    ]
  >
> => {
  const store = configureStore({
    reducer: {},
  });
  setupListeners(store.dispatch);
  return store;
};

export const store = makeStore();

export type AppStore = typeof store;
export type AppDispatch = AppStore['dispatch'];
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;
