import { instance } from "./instance";

import { GetCompanyStoreRespose } from "../modules/api/Company";

export async function getCompanyStoreApi() {
  return await instance
    .get("/api/company/store")
    .then((response) => response.data as GetCompanyStoreRespose);
}