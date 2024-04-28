import dotenv from 'dotenv'

dotenv.config()

export default {
    PORT: process.env.SERVER_PORT || 8000,
    DEBUG: process.env.SERVER_DEBUG
};