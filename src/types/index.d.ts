interface IAPIResponse<ResponseData = any> {
  status: string;
  payload: ResponseData;
  message: string;
}
