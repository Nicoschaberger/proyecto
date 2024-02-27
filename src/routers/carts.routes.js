import { Router } from 'express'
import { deleteCart, deleteCartId, getCartId, getCarts, postCart, postCartId, putCart, putCartId } from '../controllers/carts.controller.js';

const cartsRouter = Router();

cartsRouter.get('/', getCarts);

cartsRouter.get('/:id', getCartId);

cartsRouter.post('/', postCart);

cartsRouter.post('/:cId/product/:id', postCartId);

cartsRouter.delete('/:cId', deleteCart);

cartsRouter.delete('/:cId/products/:pId', deleteCartId);

cartsRouter.put('/:cId', putCart);

cartsRouter.put('/:cId/products/:pId', putCartId)

export default cartsRouter;
