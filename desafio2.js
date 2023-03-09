
const fs = require ("fs");

class ProductManager {
    #NextID = 0;
    path = "./Products.json";

async getProducts() {
    try {
        const productos = await fs.promises.readFile(this.path, "utf-8")
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
    
    const allProduct = await this.getProducts()
    allProduct.push(product)
   return await fs.promises.writeFile(this.path, JSON.stringify(allProduct));
}

async getProductsById (getbyId){
    try{
        const products = await this.getProducts();
        const upDateP = await products.find((p) => p.id === getbyId)
        return upDateP;
    } catch (e){
        return [];
    }
    }
// 
async upDateProductId (upId, dataToUpdate){
    
        const products = await this.getProducts();
        let aux = products.filter((e)=> e.id !== upId)

        let upDateProduct = products.find((p) => p.id === upId)
        if(dataToUpdate.hasOwnProperty("title") || dataToUpdate.hasOwnProperty("description") || dataToUpdate.hasOwnProperty("price")){
          upDateProduct.title = dataToUpdate.title ? dataToUpdate.title : upDateProduct.title
          upDateProduct.description = dataToUpdate.description ? dataToUpdate.description : upDateProduct.description
          upDateProduct.price = dataToUpdate.price ? dataToUpdate.price : upDateProduct.price
          aux.push(upDateProduct)
           return await fs.promises.writeFile(this.path, JSON.stringify(aux))
        }

        } 

async deletProduct (deletbyId){
        try{
            const products = await this.getProducts();
           const deletedProduct = await products.filter((p) => p.id !== deletbyId)
           await fs.promises.writeFile(this.path, JSON.stringify(deletedProduct))
           return deletedProduct
        } catch (e){
            throw new Error (e.message);
        }
        }
}

async function main (){
    const manager = new ProductManager();
    await manager.addProduct("Escada", "Especially Elixir EDP 30 Ml", 90, "Imagen", "0023")
    await manager.addProduct ("Esca", "Espec0 Ml", 70, "Imagen", "0033")
    await manager.upDateProductId(1,{ description: "lola la vaca", price: 50})
    console.log (await manager.getProductsById(1))
    console.log (await manager.getProductsById(2))
    console.log (await manager.deletProduct(2))
}

main();
