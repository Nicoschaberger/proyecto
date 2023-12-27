import { Router } from 'express'
import ProductManager from "../ProductManager.js";

const productManager = new ProductManager('./products.json')
const productsRouter = Router();

productsRouter.get('/', async (req, res) => {
  const product = await productManager.getProducts();
   let {limit} = req.query;
   if(!limit){
    return res.send(product)
   }
   const productLimit = product.slice(0, limit);
   res.send(productLimit);
});

productsRouter.get('/:pid', async (req, res) => {
  const pid = parseInt(req.params.pid);
  
  const productoFiltrado = await productManager.getProductsById(pid);
  
  if (productoFiltrado) {
    res.send(productoFiltrado);
  } else {
    res.send('Producto no encontrado');
  }
});

productsRouter.post('/', async (req,res) => {
  const productAdded = await productManager.addProduct();
  if(!productAdded){
      return res.status(400).send({mensaje: 'error: producto no agregado'});
  }
  res.send(productAdded);
});

productsRouter.put('/:pid', async (req, res) => {
  const {pid, productActualizado} = req.body
  const productPut = await productManager.updateProduct(pid, productActualizado);
  if(!productPut){
    return res.status(404).send({mensaje: 'producto no actualizado'});
  }
  res.send({mensaje: 'producto actualizado'})
});

productsRouter.delete('/:pid', async (req, res) => {
  const {pid} = req.params;
  const productDeleted = await productManager.deleteProduct(pid);
  if(!productDeleted){
    return res.status(404).send({mensaje: 'producto no encontrado'});
  }
  res.send({mensaje: 'Producto encontrado'});
});

productsRouter.get('/', async (req, res) => {
  const products = await productManager.getProducts();
  res.render('home', {products})
});

export default productsRouter;