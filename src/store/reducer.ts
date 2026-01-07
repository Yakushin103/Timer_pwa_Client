import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { TimerProps, UserProps } from "../modules/store/Reducer";
import { CompanyProps } from "../modules/api/Company";

// Define a type for the slice state
export interface StoreState {
  accessToken: string | null;
  user: UserProps | null;
  page: string;
  companies: CompanyProps[];
  selectedCompany: number;
  start_time: null | string;
  loading: boolean;
  timer: TimerProps | null;
}

// Define the initial state using that type
const initialState: StoreState = {
  accessToken: null,
  user: null,
  page: "",
  companies: [],
  loading: false,
  selectedCompany: 0,
  start_time: null,
  timer: null,
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
    setCompanies: (store, action: PayloadAction<CompanyProps[]>) => {
      store.companies = action.payload;
    },
    setSelectedCompany: (store, action: PayloadAction<number>) => {
      store.selectedCompany = action.payload;
    },
    setStartTime: (store, action: PayloadAction<string | null>) => {
      store.start_time = action.payload;
    },
    setLoading: (store, action: PayloadAction<boolean>) => {
      store.loading = action.payload;
    },
    setTimer: (store, action: PayloadAction<TimerProps | null>) => {
      store.timer = action.payload;
    },
  },
});

export const {
  setAccessToken,
  setUser,
  setPage,
  setCompanies,
  setSelectedCompany,
  setStartTime,
  setLoading,
  setTimer,
} = counterSlice.actions;

export default counterSlice.reducer;
