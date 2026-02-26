import { Server } from "socket.io";
import http from "http";
import express from "express";
import { socketAuthMiddleware } from "../middlewares/socketMiddleware.js";
import { getUserConversationsForSocketIO } from "../controllers/conversationController.js";

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    credentials: true,
  },
});

io.use(socketAuthMiddleware);

const onlineUsers = new Map(); // {userId: [socketId1, socketId2]}

io.on("connection", async (socket) => {
  const user = socket.user;
  const userId = user._id.toString();

  // console.log(`${user.displayName} online với socket ${socket.id}`);

  if (!onlineUsers.has(userId)) {
    onlineUsers.set(userId, []);
  }
  onlineUsers.get(userId).push(socket.id);

  io.emit("online-users", Array.from(onlineUsers.keys()));

  const conversationIds = await getUserConversationsForSocketIO(user._id);
  conversationIds.forEach((id) => {
    socket.join(id);
  });

  socket.on("join-conversation", (conversationId) => {
    socket.join(conversationId);
  });

  socket.join(userId);

  socket.on("disconnect", () => {
    const userSockets = onlineUsers.get(userId);
    if (userSockets) {
      const updatedSockets = userSockets.filter((id) => id !== socket.id);
      if (updatedSockets.length === 0) {
        onlineUsers.delete(userId);
      } else {
        onlineUsers.set(userId, updatedSockets);
      }
    }

    io.emit("online-users", Array.from(onlineUsers.keys()));
    /* console.log(`socket disconnected: ${socket.id}`); */
  });
});

export { io, app, server };
