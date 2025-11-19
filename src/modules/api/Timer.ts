export interface AddTimeApiResponse {
  success: boolean;
}

export interface GetStoreApiResponse {
  success: boolean;
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
