class ProductManager {

    #NextID= 0;
    #precioBaseDeGanancia
    
    constructor () {
    this.products = []
    this.#precioBaseDeGanancia = 0.15
}


getProducts = () => {return console.log(this.products) }
    
    addProduct = (name, description, price, thumbnail, stock) => {
    let id = this.#NextID += 1;

    const product ={
    
    id: id,
    
    name,
    
    description,
    
    price: price * (1 + this.#precioBaseDeGanancia),
    
    thumbnail,
    
    stock: [10]
    
    }
 
    this.products.push(product)
    }

    getProductsById = (getbyId) =>{
        const buscar = this.products.find(product => product.id == getbyId)
        if(buscar == undefined) return console.log("not found")
        else (console.log(buscar))
    }

}

const manager = new ProductManager()

manager.addProduct ("Escada", "Especially Elixir EDP 30 Ml", 600, "Imagen")
manager.addProduct ("NINA RICCI", "Les Sorbet Bella EDT 80 Ml", 800, "Imagen")
manager.addProduct ("Escada", "Especially Elixir EDP 30 Ml", 600, "Imagen")
manager.addProduct ("NINA RICCI", "Les Sorbet Bella EDT 80 Ml", 800, "Imagen")
// manager.getProductsById(1)
// manager.getProductsById(4)
// manager.getProductsById(1)
manager.getProducts()