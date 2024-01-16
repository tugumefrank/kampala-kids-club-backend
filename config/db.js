import dotenv from "dotenv";
import mongoose from "mongoose";
const connectDb = async () => {
  try {
    console.log(process.env.MONG0_URI);
    const conn = await mongoose.connect(process.env.MONG0_URI);

    console.log(`mongo connected on ${conn.connection.host}`);
  } catch (error) {
    console.log(`we got this error:  ${error}`);
    process.exit(1);
  }
};
export default connectDb;
