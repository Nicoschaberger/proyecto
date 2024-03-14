import { Router } from 'express'
import { deleteProductId, getProduct, getProductId, getProducts, postProduct, putProductId } from '../controllers/products.controller.js';
import { authorizeAdmin, authorizeUser } from '../middlewares/auth.js';


const productsRouter = Router();

productsRouter.get('/', authorizeUser, getProducts);

productsRouter.get('/', authorizeUser, getProduct);

productsRouter.get('/:pid', authorizeAdmin, getProductId);

productsRouter.post('/', authorizeAdmin, postProduct);

productsRouter.put('/:pid', authorizeAdmin, putProductId);

productsRouter.delete('/:pid', authorizeAdmin, deleteProductId);


export default productsRouter;