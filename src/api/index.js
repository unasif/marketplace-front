import axios from 'axios';

export const instance = axios.create({
  baseURL: '/marketdemo/api/', // Базова URL-адреса API
  headers: {
    'Content-Type': 'application/json', // Заголовки, які ви хочете передати
  },
});