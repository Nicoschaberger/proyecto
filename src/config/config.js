import dotenv from 'dotenv';

export const getVariables = (options) => {
    const environment = options.opts().mode;
    dotenv.config({
        path: environment === 'production' ? './src/.env.production' : './src/.env.development'
      });     


    return {
        PORT: process.env.PORT,
        mongoUrl: process.env.mongoURL,
        adminName: process.env.adminName,
        adminPassword: process.env.adminPassword,
        secret: process.env.secret
    }
}