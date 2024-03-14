import ProductDTO from "../dao/dtos/product.dto.js";
import { productsModel } from "../dao/models/products.model.js";


export const getProducts = async (req, res) => {
  const products = await productsModel.find();
  res.render('home', {products})
};

export const addProduct = async (req,res)=>{ 
  try{
    const products = new ProductMongoManager();
    const newProduct = new ProductDTO(req.body);
    const resultado = await products.addProduct(newProduct)  
    if (resultado.message==="OK"){
      return res.status(200).json(resultado)
    }
    res.status(400).json(resultado)
  }
  catch(err){
    res.status(400).json({message: err})
  }
}

export const getProduct = async (req, res) => {
  try{
    const { limit = 10, page = 1, query = '', sort = '' } = req.query;
    const [code, value] = query.split(':')
    const product = await productsModel.paginate({[code] : value},{
      limit,
      page,
      sort: sort ? {Precio: sort} : {}
    });
    product.payload = product.docs;
    delete product.docs
    res.status(200).json({product})
  } catch ( error ) {
    console.error(error);
    res.status(400).json({message: 'error'});
  }
};

export const getProductId = async (req, res) => {
  const {pId} = req.params;
  try{
      const products = await productsModel.findOne({_id: pId});
      if(!products){
          return res.status(404).json({message: 'producto no encontrado'});
      }
      res.send({products});
  } catch(error){
      console.error(error);
      res.status(400).send(error);
  }
};

export const postProduct = async (req,res) => {
  const {Nombre, Descripcion, Precio, Stock, Producto } = req.body
    if(!Nombre || !Descripcion || !Precio || !Stock || !Producto){
        return res.status(400).json({message: 'Producto incompleto'});
    }
    try{
        await productsModel.create({Nombre, Descripcion, Precio, Stock, Producto});
        res.status(201).json({message: 'Producto creado'})
    } catch( error) {
        console.error(error);
        res.status(400).json({message: 'Producto no creado'});
    }
};

export const putProductId = async (req, res) => {
  const {pId} = req.params;
  const updatedProduct = req.body
  try{
    await productsModel.updateOne({_id: pId}, updatedProduct);
    res.status(200).json({message: 'Producto actualizado'});
  } catch (error) {
    console.error(error);
    res.status(400).json({message: 'error, el producto no se actualizo'});
  }
};

export const deleteProductId = async (req, res) => {
  const {pId} = req.params;
    try{
       const deleted = await productsModel.deleteOne({_id : pId})
       if(!deleted.deletedCount){
            return res.status(404).json({message:'producto no encontrado'})
       }
       res.status(200).json({message: ' User borrado'});
    } catch (error) {
        console.error(error);
        res.status(400).json({message: 'usuario no encontrado'})

    }
};


