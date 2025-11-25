export interface AddTimeApiResponse {
  success: boolean;
  message: string;
}

export interface GetStoreApiResponse {
  success: boolean;
  message: string;
  data: ItemStoreProps[];
  total_time: string;
}

export interface ItemStoreProps {
  company_id: number;
  day: string;
  hours: number;
  id: number;
  minutes: number;
  seconds: number;
}
