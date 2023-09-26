import Axios from 'axios';

export const httpMockClient = Axios.create({
  baseURL: '/data',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});
