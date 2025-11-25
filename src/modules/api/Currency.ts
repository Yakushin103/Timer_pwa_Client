import { CurrencyProps } from "../pages/Settings";

export interface GetCurrencyStoreRespose {
  success: boolean;
  data: CurrencyProps[];
  message: string;
}

export interface DeleteCurrencyRespose {
  success: boolean;
  message: string;
}

export interface AddCurrencyRespose {
  success: boolean;
  message: string;
}
