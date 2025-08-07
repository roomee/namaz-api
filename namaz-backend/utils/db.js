import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI;

export async function connect() {
  if (mongoose.connections[0].readyState) return;
  await mongoose.connect(MONGO_URI);
}
