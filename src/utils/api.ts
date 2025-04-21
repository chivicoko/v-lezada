import axios from 'axios';
import type { AxiosRequestConfig } from 'axios';

export const sendApiRequest = async <T>(
  method: 'post' | 'get' | 'put' | 'delete',
  url: string,
  data?: T,
  config?: AxiosRequestConfig
) => {
  try {
    const token = localStorage.getItem('auth_token');
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    };

    const response = await axios({
      method,
      url,
      data,
      headers,
      ...config,
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message =
        error.response?.data?.message || error.message || 'Something went wrong';
      throw new Error(message);
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
};
