import { AxiosRequestConfig } from 'axios';

export const httpConfig: AxiosRequestConfig = {
  baseURL: window['env'].API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
};
