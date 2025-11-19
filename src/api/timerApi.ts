import { instance } from "./instance";

import { DataProps } from "../modules/pages/Main";
import { AddTimeApiResponse, GetStoreApiResponse } from "../modules/api/Timer";

export async function addTimeApi(data: DataProps) {
  return await instance
    .post("/api/timer/add", {
      params: { ...data },
    })
    .then((response) => response.data as AddTimeApiResponse);
}

export async function getStoreApi(date: string) {
  console.log("111");

  return await instance
    .get("api/timer/store", {
      params: { date },
    })
    .then((response) => response.data as GetStoreApiResponse);
}
