import express from "express";
import mongoose from 'mongoose';
import productsRouter from "./routers/products.routes.js";
import cartsRouter from "./routers/carts.routes.js";
import viewsRouters from "./routers/views.routes.js"
import realTimeProductsRouter from "./routers/realTimeProducts.routes.js";
import handlebars from 'express-handlebars';
import { Server } from "socket.io";
import session from 'express-session';
import MongoStore from "connect-mongo";
import sessionRoutes from "./routers/session.routes.js";
import LoginRoutes from "./routers/login.routes.js";
import passport from 'passport';
import initializePassport from './config/passport.config.js';


const PORT = 8080;
const app = express();

//MIDLEWEARES
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

app.use(session({
    secret: 'C0d3rh0us3',
    store: MongoStore.create({
        mongoUrl:'mongodb+srv://nicosc2006:losdelpaseo13@ecommerce.owon9si.mongodb.net/ecommerce',
    }),
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

// BASE DE DATOS MONGO
mongoose.connect('mongodb+srv://nicosc2006:losdelpaseo13@ecommerce.owon9si.mongodb.net/ecommerce')

// ROUTES
app.use('/', viewsRouters);
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/api/realtimeproducts', realTimeProductsRouter);
app.use('/api/session', sessionRoutes);
app.use('/api/login', LoginRoutes)


// SERVER
const httpServer = app.listen(PORT, (req, res) => {
    console.log(`Escuchando en el servido ${PORT}`)
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


