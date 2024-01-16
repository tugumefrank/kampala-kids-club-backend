import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
const app = express();
import connectDb from "./config/db.js";
import bodyParser from "body-parser";
import { errorHandler } from "./middleware/errorMiddleware.js";
const PORT = process.env.PORT;

// connectDb();
//middleware

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.text({ type: "text/*" }));

//Routes
import userRoutes from "./routes/userRoutes.js";
app.use("/users", userRoutes);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
