import { instance } from "./instance";

import {
  AddUserApiResponse,
  DataAddUserProps,
  GetStoreApiResponse,
} from "../modules/api/Users";

export async function getStoreApi() {
  return await instance
    .get("api/users/store")
    .then((response) => response.data as GetStoreApiResponse);
}

export async function addUserApi(data: DataAddUserProps) {
  return await instance
    .post("/api/users/add", {
      params: { ...data },
    })
    .then((response) => response.data as AddUserApiResponse);
}

export async function deleteUserApi(id: number) {
  return await instance
    .delete("api/users/delete", {
      params: { id },
    })
    .then((response) => response.data as GetStoreApiResponse);
}