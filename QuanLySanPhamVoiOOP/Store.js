class Store{
    id;
    name;
    listProduct;

    constructor(id, name){
        this.id = id;
        this.name = name;
        this.listProduct = [];
    }

    displayProducts(){
        return this.listProduct;
    }
    addProducts(id, name, price, quantity){
        this.listProduct.push(new Product(id, name, price, quantity));
    }
    deleteProducts(index){
        this.listProduct.splice(index, 1);
    }
    modifiProducts(name, price, quantity, index){
        this.listProduct[index].name = name;
        this.listProduct[index].price = price;
        this.listProduct[index].quantity = quantity;
    }
}