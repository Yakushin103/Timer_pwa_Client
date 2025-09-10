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
