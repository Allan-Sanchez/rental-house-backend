import dotenv from 'dotenv';

dotenv.config();

const config ={
    port: process.env.PORT,
    baseUrl:process.env.BASEURL
}

export default config;