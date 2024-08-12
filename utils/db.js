import mongoose from "mongoose";

let isDatabaseConnected = false;

export const connectDB = async() => {
  mongoose.set('strictQuery', true)

  if(isDatabaseConnected){
    console.log('MongoDB is already connected')
    return;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'prompt-share',
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log("MongoDB Connected")
  } catch (error) {
    console.log(error)
  }
}
