import axios from 'axios';

const api = axios.create({
    // baseURL:  'https://api.singhjyotiadmin.life/api',
    baseURL: "http://localhost:8081/api",
    withCredentials: import.meta.env.VITE_USE_CREDENTIALS === 'true',
});


export default api;