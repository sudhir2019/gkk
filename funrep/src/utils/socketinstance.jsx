import io from 'socket.io-client';

const socketinstance = "http://localhost:8081";
const socket = io(socketinstance, { withCredentials: true });
export default socket;