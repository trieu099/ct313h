import axios from 'axios'
const url = import.meta.env.VITE_APP_API_URL;

export default () => {
  return axios.create({
    baseUrl: `${url}/api/books`,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
  })
}