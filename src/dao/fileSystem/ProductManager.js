import fs from 'fs'

class ProductManager{
    constructor(path){
        this.path = path;
    }

    async getLength(){
        const products = await this.getProducts();
        return products.length;
    }

    static id = 0;

    async getProducts(){
      try{
        const data = await fs.promises.readFile(this.path, 'utf-8');
        const products = JSON.parse(data);
        return products;
    } catch (error){
        console.error(error);
        return [];
    }
    }

    async addProduct(product) {
      if(!product.titulo || !product.descripcion || !product.precio || !product.imagen || !product.code || !product.stock){
          return console.error('Datos incompletos');
      }
      ProductManager.id++;
      const products = await this.getProducts();
      const id = await this.getLength();
      const newProduct = {
          titulo:product.titulo,
          descripcion: product.descripcion,
          precio: product.precio,
          imagen: product.imagen,
          code: product.code,
          stock: product.stock,
          id: id + 1
      }

      products.push(newProduct);

      await promises.writeFile(this.path, JSON.stringify(products), 'utf-8');

  }

    async getProductsById(pid){
        const products = await this.getProducts()
        const product = products.find((p) => p.id === pid);
        if(!product){
            return console.log('producto no encontrado')
        }
        return product;

    }

    async updateProduct(pid, productActualizado){
      const products = await this.getProducts()
      const productUp = products.map(product => {
          if(product.id === pid){
              return{
                  ...product,
                  ...productActualizado,
                  pid
              }
          }
          return product;
      });

      await promises.writeFile(this.path, JSON.stringify(productUp), 'utf-8');
      
    }

  async deleteProduct(pid){
      const products = await this.getProducts()
      const productsDelete = products.filter(product => product.id !== pid);
      await promises.writeFile(this.path, JSON.stringify(productsDelete), 'utf-8');
  }

}

export default ProductManager;