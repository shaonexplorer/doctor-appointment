"use server";

import mongoose from "mongoose";

// let DATABASE_URL =
//   "mongodb+srv://abir:YxpXkf0ONWSdqHM0@cluster0.hpuos.mongodb.net/doctor-appointment?retryWrites=true&w=majority&appName=Cluster0";

let DATABASE_URL = process.env.NEXT_PUBLIC_DATABASE_URI;

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose
      .connect(DATABASE_URL, opts)
      .then((mongoose) => {
        return mongoose;
      })
      .catch((err) => console.log(err));
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectDB;
