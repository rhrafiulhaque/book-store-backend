import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  bycrpt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  jwt_secret_key: process.env.JWT_SECRET_CODE,
  jwt_expires: process.env.JWT_EXPIRES,
};
