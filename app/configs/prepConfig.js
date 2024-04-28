import dotenv from 'dotenv'

dotenv.config()

export default {
    SMALL: {
        path: process.env.DUMMYFILES_SMALL_PATH,
        n_files: process.env.DUMMYFILES_SMALL_COUNT,
        size: process.env.DUMMYFILES_SMALL_SIZE
    },
    LARGE: {
        path: process.env.DUMMYFILES_LARGE_PATH,
        n_files: process.env.DUMMYFILES_LARGE_COUNT,
        size: process.env.DUMMYFILES_LARGE_SIZE
    }
};