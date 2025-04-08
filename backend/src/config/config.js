import dotEnv from 'dotenv'
dotEnv.config();
const _config = {
    PORT:process.env.PORT,
    MONGO_URI :process.env.MONGO_URI,
    JWT_REFERESH_SECRET :process.env.JWT_REFERESH_SECRET,
    JWT_access_SECRET:process.env.JWT_access_SECRET
    
}

const config = Object.freeze(_config)
export default config