import { instance } from "./instance";

import {
  AddRoleApiResponse,
  DataAddRoleProps,
  GetStoreApiResponse,
} from "../modules/api/Roles";

export async function getStoreApi() {
  return await instance
    .get("api/roles/store")
    .then((response) => response.data as GetStoreApiResponse);
}

export async function addRoleApi(data: DataAddRoleProps) {
  return await instance
    .post("/api/roles/add", {
      params: { ...data },
    })
    .then((response) => response.data as AddRoleApiResponse);
}

export async function deleteRoleApi(id: number) {
  return await instance
    .delete("api/roles/delete", {
      params: { id },
    })
    .then((response) => response.data as GetStoreApiResponse);
}
