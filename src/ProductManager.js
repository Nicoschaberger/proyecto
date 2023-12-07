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
        return [
            {
              id: 1,
              Nombre: "Laptop",
              Descripcion: "Portátil de última generación",
              Precio: 1200.00,
              Stock: 50,
              Producto: 1
            },
            {
              id: 2,
              Nombre: "Teléfono inteligente",
              Descripcion: "Teléfono con cámara de alta resolución",
              Precio: 800.00,
              Stock: 100,
              Producto: 2
            },
            {
              id: 3,
              Nombre: "Smartwatch",
              Descripcion: "Reloj inteligente con funciones avanzadas",
              Precio: 150.00,
              Stock: 30,
              Producto: 3
            },
            {
              id: 4,
              Nombre: "Tablet",
              Descripcion: "Tableta con pantalla táctil",
              Precio: 500.00,
              Stock: 20,
              Producto: 4
            },
            {
              id: 5,
              Nombre: "Cámara digital",
              Descripcion: "Cámara de fotos de alta resolución",
              Precio: 700.00,
              Stock: 40,
              Producto: 5
            },
            {
              id: 6,
              Nombre: "Auriculares inalámbricos",
              Descripcion: "Auriculares con cancelación de ruido",
              Precio: 100.00,
              Stock: 60,
              Producto: 6
            },
            {
              id: 7,
              Nombre: "Teclado mecánico",
              Descripcion: "Teclado para gaming con retroiluminación",
              Precio: 80.00,
              Stock: 25,
              Producto: 7
            },
            {
              id: 8,
              Nombre: "Monitor curvo",
              Descripcion: "Monitor de alta definición con curvatura",
              Precio: 300.00,
              Stock: 15,
              Producto: 8
            },
            {
              id: 9,
              Nombre: "Altavoces Bluetooth",
              Descripcion: "Altavoces portátiles con conexión Bluetooth",
              Precio: 50.00,
              Stock: 50,
              Producto: 9
            },
            {
              id: 10,
              Nombre: "Impresora multifunción",
              Descripcion: "Impresora que imprime, escanea y copia",
              Precio: 200.00,
              Stock: 10,
              Producto: 10
            }
          ];
    }

    async agregarProductos(product) {
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

    async getProductsById(id){
        const products = await this.getProducts()
        const product = products.find((p) => p.id === id);
        if(!product){
            return console.log('producto no encontrado')
        }
        return product;

    }

    async updateProduct(id, productActualizado){
      const products = await this.getProducts()
      const productUp = products.map(product => {
          if(product.id === id){
              return{
                  ...product,
                  ...productActualizado,
                  id
              }
          }
          return product;
      });

      await promises.writeFile(this.path, JSON.stringify(productUp), 'utf-8');
      
  }

  async deleteProduct(id){
      const products = await this.getProducts()
      const productsDelete = products.filter(product => product.id !== id);
      await promises.writeFile(this.path, JSON.stringify(productsDelete), 'utf-8');
  }

}

export default ProductManager;