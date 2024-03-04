import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { errorHandler } from "./middleware/errorMiddleware.js";
import userRoutes from "./routes/userRoutes.js";
import { createRequire } from "module"; // Bring in the ability to create the 'require' method

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

//middleware
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.text({ type: "text/*" }));

//Routes
app.use("/users", userRoutes);
app.use("/", userRoutes);

// POST route to receive message and emit it
app.post("/message", (req, res) => {
  const message = req.body.message;
  console.log("message", message);
  // Broadcast the message to all connected clients
  wss.clients.forEach((client) => {
    client.send(JSON.stringify(message));
  });
  res.status(200).send("Message sent");
});

app.use(errorHandler);

const server = app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});

// WebSocket server
const require = createRequire(import.meta.url); // Create a 'require' method
const WebSocket = require("ws"); // Use the created 'require' method
const wss = new WebSocket.Server({ noServer: true });

wss.on("connection", (ws) => {
  console.log("Client connected");
  ws.on("close", () => console.log("Client disconnected"));
});

server.on("upgrade", function upgrade(request, socket, head) {
  wss.handleUpgrade(request, socket, head, function done(ws) {
    wss.emit("connection", ws, request);
  });
});
