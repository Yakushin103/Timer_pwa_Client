import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { UserProps } from "../modules/store/Reducer";

// Define a type for the slice state
export interface StoreState {
  accessToken: string | null;
  user: UserProps | null;
  page: string;
}

// Define the initial state using that type
const initialState: StoreState = {
  accessToken: null,
  user: null,
  page: "",
};

export const counterSlice = createSlice({
  name: "crm",
  initialState,
  reducers: {
    setAccessToken: (store, action: PayloadAction<string | null>) => {
      store.accessToken = action.payload;
    },
    setUser: (store, action: PayloadAction<UserProps | null>) => {
      store.user = action.payload;
    },
    setPage: (store, action: PayloadAction<string>) => {
      store.page = action.payload;
    },
  },
});

export const { setAccessToken, setUser, setPage } = counterSlice.actions;

export default counterSlice.reducer;
