import io from 'socket.io-client';
// const socketinstance = "https://api.singhjyotiadmin.life";
const socketinstance = "http://localhost:8081";
const socket = io(socketinstance, {
  withCredentials: true,
  transports: ['websocket'], // ✅ correctly placed
//   autoConnect: false, // important!
});

export default socket;
