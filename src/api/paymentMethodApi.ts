import { instance } from "./instance";

import {
  AddPaymentMethodRespose,
  DeletePaymentMethodRespose,
  GetPaymentMethodStoreRespose,
} from "../modules/api/PaymentMethod";
import {
  NewPaymentMethodProps,
  PaymentMethodProps,
} from "../modules/pages/Settings";

export async function getPaymentMethodStoreApi() {
  return await instance
    .get("/api/payment_method/store")
    .then((response) => response.data as GetPaymentMethodStoreRespose);
}

export async function deletePaymentMethodApi(id: number) {
  return await instance
    .delete("/api/payment_method/delete", {
      params: { id },
    })
    .then((response) => response.data as DeletePaymentMethodRespose);
}

export async function editPaymentMethodApi(data: PaymentMethodProps) {
  return await instance
    .put("/api/payment_method/edit", {
      params: data,
    })
    .then((response) => response.data as DeletePaymentMethodRespose);
}

export async function addPaymentMethodApi(data: NewPaymentMethodProps) {
  return await instance
    .post("/api/payment_method/add", {
      params: data,
    })
    .then((response) => response.data as AddPaymentMethodRespose);
}
