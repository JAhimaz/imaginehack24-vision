import dotenv from "dotenv";

dotenv.config();

export const Env = {
  MONGODB_URI: process.env.MONGODB_URI,
  MONGODB_CRYPTO: process.env.MONGODB_CRYPTO,
  SESSION_SECRET: process.env.SESSION_SECRET,
  NODE_ENV: process.env.NODE_ENV,
  CLIENT_URL: process.env.CLIENT_URL,
  SERVER_URL: process.env.SERVER_URL,
  SERVER_PORT: process.env.SERVER_PORT,
  GEMINI_API_KEY: process.env.GEMINI_API_KEY
}