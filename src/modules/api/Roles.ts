export interface GetStoreApiResponse {
  success: boolean;
  data: StoreDataItem[];
  total_time: string;
}

export interface StoreDataItem {
  created_at: string;
  created_by: string;
  name: string;
  short_name: string;
  id: number;
  updated_at: string;
  updated_by: string;
  created_by_name: string;
  updated_by_name: string;
}

export interface DataAddRoleProps {
  name: string;
  short_name: string;
}

export interface AddRoleApiResponse {
  success: boolean;
  message: string;
}
