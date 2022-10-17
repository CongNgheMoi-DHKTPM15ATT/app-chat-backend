const { Server } = require('socket.io')
require('dotenv').config();

let io = new Server({
  cors: {
    origin: process.env.FRONTEND_URL,
    credentials: true
  }
})


const socketApi = {
  io: io
}

function getByValue(map, value) {
  for (let [key, value] of map.entries()) {
    if (value === value)
      return key;
  }
}

global._userOnlines = new Map();

const addUser = (userId, socketId) => {
  _userOnlines.set(userId, socketId);
};

const removeUser = (socketId) => {
  // _userOnlines.delete(getByValue(_userOnlines, socketId));
};

const getUser = (userId) => {
  return _userOnlines.get(userId);
};

io.on("connection", (socket) => {
  //when ceonnect
  console.log("a user connected.");

  global._io = socket;


  //take userId and socketId from user
  socket.on("addUser", (data) => {
    console.log("haha")
    const { senderId } = data;
    addUser(senderId, socket.id);
    console.log(senderId)
    console.log(_userOnlines.get(senderId))
    io.emit("getUsers", senderId);
  });

  socket.on('send', (data) => {
    const { senderId, receiverId, text } = data;
    const socketId = _userOnlines.get(receiverId);
    console.log(socketId)
    socket.to(socketId).emit("getMessage", {
      senderId,
    });
  })

  socket.on('sendFriendRequest', (data) => {
    const { senderId, receiverId } = data;
    const socketId = _userOnlines.get(receiverId);
    socket.to(socketId).emit("getFriendRequest", {
      senderId
    });
  })

  // when disconnect
  socket.on("disconnect", () => {
    console.log("a user disconnected!");
    removeUser(socket.id);
    io.emit("getUsers", _userOnlines);
  });
});

module.exports = socketApi;