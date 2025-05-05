import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8081/api',
    withCredentials: import.meta.env.VITE_USE_CREDENTIALS === 'true',
});

export default api;