import { API_EXAMPLE_GET, API_EXAMPLE_POST } from '@/constants';
import { IExampleData, IResponseWrapper } from '@/types';
import { apiService } from './request';

export const getExample = (params: { example: string }) => {
  return apiService.get<IResponseWrapper<IExampleData>>({
    apiName: API_EXAMPLE_GET,
    params,
  });
};

export const postExample = (params: { example: string }) => {
  return apiService.post<{
    example: string;
  }>({
    apiName: API_EXAMPLE_POST,
    params,
    abort: true,
    cache: {},
  });
};
