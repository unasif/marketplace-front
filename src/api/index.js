import axios from 'axios';

/*const getBaseUrl = () => {
  if (window.location.pathname.startsWith('/marketdemo')) {
      return '/marketdemo/api/';
  }
  return '/api/';
};*/

export const instance = axios.create({
  baseURL: "/api/", // Базова URL-адреса API
  headers: {
    'Content-Type': 'application/json', // Заголовки, які ви хочете передати
  },
});