import dotenv from 'dotenv';
import { Langfuse } from 'langfuse';

dotenv.config();

const { LANGFUSE_SECRET_KEY, LANGFUSE_PUBLIC_KEY, LANGFUSE_HOST } = process.env;

export const langfuse = new Langfuse({
  secretKey: LANGFUSE_SECRET_KEY,
  publicKey: LANGFUSE_PUBLIC_KEY,
  host: LANGFUSE_HOST,
});

export default '1';
