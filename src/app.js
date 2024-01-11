import express from "express";
import mongoose from 'mongoose';
import productsRouter from "./routers/products.routes.js";
import cartsRouter from "./routers/carts.routes.js";
import viewsRoutes from "./routers/views.routes.js";
import realTimeProductsRouter from './routers/realTimeProducts.routes.js'
import handlebars from 'express-handlebars';
import { Server } from "socket.io";

const app = express();
const PORT = 8080;

app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(express.json());
app.engine('handlebars', handlebars.engine());

app.set('views', 'src/views')
app.set('view engine', 'handlebars')
mongoose.connect('mongodb+srv://nicosc2006:losdelpaseo13@ecommerce.owon9si.mongodb.net/ecommerce')
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

app.use('/', viewsRoutes);
app.use('/api/realtimeproducts', realTimeProductsRouter);

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


