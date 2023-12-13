import { Router } from 'express'
import CartManager from '../CartManager.js';

const cartsRouter = Router();
const cartManager = new CartManager('src/Cart.json');

cartsRouter.get('/', async (req,res) => {
    const carts = await cartManager.getCarts();
    res.send(carts);
});

cartsRouter.get('/:id', async (req,res) => {
    const {cId}= req.params
    const cartById = await cartManager.getCartById(cId);
    if(!cartById){
        return res.status(404).send({mensaje: 'producto no encontrado'});
    }
    res.send(cartById)
});

cartsRouter.post('/', async (req,res) => {
    const cartAdded = await cartManager.addCart();
    if(!cartAdded){
        return res.status(400).send({mensaje: 'error: producto no agregado'});
    }
    res.send(cartAdded);
});

cartsRouter.post('/:cId/product/:id', async (req,res) => {
    const {cId, id}= req.params;
    const productAddedToCart = await cartManager.addProductToCart(id, cId);
    if(!productAddedToCart){
        return res.status(400).send({mensaje: 'producto no encontrado'});
    }
    res.send({mensaje: 'Producto agregado al carrito'});   
});

export default cartsRouter;
