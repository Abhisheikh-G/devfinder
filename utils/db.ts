const mongoose = require("mongoose");

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });
    console.log("MongoDB connected..");
  } catch (error: any) {
    console.log(error.message);
    //Fails process if database does not connect
    process.exit(1);
  }
};
