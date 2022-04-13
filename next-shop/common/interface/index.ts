export interface IBasePagination {
  limit?: number;
  page?: number;
  sort?: string;
  order?: string;
}

export interface IBaseFilter {
  [key: string]: string | number | undefined;
}
