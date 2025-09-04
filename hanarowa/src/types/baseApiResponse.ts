type BaseApiResponse<T> = {
  success: boolean;
  code: string;
  message: string;
  result: T;
};
export default BaseApiResponse;
