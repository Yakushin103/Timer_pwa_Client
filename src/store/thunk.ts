import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCompanyListApi } from "../api/companyApi";

// import { httpClientUpdate } from "../funcs";

import { setAccessToken, setCompanies, setUser } from "./reducer";

type ArgProps = {
  accessToken: string | null;
};

// signOut
export const signOut = createAsyncThunk(
  "user/signOut",
  async (arg: ArgProps, { dispatch }) => {
    try {
      // let response = await httpClientUpdate.post("/logout");
      // if (response.status === 200) {
      //   delete httpClientUpdate.defaults.headers["Authorization"];
      //   dispatch(setUser(null));
      //   dispatch(setAccessToken(null));
      // }
    } catch (error) {
      // delete httpClientUpdate.defaults.headers["Authorization"];
      dispatch(setUser(null));
      dispatch(setAccessToken(null));
    }
  }
);

export const updatedCompanyListThunk = createAsyncThunk(
  "company/updated",
  async (arg: '', { dispatch }) => {
    try {
      const { success, data } = await getCompanyListApi();

      if (success) {
        dispatch(setCompanies(data));
      }
    } catch (error) {
      dispatch(setCompanies([]));
    }
  }
);
