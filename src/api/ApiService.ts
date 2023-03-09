import axios, { AxiosInstance } from 'axios';
import { httpConfig } from './httpConfig';

class ApiService {
  private axios: AxiosInstance;

  constructor() {
    this.axios = axios.create(httpConfig);
  }

  getReq(url: string) {
    return this.axios.get(url);
  }
  postReq(url: string, object:any) {
    return this.axios.post(url, object);
  }
}

export default new ApiService();
