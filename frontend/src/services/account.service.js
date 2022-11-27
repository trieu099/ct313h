import Api from '@/services/api'
// const url = import.meta.env.VITE_APP_API_URL;

export default {
  register (credentials) {
    return Api().post('register', credentials)
  },
  login (credentials) {
    return Api().post('login', credentials)
  }
}