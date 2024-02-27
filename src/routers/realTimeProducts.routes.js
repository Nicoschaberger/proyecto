import { Router } from 'express'
import { getRealTimeProducts } from '../controllers/realTimeProducts.controllers.js';

const realTimeProductsRouter = Router();

realTimeProductsRouter.get('/', getRealTimeProducts)

export default realTimeProductsRouter;