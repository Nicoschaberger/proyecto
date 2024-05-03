import express from "express";
import mongoose from 'mongoose';
import productsRouter from "./routers/products.routes.js";
import cartsRouter from "./routers/carts.routes.js";
import viewsRouters from "./routers/views.routes.js";
import usersRouter from "./routers/users.routes.js";
import realTimeProductsRouter from "./routers/realTimeProducts.routes.js";
import handlebars from 'express-handlebars';
import { Server } from "socket.io";
import session from 'express-session';
import MongoStore from "connect-mongo";
import sessionRoutes from "./routers/session.routes.js";
import LoginRoutes from "./routers/login.routes.js";
import passport from 'passport';
import initializePassport from './config/passport.config.js';
import { Command } from 'commander';
import { getVariables, } from "./config/config.js";
import { addLogger } from "./utils/logger.js";
import dotenv from 'dotenv';
import { swaggerConfig } from "./config/swagger-config.js";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUiExpress from "swagger-ui-express";

dotenv.config();
const program = new Command();
program.option('--mode <mode>', 'Modo de trabajo', 'development');
const options = program.parse();
const { PORT, mongoUrl, secret } = getVariables(options);
const app = express();


const specs = swaggerJSDoc(swaggerConfig);
app.use("/apidocs", swaggerUiExpress.serve, swaggerUiExpress.setup(specs));

//MIDLEWEARES
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

app.use(session({
    secret: 'secret',
    mongoUrl: mongoUrl,    
    resave: true,
    saveUninitialized: true
}));

//HANDLEBARS
const hbs = handlebars.create({
    runtimeOptions:{
        allowProtoPropertiesByDefault: true
    }
});

// PASSPORT
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

app.engine('handlebars', hbs.engine);
app.set('views', 'src/views')
app.set('view engine', 'handlebars')


// ROUTES
app.use('/', viewsRouters);
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/api/realtimeproducts', realTimeProductsRouter);
app.use('/api/session', sessionRoutes);
app.use('/api/login', LoginRoutes);
app.use('/api/users', usersRouter)

//Logger
app.use(addLogger);
app.get('/verlogs', (req, res) => {
    req.logger.info('Hola soy un log de info');
    req.logger.warning('Esto es un warning');
    req.logger.error('Esto es un error');
    req.logger.fatal('Esto es un error FATAL');
    req.logger.debug('Esto es un debug');
    res.send({message: 'Error de prueba!'});
});


// SERVER
const httpServer = app.listen(PORT, () => {
    console.log(`Escuchando en puerto ${PORT}`);    
});

const io = new Server(httpServer);
const messages = [];
io.on('connect', socket => {
    console.log('Nuevo cliente conectado');
    socket.on('message', data => {
        messages.push(data);
        io.emit('messageLogs', messages);
    });

    socket.on('newUser', user => {
        io.emit('newConnection', 'Un nuevo usuario se conectó');
        socket.broadcast.emit('notification', user);
    });
});


