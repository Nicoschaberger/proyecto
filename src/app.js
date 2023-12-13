import express from "express";
import productsRouter from "./routers/products.routes.js";
import cartsRouter from "./routers/carts.routes.js";

const app = express();
const PORT = 8080;
app.use(express.urlencoded({extended: true}));


app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);


app.listen(PORT, (req, res) => {
    console.log(`Escuchando en el servido ${PORT}`)
});
