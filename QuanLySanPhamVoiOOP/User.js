class User {
    username;
    password;
    role;
    email;
    image;
    statusOnline;
    statusAccount;
    myCart;

    constructor(username, password, email, role) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.role = role;
        this.statusAccount = true;
        this.statusOnline = "Offline";
        this.image = "";
        this.myCart = [];
    }
}