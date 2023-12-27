import { Router } from 'express'

const realTimeProductsRouter = Router();

realTimeProductsRouter.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts');
})

export default realTimeProductsRouter;