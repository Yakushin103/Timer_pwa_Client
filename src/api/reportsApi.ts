import { instance } from "./instance";

import {
  AddReportApiResponse,
  AddReportDataProps,
  DeleteReportProps,
  GetReportsStoreResponse,
} from "../modules/api/Reports";

export async function getReportsStoreApi() {
  return await instance
    .get("/api/reports/store")
    .then((response) => response.data as GetReportsStoreResponse);
}

export async function getReportSettingsStoreApi(
  company_id: number,
  start_date?: string,
  end_date?: string
) {
  return await instance
    .get("/api/reports/settings", {
      params: { company_id, start_date, end_date },
    })
    .then((response) => response.data as GetReportsStoreResponse);
}

export async function addReportApi(data: AddReportDataProps) {
  return await instance
    .post("/api/reports/add", {
      params: { ...data },
    })
    .then((response) => response.data as AddReportApiResponse);
}

export async function deleteReportApi(data: DeleteReportProps) {
  return await instance
    .delete("api/reports/delete", {
      params: { ...data },
    })
    .then((response) => response.data as AddReportApiResponse);
}

export async function payReportApi(id: number) {
  return await instance
    .put("/api/reports/pay", {
      params: { id },
    })
    .then((response) => response.data as AddReportApiResponse);
}
