import { createAsyncThunk } from "@reduxjs/toolkit";

// import { httpClientUpdate } from "../funcs";

import {
  setAccessToken,
  setUser,
} from "./reducer";

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
