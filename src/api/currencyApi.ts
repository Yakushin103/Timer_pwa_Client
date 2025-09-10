import { instance } from "./instance";

import {
  AddCurrencyRespose,
  DeleteCurrencyRespose,
  GetCurrencyStoreRespose,
} from "../modules/api/Currency";
import { CurrencyProps, NewCurrencyProps } from "../modules/pages/Settings";

export async function getCurrencyStoreApi() {
  return await instance
    .get("/api/currency/store")
    .then((response) => response.data as GetCurrencyStoreRespose);
}

export async function deleteCurrencyApi(id: number) {
  return await instance
    .delete("/api/currency/delete", {
      params: { id },
    })
    .then((response) => response.data as DeleteCurrencyRespose);
}

export async function editCurrencyApi(data: CurrencyProps) {
  return await instance
    .put("/api/currency/edit", {
      params: data,
    })
    .then((response) => response.data as DeleteCurrencyRespose);
}

export async function addCurrencyApi(data: NewCurrencyProps) {
  return await instance
    .post("/api/currency/add", {
      params: data,
    })
    .then((response) => response.data as AddCurrencyRespose);
}
