export interface ApiResponse<T> {
  data: T;
  pading: Paging;
}

export interface Paging {
  total: number;
  page: number;
  limit: number;
  totalPage: number;
}
