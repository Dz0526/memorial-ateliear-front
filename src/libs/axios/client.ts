import axios from 'axios';

export const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_ORIGIN,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const authClient = (token: string) =>
  axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_ORIGIN,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

export const authClientForm = (token: string) =>
  axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_ORIGIN,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const clientForm = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_ORIGIN,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
});
