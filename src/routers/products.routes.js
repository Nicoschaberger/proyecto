import { Router } from 'express'
import { userModel } from '../dao/models/products.model.js';

const productsRouter = Router();

productsRouter.get('/', async (req, res) => {
  try{
    const product = await userModel.find();
    res.status(200).json({product})
  } catch ( error ) {
    console.error(error);
    res.status(400).json({message: 'error'});
  }
});

productsRouter.get('/:pid', async (req, res) => {
  const {pId} = req.params;
  try{
      const products = await userModel.findOne({_id: pId});
      if(!products){
          return res.status(404).json({message: 'producto no encontrado'});
      }
      res.send({products});
  } catch(error){
      console.error(error);
      res.status(400).send(error);
  }
});

productsRouter.post('/', async (req,res) => {
  const {Nombre, Descripcion, Precio, Stock, Producto } = req.body
    if(!Nombre || !Descripcion || !Precio || !Stock || !Producto){
        return res.status(400).json({message: 'Producto incompleto'});
    }
    try{
        await userModel.create({Nombre, Descripcion, Precio, Stock, Producto});
        res.status(201).json({message: 'Producto creado'})
    } catch( error) {
        console.error(error);
        res.status(400).json({message: 'Producto no creado'});
    }
});

productsRouter.put('/:pid', async (req, res) => {
  const {pId} = req.params;
  const updatedProduct = req.body
  try{
    await userModel.updateOne({_id: pId}, updatedProduct);
    res.status(200).json({message: 'Producto actualizado'});
  } catch (error) {
    console.error(error);
    res.status(400).json({message: 'error, el producto no se actualizo'});
  }
});

productsRouter.delete('/:pid', async (req, res) => {
  const {pId} = req.params;
    try{
       const deleted = await userModel.deleteOne({_id : pId})
       if(!deleted.deletedCount){
            return res.status(404).json({message:'producto no encontrado'})
       }
       res.status(200).json({message: ' User borrado'});
    } catch (error) {
        console.error(error);
        res.status(400).json({message: 'usuario no encontrado'})

    }
});

productsRouter.get('/', async (req, res) => {
  const products = await userModel.find()
  res.render('home', {products})
});

export default productsRouter;