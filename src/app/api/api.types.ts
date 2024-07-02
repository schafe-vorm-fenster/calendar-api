export interface ApiResponse {
  status: number;
}

export interface ApiResponseWithResult {
  status: 200 | 204 | 404;
}

export interface ApiResponseItem extends ApiResponseWithResult {
  data: any;
}

export interface ApiResponseList extends ApiResponseWithResult {
  results: number;
  // TODO: add paging
  data: any[];
}

export interface ApiErrorResponse extends ApiResponse {
  error: string; // error message
}
