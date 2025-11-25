export interface CompaniesListProps {
  handlePage: (value: string) => void;
}

export interface AddCompanyProps {
  handlePage: (value: string) => void;
}

export interface CurrencyListProps {
  handlePage: (value: string) => void;
}

export interface AddCurrencyProps {
  handlePage: (value: string) => void;
}

export interface CurrencyProps {
  id: number;
  name: string;
  short_name: string;
}

export interface NewCurrencyProps {
  name: string;
  short_name: string;
}

export interface PaymentMethodListProps {
  handlePage: (value: string) => void;
}

export interface AddPaymentMethodProps {
  handlePage: (value: string) => void;
}

export interface PaymentMethodProps {
  id: number;
  name: string;
  description: string;
  period: string;
}

export interface NewPaymentMethodProps {
  name: string;
  description: string;
  period: string;
}

export interface CompaniesListOptionsProps {
  currency_options: CurrencyProps[];
  payment_method_options: PaymentMethodProps[];
}

export interface ReportsListProps {
  handlePage: (value: string) => void;
}

export interface AddReportProps {
  handlePage: (value: string) => void;
}

export interface UsersListProps {
  handlePage: (value: string) => void;
}

export interface AddUserProps {
  handlePage: (value: string) => void;
}

export interface RolesListProps {
  handlePage: (value: string) => void;
}

export interface AddRolesProps {
  handlePage: (value: string) => void;
}