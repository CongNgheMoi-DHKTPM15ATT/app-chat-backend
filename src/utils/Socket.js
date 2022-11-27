const { Server } = require("socket.io");
const uuid = require("uuid");
require("dotenv").config();

let io = new Server({
  cors: {
    origin: process.env.FRONTEND_URL,
    credentials: true,
  },
});

const socketApi = {
  io: io,
};

global._userOnlines = new Map();
global._userCall = new Map();

const addUser = (userId, socket) => {
  var tmp = _userOnlines.get(userId);
  if (tmp) {
    socket.join(tmp);
  } else {
    const roomId = uuid.v4();
    socket.join(roomId);
    _userOnlines.set(userId, roomId);
  }
};

io.on("connection", (socket) => {
  global._io = socket;

  socket.on("addGroup", (data) => {
    const { senderId, groups } = data;
    groups.map((group) => {
      addUser(group.receiver._id, socket);
      console.log(group._id);
    });
  });

  socket.on("addUser", (data) => {
    const { senderId } = data;
    addUser(senderId, socket);
    console.log(_userOnlines);
  });

  socket.on("load_list_search", (sender_id) => {
    socket.emit("load_list_search");
    socket.to(_userOnlines.get(sender_id)).emit("load_list_search");
  });

  socket.on("loadConver", (sender_id) => {
    socket.emit("load-conver");
    socket.to(_userOnlines.get(sender_id)).emit("load-conver");
  });

  socket.on("load_message", (data) => {
    const { sender_id, conversation, receiverId } = data;
    socket.emit("load-conver");
    socket.to(_userOnlines.get(sender_id)).emit("load-conver");
    socket.emit("load_message", { conversation });
    socket
      .to(_userOnlines.get(sender_id))
      .emit("load_message", { conversation });

    socket.to(_userOnlines.get(receiverId)).emit("load-conver");
    socket
      .to(_userOnlines.get(receiverId))
      .emit("load_message_receiver", { conversation });
  });

  socket.on("requestLoadConver", (data) => {
    const { user } = data;
    user.map((u) => {
      const id = _userOnlines.get(u);
      if (id) socket.to(id).emit("load-conver");
    });
  });

  socket.on("send", (data) => {
    const { senderId, receiverId, text, nick_name, avatar, content_type, _id } =
      data;
    const socketId = _userOnlines.get(receiverId);
    socket.emit("load-conver");
    socket.to(_userOnlines.get(senderId)).emit("load-conver");
    if (socketId) {
      socket.to(socketId).emit("getMessage", {
        senderId,
        text,
        nick_name,
        receiverId,
        avatar,
        content_type,
        _id,
      });
      socket.to(_userOnlines.get(senderId)).emit("getMessage", {
        senderId,
        text,
        nick_name,
        receiverId,
        avatar,
        content_type,
        _id,
      });
    }
  });

  socket.on("sendFiles", (data) => {
    const { senderId, receiverId, files } = data;
    console.log("files: " + JSON.parse(files));
    const socketId = _userOnlines.get(receiverId);
    socket.emit("load-conver");
    socket.to(socketId).emit("getFiles", {
      files,
    });
  });

  socket.on("sendFriendRequest", (data) => {
    const { senderId, receiverId } = data;
    const socketId = _userOnlines.get(receiverId);
    socket.to(socketId).emit("getFriendRequest", {
      senderId,
    });
  });

  socket.on("acceptFriendRequest", (data) => {
    const { senderId, receiverId } = data;
    const socketId = _userOnlines.get(receiverId);
    socket.to(socketId).emit("getFriendResponse", {
      senderId,
      msg: `${senderId} accept you`,
    });
  });

  socket.on("deniedFriendRequest", (data) => {
    const { senderId, receiverId } = data;
    const socketId = _userOnlines.get(receiverId);
    socket.to(socketId).emit("getFriendResponse", {
      senderId,
      msg: `${senderId} denied you`,
    });
  });

  socket.on("callUser", (data) => {
    const { senderId, receiverId, sender_name, receiver_name, signalData } =
      data;
    const socketId = _userOnlines.get(receiverId);
    console.log(signalData);
    io.to(socketId).emit("request_video_call", {
      senderId: senderId,
      sender_name: sender_name,
      receiver_name: receiver_name,
      receiverId: receiverId,
    });
    socket.on("connect_video_call", () => {
      io.to(socketId).emit("callUser", {
        signal: signalData,
        from: senderId,
        name: sender_name,
      });
    });
  });

  socket.on("accept_video_call", (senderId) => {
    const socketId = _userOnlines.get(senderId);
    io.to(socketId).emit("connect_video_call", { status: "notification" });
    socket.on("answerCall", (data) => {
      const socketId = _userOnlines.get(data.to);
      io.to(socketId).emit("callAccepted", data.signal);
    });
  });

  // when disconnect
  socket.on("disconnect", (socket) => {
    console.log("a user " + socket.id + " disconnected!");
    io.emit("getUsers", _userOnlines);
  });
});

module.exports = socketApi;
