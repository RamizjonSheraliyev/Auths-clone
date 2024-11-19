import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { createServer } from "http";
import dotenv from 'dotenv';

// Routes imports
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import matchRoutes from "./routes/matchRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";

// MongoDB connection
import { connectDB } from "./config/db.js";

// Socket initialization
import { initializeSocket } from "./socket/socket.server.js";

// Load environment variables from .env file
dotenv.config();

// Create Express app
const app = express();

// Create HTTP server
const httpServer = createServer(app);

// Set the port
const PORT = process.env.PORT || 5001;

// Initialize socket.io
initializeSocket(httpServer);

// Middleware setup
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

// Define routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/matches", matchRoutes);
app.use("/api/messages", messageRoutes);

// Serve client build if in production
const __dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
  });
}

// Start the server and connect to MongoDB
httpServer.listen(PORT, () => {
  console.log(`Server started at port: ${PORT}`);
  connectDB();  // Connect to MongoDB
});
