import { Server } from "socket.io";
import dotenv from "dotenv";
import Message from "../models/messageModel.js";

dotenv.config();

export const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL,
      credentials: true,
    },
  });

  const userSockets = new Map(); // Map to store user id and socket id
  const userActivities = new Map(); // Map to store user id and last seen activity

  io.on("connection", (socket) => {
    socket.on("user_connected", (userId) => {
      userSockets.set(userId, socket.id);
      userActivities.set(userId, "Idle");

      // Notify all connected clients of the new user
      io.emit("user_connected", userId);
      socket.emit("users_online", Array.from(userSockets.keys())); // Send the list of online users to the new user
      io.emit("activities", Array.from(userActivities.entries())); // Send the activities of all users to the new user
    });

    socket.on("update_activity", ({ userId, activity }) => {
      console.log("activity updated", userId, activity);
      userActivities.set(userId, activity);
      io.emit("activity_updated", { userId, activity });
    });

    socket.on("send_message", async (data) => {
      try {
        const { senderId, receiverId, content } = data;

        const message = await Message.create({
          senderId,
          receiverId,
          content,
        });

        // Get the receiver's socket id
        const receiverSocket = userSockets.get(receiverId);
        if (receiverSocket) {
          // Send the message to the receiver
          io.to(receiverSocket).emit("receive_message", message);
        }
        socket.emit("message_sent", message);
      } catch (error) {
        console.log(error);
        socket.emit("message_error", error.message);
      }
    });

    socket.on("disconnect", () => {
      let disconnectedUserId;
      for (const [userId, socketId] of userSockets.entries()) {
        if (socketId === socket.id) {
          disconnectedUserId = userId;
          userSockets.delete(userId);
          userActivities.delete(userId);
          break;
        }
      }
      if (disconnectedUserId) {
        io.emit("user_disconnected", disconnectedUserId);
      }
    });
  });
};
