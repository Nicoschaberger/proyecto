import { cartModel } from '../dao/models/cart.model.js';
import mongoose from 'mongoose';

export const getCarts = async (req,res) => {
    const carts = await cartModel.find();
    res.send({carts});
};

export const getCartId = async (req,res) => {
    const {cId}= req.params
    try {
        const cartById = await cartModel.find(cId);
        res.send(cartById);        
    } catch (error) {
        console.error(error)
        return res.status(404).send({mensaje: 'producto no encontrado'});   
    }
};

export const postCart = async (req,res) => {
    try {
        const cartAdded = await cartModel.find();
        res.send(cartAdded);
        
    } catch (error) {
        console.error(error);
        res.status(400).send({message: 'error: producto no agregado'});   
    }
};

export const postCartId = async (req,res) => {
    const {cId, id}= req.params;
    const newQuantity = req.body;
    try {
        const productAddedToCart = await cartModel.find({_id: id, _id: cId, newQuantity});
        if(productAddedToCart){
        res.send({mensaje: 'Producto agregado al carrito'});   
        }
    } catch (error) {
        console.error(error);
        return res.status(400).send({mensaje: 'producto no encontrado'});
    }
};

export const deleteCart = async (req, res) =>{
    try {
        const {cId} = req.params;
        const carts = await cartModel.findOne({_id: id}).populate('products.product');
        const cartsDelete = await carts.deleteProduct(cId)
        if(cartsDelete.message === 'OK'){
            return res.status(200).json({message: 'Productos borrado'})
        }
    } catch (error) {
        console.error(error);
        res.status(404).json({message: 'No se ha borrado los productos'});        
    }
};

export const deleteCartId = async (req, res) =>{
    const { cId, pId} = req.params;
    try {
        const cartProduct = await cartModel.updateOne({_id: cId}, {
            $pull: {products : {product: new mongoose.Types.ObjectId(pId)}}
        });
        if(cartProduct.modifiedCount > 0){
        res.send({message: 'Producto eliminado'});
        }
    } catch (error) {
        console.error(error);
        res.status(400).json({message: 'No se encontro el producto'})
    }
    
};

export const putCart = async (req, res) => {
    const { cId } = req.params;
    const cart = req.body;
    try {
        const updateCart = await cartModel.updateOne({_id: cId}, cart)
        if(updateCart.modifiedCount > 0){
            res.send({message: 'Carrito actualizado'});
        }
    } catch (error) {
        console.error(error);
        res.status(400).json({message: 'Carrito no actualizado'});        
    }
};

export const putCartId = async (req, res) => {
    const {cId, pId} = req.params;
    const { quantity } = req.body;
    const cart = await cartModel.findOne({_id: cId});
    if(!cart){
        return false;
    }
    try{
    const product = cart.product.find(product => product.product.toString() === pId);
    if(product){
        product.quantity += quantity;
        await cart.save();
        res.send({message: 'Producto agregado'})
    }
    } catch (error){
        console.error(error);
        res.status(400).send({message: 'Producto no agregado'});
    }
}


