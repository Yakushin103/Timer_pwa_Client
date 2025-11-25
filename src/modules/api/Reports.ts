export interface GetReportsStoreResponse {
  success: boolean;
  data: ReportDataProps[];
  min_date: string;
  max_date: string;
  total_hours: string;
  total_payout: string;
  message: string;
}

export interface ReportDataProps {
  company_id: number;
  company_name: string;
  create_date: string;
  end_date: string;
  id: number;
  is_payout: boolean;
  payout: string;
  payout_date: string | null;
  start_date: string;
}

export interface AddReportApiResponse {
  success: boolean;
  message: string;
}

export interface AddReportDataProps {
  start_date: string;
  end_date: string;
  payout: string;
  company_id: number;
  is_payout: boolean;
}

export interface DeleteReportProps {
  id: number;
  company_id: number;
  start_date: string;
  end_date: string;
}
