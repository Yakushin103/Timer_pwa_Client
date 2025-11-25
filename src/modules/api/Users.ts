export interface GetStoreApiResponse {
  success: boolean;
  data: StoreDataItem[];
  total_time: string;
  message: string;
}

export interface StoreDataItem {
  created_at: string;
  created_by: string;
  first_name: string;
  id: number;
  last_name: string;
  login: string;
  role: string;
  updated_at: string;
  updated_by: string;
}

export interface DataAddUserProps {
  first_name: string;
  last_name: string;
  login: string;
  password: string;
  role_id: number;
}

export interface AddUserApiResponse {
  success: boolean;
  message: string;
}

export interface SingInDataProps {
  login: string;
  password: string;
}

export interface SingInApiResponse {
  success: boolean;
  token: string;
  message: string;
}
