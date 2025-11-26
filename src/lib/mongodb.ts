import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI || MONGODB_URI.includes('username:password')) {
  console.warn('⚠️  MongoDB not configured! Please setup MongoDB Atlas.');
  console.warn('📖 Follow the guide: MONGODB_SETUP.md');
  console.warn('🔗 Get free MongoDB at: https://www.mongodb.com/cloud/atlas');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  // Check if MongoDB is configured
  if (!MONGODB_URI || MONGODB_URI.includes('username:password')) {
    throw new Error(
      'MongoDB not configured. Please follow MONGODB_SETUP.md to setup your database.'
    );
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log('✅ MongoDB connected successfully!');
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    console.error('❌ MongoDB connection failed:', e);
    throw new Error(
      'Failed to connect to MongoDB. Please check your MONGODB_URI in .env.local'
    );
  }

  return cached.conn;
}

export default dbConnect;
