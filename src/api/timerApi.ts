import { instance } from "./instance";

import { AddTimeDataProps, DataUpdatedProps } from "../modules/pages/Main";
import { AddTimeApiResponse, GetStoreApiResponse } from "../modules/api/Timer";

export async function addTimeApi(data: AddTimeDataProps) {
  return await instance
    .post("/api/timer/add", {
      params: { ...data },
    })
    .then((response) => response.data as AddTimeApiResponse);
}

export async function updatedTimeApi(data: DataUpdatedProps) {
  return await instance
    .put("/api/timer/updated", {
      params: { ...data },
    })
    .then((response) => response.data as AddTimeApiResponse);
}

export async function getStoreApi(date: string, company_id?: number) {
  return await instance
    .get("api/timer/store", {
      params: { date, company_id },
    })
    .then((response) => response.data as GetStoreApiResponse);
}

export async function deleteTimeApi(id: number) {
  return await instance
    .delete("api/timer/delete", {
      params: { id },
    })
    .then((response) => response.data as GetStoreApiResponse);
}
