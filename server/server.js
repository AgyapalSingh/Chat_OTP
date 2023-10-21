import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import session from "express-session";
import MongoStore from "connect-mongo";
// import messagesRoutes from "./routes/messagesRoutes.js";
// import profileRoutes from "./routes/profileRoutes.js";
// import settingsRoutes from "./routes/settingsRoutes.js"

import http from "http";
import { Server } from "socket.io";
import { setupSocket } from "./socket.js";


// Config
// 1. ENV
dotenv.config();

// 2. Database
connectDB();

// Rest Object
const app = express();
const server = http.createServer(app);
const io = new Server(server);
// Middleware
app.use(cors());
app.use(express.json());

app.use(
  session({
    name: "Chat",
    secret: process.env.JWT_SECRET,
    saveUninitialized: false,
    resave: false,
    withCredentials: true,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },

    store: MongoStore.create(
      {
        mongoUrl: process.env.MONGO_URL,
        autoRemove: "disabled",
      },

      function (err) {
        console.log(err || "connect-mongoDb setup ok");
      }
    ),
  })
);

// Routes
// When /auth is called the authRoutes will be called
app.use("/api/v1/auth", authRoutes);
// app.use("/api/v1/profile", profileRoutes);
// app.use("/api/v1/messages", messagesRoutes);
// app.use("/api/v1/settings", settingsRoutes);

setupSocket(io);

// Rest API
app.get("/", (req, res) => {
  res.send("<h1>WelCome to Chat</h1>");
});

// PORT
const PORT = process.env.PORT;

// Run (Listen) the app
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
