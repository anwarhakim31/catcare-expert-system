export interface WebResponse<T> {
  success?: boolean;
  message?: string;
  data?: T;
}
