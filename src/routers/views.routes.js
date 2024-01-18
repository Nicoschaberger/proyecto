import { Router } from "express";
import { userModel } from "../dao/models/products.model.js";

const viewsRouters = Router();

viewsRouters.get('/', (req, res) => {
    res.render('chat');
});

viewsRouters.get('/products', async (req, res) => {
    const {page} = req.query;
    const products = await userModel.find({}, page);
    res.render('products', products);
});

export default viewsRouters;