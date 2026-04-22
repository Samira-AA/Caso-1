import axios from 'axios';
import { environment } from '../../../environments/environment';

export const httpClient = axios.create({
  baseURL: environment.baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});
