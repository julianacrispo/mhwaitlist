import mongoose from 'mongoose';
import { setDefaultResultOrder } from 'node:dns';

try {
  setDefaultResultOrder('ipv4first');
} catch {
  // Older runtimes may not support this.
}

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

function isSrvDnsFailure(error) {
  const message = error?.message || '';
  return error?.code === 'ENOTFOUND' || /querySrv/i.test(message);
}

function toDirectMongoUri(uri) {
  if (!uri?.startsWith('mongodb+srv://')) {
    return uri;
  }

  const parsed = new URL(uri.replace(/^mongodb\+srv:\/\//, 'https://'));
  const [clusterName, ...rest] = parsed.hostname.split('.');
  const restHost = rest.join('.');
  const hosts = [0, 1, 2]
    .map((n) => `${clusterName}-shard-00-0${n}.${restHost}:27017`)
    .join(',');
  const dbName = parsed.pathname.replace(/^\//, '');
  const params = new URLSearchParams(parsed.search);

  if (!params.has('tls') && !params.has('ssl')) {
    params.set('tls', 'true');
  }
  if (!params.has('authSource')) {
    params.set('authSource', 'admin');
  }

  const username = encodeURIComponent(decodeURIComponent(parsed.username));
  const password = encodeURIComponent(decodeURIComponent(parsed.password));
  return `mongodb://${username}:${password}@${hosts}/${dbName}?${params.toString()}`;
}

const connectionOptions = {
  bufferCommands: false,
  serverSelectionTimeoutMS: 10000,
  family: 4,
};

async function connectDB() {
  if (cached.conn) {
    console.log('Using cached MongoDB connection');
    return cached.conn;
  }

  if (!cached.promise) {
    console.log('Creating new MongoDB connection...');
    cached.promise = mongoose.connect(MONGODB_URI, connectionOptions)
      .catch(async (error) => {
        if (!isSrvDnsFailure(error) || !MONGODB_URI.startsWith('mongodb+srv://')) {
          throw error;
        }

        console.warn('mongodb+srv DNS lookup failed, retrying with direct shard hosts');
        return mongoose.connect(toDirectMongoUri(MONGODB_URI), connectionOptions);
      })
      .then((mongooseInstance) => {
        console.log('MongoDB connection established');
        return mongooseInstance;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    console.error('MongoDB connection error:', e);
    throw e;
  }

  return cached.conn;
}

// Define the Waitlist schema
const waitlistSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    description: "LinkedIn Profile URL (optional)"
  },
  countryCode: {
    type: String,
    default: "+1",
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  goals: {
    type: String,
    required: true,
  },
  challenges: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the model if it doesn't exist
const Waitlist = mongoose.models.Waitlist || mongoose.model('Waitlist', waitlistSchema);

export { connectDB, Waitlist }; 