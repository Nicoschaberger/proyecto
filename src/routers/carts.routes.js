import { Router } from 'express'
import { cartModel } from '../dao/models/cart.model.js';

const cartsRouter = Router();

cartsRouter.get('/', async (req,res) => {
    const carts = await cartModel.find();
    res.send({carts});
});

cartsRouter.get('/:id', async (req,res) => {
    const {cId}= req.params
    try {
        const cartById = await cartModel.find(cId);
        res.send(cartById);        
    } catch (error) {
        console.error(error)
        return res.status(404).send({mensaje: 'producto no encontrado'});   
    }
});

cartsRouter.post('/', async (req,res) => {
    try {
        const cartAdded = await cartModel.find();
        res.send(cartAdded);
        
    } catch (error) {
        console.error(error);
        res.status(400).send({message: 'error: producto no agregado'});   
    }
});

cartsRouter.post('/:cId/product/:id', async (req,res) => {
    const {cId, id}= req.params;
    try {
        const productAddedToCart = await cartModel.find({_id: id, _id: cId});
        res.send({mensaje: 'Producto agregado al carrito'});   
        
    } catch (error) {
        console.error(error);
        return res.status(400).send({mensaje: 'producto no encontrado'});
    }
});

export default cartsRouter;
