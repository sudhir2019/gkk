import io from 'socket.io-client';

const socketinstance = import.meta.env.VITE_API_BASE_URL + "/api" || 'https://api.singhjyotiadmin.life/api';
const socket = io(socketinstance, { withCredentials: true });
export default socket;