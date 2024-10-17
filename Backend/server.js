const express = require("express");
const dotenv = require("dotenv");

const cors = require("cors");
const http = require("http"); // HTTP module to create the server
const socketIO = require("socket.io"); // Socket.io for real-time collaboration
const socketHandler = require("./socket/socket"); // Socket event handlers
const authRoutes = require("./routes/authRoutes");
const documentRoutes = require("./routes/documentRoutes");
const connectDB = require("./config/db");

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

// Initialize the app
const app = express();
// Create an HTTP server with the Express app
const server = http.createServer(app);

// Initialize Socket.io with the HTTP server
const io = socketIO(server);

// Pass the socket.io instance to your socket handlers
socketHandler(io); // Handle socket events for real-time collaboration

// Middleware
app.use(cors());
app.use(express.json());

// Define routes
app.use("/api/auth", authRoutes); // Routes for user authentication
app.use("/api/documents", documentRoutes); // Routes for document-related operations

// Define the PORT
const PORT = process.env.PORT || 5050;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
