import { instance } from "./instance";

import {
  AddUserApiResponse,
  DataAddUserProps,
  GetStoreApiResponse,
  SingInApiResponse,
  SingInDataProps,
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

export async function singInApi(data: SingInDataProps) {
  return await instance
    .post("/api/users/sing_in", {
      params: { ...data },
    })
    .then((response) => {
      if (response.data.success) {
        instance.defaults.headers.common = {
          Authorization: `Bearer ${response.data.token}`,
        };
      }

      return response.data as SingInApiResponse;
    });
}
