
import { userModel } from "../dao/models/user.model.js";


export const getViews = (req, res) => {
    res.render('chat');
};

export const getViewProduct = async (req, res) => {
    const {page} = req.query;
    const products = await userModel.find({}, page);
    res.render('products', products);
};

