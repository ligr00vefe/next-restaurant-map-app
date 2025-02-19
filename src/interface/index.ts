export interface IStoreType {
  id:           number;
  phone?:       string | null;
  gugun?:       string | null;
  address?:     string | null;
  lat?:         number | null;
  lng?:         number | null;
  name?:        string | null;
  category?:    string | null;
  menu?:        string | null;
  description?: string | null;
}

export interface IStoreApiResponse {
  page?: number;
  data: IStoreType[];
  totalPage?: number;
  totalCount?: number;
}