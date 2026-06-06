import dotenv from "dotenv";

dotenv.config();

export const env = {
  GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  JWT_SECRET: process.env.JWT_SECRET,
  DATABASE_URL:process.env.DATABASE_URL
};
