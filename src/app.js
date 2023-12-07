import express from "express";
import ProductManager from "./Productmanager.js";

const productManager = new ProductManager
const app = express();
const PORT = 8080;
app.use(express.urlencoded({extended: true}));

app.get('/products', async (req, res) => {
    let product = await productManager.getProducts();
    res.send(product);
});

app.get('/products/:id', async (req, res) => {
    const id = parseInt(req.params.id);
  
    const productoFiltrado = await productManager.getProductsById(id);
  
    if (productoFiltrado) {
      res.send(productoFiltrado);
    } else {
      res.send('Producto no encontrado');
    }
  });

  app.get('/products', async (req, res) => {
    let {limit} = req.query;
    const product = await productManager.getProducts();
    if(!limit){
      res.send(product)
    }
    const productLimit = product.slice(0, limit);
    res.send(productLimit);
  });

app.listen(PORT, (req, res) => {
    console.log(`Escuchando en el servido ${PORT}`)
})
