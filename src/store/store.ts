import {
  AnyAction,
  configureStore,
  Store,
  ThunkDispatch,
} from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
// import { thunk } from "redux-thunk";
import logger from 'redux-logger'
import { persistReducer } from "redux-persist";
// ...
import crmReducer from "./reducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["accessToken"],
};

const persistedReducer = persistReducer(persistConfig, crmReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (gDM) => gDM().concat(logger),
  // middleware: () => [],

  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppThunkDispatch = ThunkDispatch<RootState, any, AnyAction>;

export type AppStore = Omit<Store<RootState, AnyAction>, "dispatch"> & {
  dispatch: AppThunkDispatch;
};

// export const useAppDispatch = () => useDispatch<AppThunkDispatch>();
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
// export type AppDispatch = typeof store.dispatch;
