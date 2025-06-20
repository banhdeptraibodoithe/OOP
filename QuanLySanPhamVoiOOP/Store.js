class Store{
    id;
    name;
    listProduct;
    listUser;

    constructor(id, name){
        this.id = id;
        this.name = name;
        this.listProduct = [];
        this.listUser = [];
    }

    displayProducts() {
        return this.listProduct;
    }
    getUsers() {
        return this.listUser;
    }
    addProducts(id, name, price, quantity, image, description) {
        this.listProduct.push(new Product(id, name, price, quantity, image, description));
    }
    addUsers(username, password, email) {
        this.listUser.push(new User(username, password, email, "USER"));
    }
    deleteProducts(index) {
        this.listProduct.splice(index, 1);
    }
    deleteUsers(index) {
        this.listUser.splice(index, 1);
    }
    modifiProducts(name, price, quantity, image, description, index) {
        this.listProduct[index].name = name;
        this.listProduct[index].image = image;
        this.listProduct[index].description = description;
        this.listProduct[index].price = price;
        this.listProduct[index].quantity = quantity;
    }
}