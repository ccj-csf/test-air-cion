export interface IResponseWrapper<T = unknown> {
  code: number;
  data?: T;
  msg?: string;
  success: boolean;
}
