import { Router } from 'express'
import { deleteProductId, getProduct, getProductId, getProducts, postProduct, putProductId } from '../controllers/products.controller.js';

const productsRouter = Router();

productsRouter.get('/', getProducts);

productsRouter.get('/', getProduct);

productsRouter.get('/:pid', getProductId);

productsRouter.post('/', postProduct);

productsRouter.put('/:pid', putProductId);

productsRouter.delete('/:pid', deleteProductId);


export default productsRouter;