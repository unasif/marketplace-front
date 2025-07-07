import axios from 'axios';

export const instance = axios.create({
  baseURL: '/api/', // Базова URL-адреса API
  headers: {
    'Content-Type': 'application/json', // Заголовки, які ви хочете передати
  },
});