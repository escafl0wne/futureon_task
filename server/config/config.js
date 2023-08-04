import 'dotenv/config'

//we load our environment variables from the .env file
const config = {
    PORT: process.env.PORT || 5012,
    API_URI: process.env.API_URI,
    API_TOKEN: process.env.API_TOKEN,
    API_STR: process.env.API_STR,
    NODE_ENV:process.env.NODE_ENV,
    PROJECT_ID:process.env.PROJECT_ID,
    ONLINE:true
}
export default config;