const fs = require ("fs");

class ProductManager {
    #NextID = 0;
    #path;

    constructor (path) {
    this.#path = path;
}

async getProducts() {
    try {
        const productos = await fs.promises.readfile(this.#path, "utf-8")
        return JSON.parse(productos)
    }catch (e){
      return [];
    }
}
    
    
async addProduct (title, description, price, thumbnail, code, stock) {
    let id = this.#NextID += 1;

    const product ={

    id: id,
    
    title,
    
    description,
    
    price: price,
    
    thumbnail,

    code,
    
    stock: [10]
     
    }

    // const updateProduct = [...product, newProduct];
   await fs.promises.appendFile(this.#path, JSON.stringify(product));
}

async getProductsById (getbyId){
    const products = await this.getProducts();
    const upDateP = await products.find((p) => p.getbyId === getbyId)
    try{
        console.log(upDateP)
    } catch (e) {
        throw new Error (`No se puede actualizar`);
    }
    }

// async updateProduct (getbyId, upDate){
//     const products = await this.getProducts();
//     const upDateP = products.find((p) => p.getbyId === getbyId)

//     if(!upDateP){
//         await fs.promises.writeFile(this.#path,"utf-8",JSON.stringify(upDate))
//     } else {
//         throw new Error (`No se puede actualizar`);
//     }
// }

// async deletProduct (){

// }

}

async function main (){
    const manager = new ProductManager("./Products.json");
    manager.addProduct ("Escada", "Especially Elixir EDP 30 Ml", 90, "Imagen", "0023")
    manager.addProduct ("Esca", "Espec0 Ml", 70, "Imagen", "0033")
    manager.getProductsById(1)
}
main();
