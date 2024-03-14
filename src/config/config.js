import dotenv from 'dotenv';

export const getVariables = (options) => {
    const enviroment = options.opts().mode;
    dotenv.config({
        path: enviroment === 'production' ? './.env.production' : './.env.development'
    });

    return {
        PORT: process.env.PORT,
        mongoUrl: process.env.mongoURL,
        adminName: process.env.adminName,
        adminPassword: process.env.adminPassword,
        secret: process.env.secret
    }
}