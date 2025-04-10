import dotenv from 'dotenv';
dotenv.config();

const _config = {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
  JWT_access_SECRET: process.env.JWT_access_SECRET,
  JWT_REFERESH_SECRET: process.env.JWT_REFERESH_SECRET,
  accessexpiresIn: process.env.accessexpiresIn,
  REFERESHexpiresIn: process.env.REFERESHexpiresIn
};

if (!_config.JWT_access_SECRET || !_config.JWT_REFERESH_SECRET) {
  throw new Error("JWT secrets are missing in .env");
}

const config = Object.freeze(_config);
export default config;
