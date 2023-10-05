import { config } from "dotenv";

config();

const { PORT } = process.env;

const prefix = 'encrypt:';
export const environment = {
  PORT: PORT || 3000,
  prefix,
}