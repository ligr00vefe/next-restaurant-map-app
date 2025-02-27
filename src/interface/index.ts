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

export interface ILocationType {
  lat?: number | null;
  lng?: number | null;
  zoom?: number;
}

export interface ISearchType {
  q?: string;
  district?: string;
}



export interface IStoreAllType {
  uc_seq: number;
  main_title: string;
  gugun_nm: string;
  lat: number;
  lng: number;
  bizcnd_code_nm: string;
  place: string;
  title: string;
  addr1: string;
  cntct_tel: string;
  usage_day_week_and_time: string;
  rprsntv_menu: string;
  main_img_normal: string;
  main_img_thumb: string;
  itemcntnts: string;
}
