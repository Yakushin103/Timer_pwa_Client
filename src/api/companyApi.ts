import { instance } from "./instance";

import {
  AddCompanyProps,
  AddCompanyResponse,
  DeleteCompanyResponse,
  GetCompanyListResponse,
  GetCompanyStoreResponse,
} from "../modules/api/Company";

export async function getCompanyListApi() {
  return await instance
    .get("/api/company/list")
    .then((response) => response.data as GetCompanyListResponse);
}

export async function getCompanyStoreApi() {
  return await instance
    .get("/api/company/store")
    .then((response) => response.data as GetCompanyStoreResponse);
}

export async function addCompanyStoreApi(data: AddCompanyProps) {
  return await instance
    .post("/api/company/add", {
      params: { ...data },
    })
    .then((response) => response.data as AddCompanyResponse);
}

export async function deleteCompanyApi(id: number) {
  return await instance
    .delete("/api/company/delete", {
      params: { id },
    })
    .then((response) => response.data as DeleteCompanyResponse);
}
