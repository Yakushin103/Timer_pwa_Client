import { CurrencyProps, PaymentMethodProps } from "../pages/Settings";

export interface GetCompanyListResponse {
  success: boolean;
  data: CompanyProps[];
  message: string;
}

export interface CompanyProps {
  id: number;
  name: string;
  short_name: string;
  currency_id: number;
  currency_name: string;
  payment_method_id: number;
  payment_method_name: string;
  payment_method_period: string;
}

export interface GetCompanyStoreResponse {
  success: boolean;
  data: {
    currency_options: CurrencyProps[];
    payment_method_options: PaymentMethodProps[];
  };
  message: string;
}

export interface AddCompanyProps {
  name: string;
  short_name: string;
  currency_id: number;
  payment_method_id: number;
}

export interface AddCompanyResponse {
  success: boolean;
  message: string;
}

export interface DeleteCompanyResponse {
  success: boolean;
  message: string;
}
