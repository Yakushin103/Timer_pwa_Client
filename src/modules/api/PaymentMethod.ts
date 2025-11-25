import { PaymentMethodProps } from "../pages/Settings";

export interface GetPaymentMethodStoreRespose {
  success: boolean;
  data: PaymentMethodProps[];
  message: string
}

export interface DeletePaymentMethodRespose {
  success: boolean;
  message: string;
}

export interface AddPaymentMethodRespose {
  success: boolean;
  message: string;
}