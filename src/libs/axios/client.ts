import axios from 'axios';

export const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_ORIGIN,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});
