import express from "express";
import mongoose from 'mongoose';
import productsRouter from "./routers/products.routes.js";
import cartsRouter from "./routers/carts.routes.js";
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
mongoose.connect('mongodb+srv://nicosc2006:losdelpaseo13@ecommerce.owon9si.mongodb.net/')
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

app.use('/', productsRouter);
app.use('/realtimeproducts', realTimeProductsRouter);

const httpServer = app.listen(PORT, (req, res) => {
    console.log(`Escuchando en el servido ${PORT}`)
});

const io = new Server(httpServer);
io.on('connection', socket =>{
    console.log('Cliente conectado');

    socket.emit('message', 'Hola desde el servidor')
});


