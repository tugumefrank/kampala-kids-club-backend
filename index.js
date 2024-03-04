import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
const app = express();
import connectDb from "./config/db.js";
import bodyParser from "body-parser";
import { errorHandler } from "./middleware/errorMiddleware.js";
const PORT = process.env.PORT;
import { EventEmitter } from "events";
const eventEmitter = new EventEmitter();

// connectDb();
//middleware

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.text({ type: "text/*" }));

//Routes
import userRoutes from "./routes/userRoutes.js";
import { connected } from "process";
app.use("/users", userRoutes);
app.use("/", userRoutes);
// SSE route
app.get("/events", (req, res) => {
  console.log("SSE route");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  const sendEvent = (message) => {
    const data = JSON.stringify(message);
    res.write(`data: ${data}\n\n`);
  };

  eventEmitter.on("message", sendEvent);

  req.on("close", () => {
    eventEmitter.removeListener("message", sendEvent);
  });
});
// POST route to receive message and emit it
app.post("/message", (req, res) => {
  const message = req.body.message;
  console.log("message", message);
  eventEmitter.emit("message", message);
  res.status(200).send("Message sent");
});
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
