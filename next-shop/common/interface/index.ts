export interface IBasePagination {
  limit?: number;
  page?: number;
}

export interface IBaseFilter {
  [key: string]: string | number | undefined;
}
