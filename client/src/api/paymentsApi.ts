import axios from 'axios';
import { config } from '../config';

const { VITE_PUBLIC_API_URL } = config();

const paymentsApi = axios.create({
  baseURL: VITE_PUBLIC_API_URL,
});

export default paymentsApi;
