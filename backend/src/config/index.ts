import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: parseInt(process.env.PORT || '5001', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  databaseUrl: process.env.DATABASE_URL || 'mysql://root:password@localhost:3306/dd_transport_db',
  jwtSecret: process.env.JWT_SECRET || 'dd_transport_default_jwt_secret_dev_key_2025',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  clientUrls: (process.env.CLIENT_URL || 'http://localhost:3000,http://localhost:5173')
    .split(',')
    .map((url) => url.trim()),
};
