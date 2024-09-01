import { registerAs } from '@nestjs/config';

export default registerAs('dbConfig', () => {
  const dbConfig = {
    db: {
      connection: process.env.DB_CONNECTION,
      host: process.env.DB_HOST,
      mongoHost: process.env.MONGO_HOST,
      name: process.env.DB_NAME,
      user: process.env.DB_USER,
      cluster: process.env.DB_CLUSTER,
      password: process.env.DB_PASSWORD,
    },
    env: process.env.NODE_ENV || 'local',
  };
  return dbConfig;
});