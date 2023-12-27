import { Router } from 'express'
import ProductManager from "../ProductManager.js";

const productManager = new ProductManager('./src/products.json')
const realTimeProductsRouter = Router();

realTimeProductsRouter.get('/realtimeproducts', async (req, res) => {
    const products = await productManager.getProducts()
    res.render('realTimeProducts');
})

export default realTimeProductsRouter;