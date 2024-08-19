import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import http from "http";
import { Server } from "socket.io";
import Message from "./models/Message.js";  
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import messageRoutes from "./routes/message.js";

/* CONFIGURATIONS */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());

/* SOCKET.IO SETUP */
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});


/* ROUTES */
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/message", messageRoutes);

/* SOCKET.IO CONNECTION HANDLER */
io.on("connection", (socket) => {
  console.log("A user connected");

  // Join a user to a specific chat room
  socket.on("join chat", (roomId) => {
    socket.join(roomId);
    console.log(`User joined room: ${roomId}`);
  });

  // Handle receiving and broadcasting a new message
  socket.on("new message", async (messageData) => {
    try {
      // Save message to database
      const message = new Message(messageData);
      await message.save();

      // Broadcast message to the specific room
      io.to(messageData.receiver).emit("message received", message);
    } catch (error) {
      console.error("Error saving or sending message:", error);
    }
  });

  // Handle user disconnecting
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});


/* MONGOOSE SETUP */
const PORT = process.env.PORT || 6001;
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    server.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));
