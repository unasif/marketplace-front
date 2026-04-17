import axios from 'axios';

const getDynamicBaseURL = () => {
  const path = window.location.pathname;

  if (path.startsWith('/testdevelopment')) {
    return '/testdevelopment/api/';
  }

  if (path.startsWith('/marketdemo')) {
    return '/marketdemo/api/';
  }

  return '/api/';
};

export const instance = axios.create({
  baseURL: getDynamicBaseURL(), 
  headers: {
    'Content-Type': 'application/json',
  },
});