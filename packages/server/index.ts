import http from 'http';
import socketIo from 'socket.io';
import log from 'loglevel';

const server = http.createServer();
const io = socketIo(server);
const PORT = 4000;
enum EVENTS {
  NEW_CHAT_MESSAGE = 'NEW_CHAT_MESSAGE',
  EDIT_CHAT_MESSAGE = 'EDIT_CHAT_MESSAGE',
  DELETE_CHAT_MESSAGE = 'DELETE_CHAT_MESSAGE',
}

if (process.env.NODE_ENV === 'development') {
  log.setLevel(log.levels.DEBUG);
}

io.on('connection', (socket: SocketIO.Socket) => {
  log.debug(`Client ${socket.id} connected`);

  // Join a conversation
  const { roomId } = socket.handshake.query;
  socket.join(roomId);

  // Listen for new messages
  socket.on(EVENTS.NEW_CHAT_MESSAGE, (data) => {
    io.in(roomId).emit(EVENTS.NEW_CHAT_MESSAGE, data);
  });

  // Listen for deleted messages
  socket.on(EVENTS.DELETE_CHAT_MESSAGE, (data) => {
    io.in(roomId).emit(EVENTS.DELETE_CHAT_MESSAGE, data);
  });

  // Listen for edited messages
  socket.on(EVENTS.EDIT_CHAT_MESSAGE, (data) => {
    io.in(roomId).emit(EVENTS.EDIT_CHAT_MESSAGE, data);
  });

  // Leave the room if the user closes the socket
  socket.on('disconnect', () => {
    log.debug(`Client ${socket.id} diconnected`);
    socket.leave(roomId);
  });
});

server.listen(PORT, () => {
  log.debug(`Listening on port ${PORT}`);
});
