let myStore = new Store(1, "abc");
let remeberLogin;
let currentLogin, cartProducts;
navToLoginPage();
getFromLocalStore();


function navToHomePage() {
    document.getElementById("home").innerHTML = `
    <h3>Danh Sách Sản Phẩm</h3>
    <table border="1">
            <tr>
                <th>ID</th>
                <th>Tên</th>
                <th>Ảnh</th>
                <th>Mô tả</th>
                <th>Giá</th>
                <th>Số lượng</th>
                <th colspan="2">Tương tác</th>
            </tr>
            <tbody id="product"></tbody>
        </table>`;
    getAllProducts();
}
function loginToHomePage() {
    updateFromLocal();
    let users = myStore.getUsers();
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    for (let i = 0; i < users.length; i++) {
        if (username == users[i].username && password == users[i].password) {
            if (!users[i].statusAccount) {
                alert("Tài khoản đã tạm khoá, liên hệ với ADMIN để được tư vấn");
                return;
            }
            currentLogin = users[i];
            myStore.listUser[i].statusOnline = "Online";
            myStore.listUser[i].myCart = [];
            alert("Đăng nhập thành công");
            if (users[i].role == "ADMIN") {
                document.getElementById("my-info").innerHTML = `
                <h4>xin chào ${username} <img src="${users[i].image}" alt="avatar" width="30" height="30"></h4>
                <button onclick="navToProfile()">Profile</button>
                <button onclick="logout(${i})">Đăng xuất</button>
                <button onclick="usersManage()">QL.Users</button>
                `;
                document.getElementById("login").innerHTML = `
                <h1>Quản Lý Sản Phẩm</h1>
                <button onclick="navToHomePage()">Trang chủ</button>
                <button onclick="">Yêu cầu</button>
                <button onclick="navToAddPage()">Thêm</button>
                <button onclick="navToSearchProducts()">Tìm kiếm</button>
                <div id="home"></div>
                `;
            }
            else {
                document.getElementById("my-info").innerHTML = `
                <h4>xin chào ${username} <img src="${users[i].image}" alt="avatar" width="30" height="30"></h4>
                <button onclick="navToProfile()">Profile</button>
                <button onclick="logout(${i})">Đăng xuất</button>
                <button onclick="">LS.Mua sắm</button>
                `;
                document.getElementById("login").innerHTML = `
                <h1>Mua Sắm Thả Ga, Không Lo Về Giá</h1>
                <button onclick="navToHomePage()">Trang chủ</button>
                <button onclick="navToUsersCart()">Giỏ hàng</button>
                <button onclick="navToSearchProducts()">Tìm kiếm</button>
                <div id="home"></div>
                `;
            }
            saveInToLocalStore();
            return;
        }
    }
    alert("Tài khoản hoặc mật khẩu không chính xác");
}
function navToRegisterPage() {
    document.getElementById("login").innerHTML = `
        <h1>Đăng ký tài khoản</h1>
        <p>Tài khoản: <input type="text" id="username"></p>
        <p>Mật khẩu: <input type="password" id="password"></p>
        <p>Email: <input type="email" id="email"></p>
        <p>Xác nhận mật khẩu: <input type="password" id="confirm-password"></p>
        <button onclick="addUsers()">Đăng ký</button>
        <p>Đã có tài khoản ? <a href="#" onclick="navToLoginPage()">Đăng nhập ngay</a></p>    
    `;
}
function navToForgetPasswordPage() {
    document.getElementById("login").innerHTML = `
        <h1>Khôi phục mật khẩu</h1>
        <p><input type="text" id="username" placeholder="Tài khoản"></p>
        <p><input type="email" id="email" placeholder="Email đã đăng ký"></p>
        <p><input type="password" id="password" placeholder="Mật khẩu mới"></p>
        <p><input type="password" id="confirm-password" placeholder="Nhập lại mật khẩu mới"></p>
        <button onclick="restoreUsersPassword()">Xác nhận</button>  
    `;
}
function navToAddPage() {
    document.getElementById("home").innerHTML = `
        <h3>Thêm Sản Phẩm</h3>
        <input type="text" placeholder="Tên" id="nameP">
        <br>
        <br>
        <input type="number" placeholder="Giá" id="price">
        <br>
        <br>
        <input type="number" placeholder="Số lượng" id="quantity">
        <br>
        <br>
        <input type="text" placeholder="Ảnh sản phẩm" id="image">
        <br>
        <br>
        <input type="text" placeholder="Mô tả" id="description">
        <br>
        <br>
        <button onClick="addProducts()">Lưu</button>
    `;
}
function navToEditPage(index) {
    document.getElementById("home").innerHTML = `
        <h3>Sửa Sản Phẩm</h3>
        <input type="text" placeholder="Tên" id="nameP" value="${myStore.listProduct[index].name}">
        <br>
        <br>
        <input type="number" placeholder="Giá" id="price" value="${myStore.listProduct[index].price}">
        <br>
        <br>
        <input type="number" placeholder="Số lượng" id="quantity" value="${myStore.listProduct[index].quantity}">
        <br>
        <br>
        <input type="text" placeholder="Ảnh sản phẩm" id="image" value="${myStore.listProduct[index].image}">
        <br>
        <br>
        <input type="text" placeholder="Mô tả" id="description" value="${myStore.listProduct[index].description}">
        <br>
        <br>
        <button onClick="editProducts(${index})">Lưu</button>
    `;
}
function navToSearchProducts() {
    document.getElementById("home").innerHTML = `
        <h3>Tìm Kiếm Sản Phẩm</h3>
        <select id="search" onchange="navToSearchMethod()">
            <option value="">Tìm kiếm theo</option>
            <option value="a">Theo tên</option>
            <option value="b">Theo mức giá</option>
            <option value="c">Theo lượng tồn kho</option>
        </select>
        <div id="searchResult"></div>
    `;
}
function navToSearchMethod() {
    let input = document.getElementById("search").value
    switch (input) {
        case "a":
            document.getElementById("home").innerHTML = `
            <h3>Tìm Kiếm Sản Phẩm Theo Tên</h3>
            <input type="text" placeholder="Tên sản phẩm..." id="ten" oninput="searchByName()">
            <select id="search" onchange="navToSearchMethod()">
                <option value="a">Theo tên</option>
                <option value="b">Theo mức giá</option>
                <option value="c">Theo lượng tồn kho</option>
            </select>
            <div id="searchResult"></div>
            `;
            break;
        case "b":
            document.getElementById("home").innerHTML = `
            <h3>Tìm Kiếm Sản Phẩm Theo Khoảng Giá</h3>
            <input type="text" placeholder="Từ..." id="begin">
            <input type="text" placeholder="Đến..." id="end">
            <select id="search" onchange="navToSearchMethod()">
                <option value="b">Theo mức giá</option>
                <option value="a">Theo tên</option>
                <option value="c">Theo lượng tồn kho</option>
            </select>
            <br>
            <button onclick="searchByPrice()">Tìm kiếm !!!</button>
            <div id="searchResult"></div>
            `;
            break;
        case "c":
            document.getElementById("home").innerHTML = `
            <h3>Tìm Kiếm Sản Phẩm Theo Khoảng Tồn Kho</h3>
            <input type="text" placeholder="Từ..." id="begin">
            <input type="text" placeholder="Đến..." id="end">
            <select id="search" onchange="navToSearchMethod()">
                <option value="c">Theo lượng tồn kho</option>
                <option value="a">Theo tên</option>
                <option value="b">Theo mức giá</option>
            </select>
            <br>
            <button onclick="searchByQuantity()">Tìm kiếm !!!</button>
            <div id="searchResult"></div>
            `;
            break;
    }
}
function navToLoginPage() {
    document.getElementById("login").innerHTML = `
        <h1>Chào mừng đến với Shoppe</h1>
        <p>Tài khoản: <input type="text" id="username"></p>
        <p>Mật khẩu: <input type="password" id="password"></p>
        <button id="savelogin" onclick="rememberMe()">Lưu đăng nhập</button>
        <button onclick="loginToHomePage()">Đăng nhập</button>
        <br>
        <p>Bạn chưa có tài khoản ? <a href="#" onclick="navToRegisterPage()">Đăng ký ngay</a>. Hoặc <a href="#" onclick="navToForgetPasswordPage()">Quên mật khẩu ?</a></p>
    `
}
function navToProfile() {
    document.getElementById("home").innerHTML = `
        <h3>Profile của ${currentLogin.username}</h4>
        <img src="${currentLogin.image}" alt="Avatar" width="225" height="182">
        <br>
        <input type="password" id="password" placeholder="Password" value="${currentLogin.password}">
        <br>
        <br>
        <input type="email" id="email" placeholder="Email" value="${currentLogin.email}">
        <br>
        <br>
        <input type="text" id="image" placeholder="Avatar" value="${currentLogin.image}">
        <br>
        <br>
        <button onclick="saveprofile()">Lưu</button>
    `;
}
function navToUsersCart() {
    if (cartProducts.length == 0) {
        document.getElementById("home").innerHTML = "<h3>Bạn chưa thêm mặt hàng nào vào giỏ</h3>";
        return;
    }
    let totalBill = 0;
    let html = `
        <h3>Giỏ hàng của tôi</h3>
        <table border="1">
            <tr>
                <th>Tên</th>
                <th>Ảnh</th>
                <th>Giá</th>
                <th>Số lượng</th>
                <th>Thành tiền</th>
                <th colspan="3">Hành động</th>
            </tr>
        `;
    for (let i = 0; i < cartProducts.length; i++) {
        html += `
            <tr>
                <td>${cartProducts[i].name}</td>
                <td><img src="${cartProducts[i].image}" alt="${cartProducts[i].name}" width="60" height="50"></td>
                <td>${cartProducts[i].price}</td>
                <td>${cartProducts[i].quantity}</td>
                <td>${cartProducts[i].quantity * cartProducts[i].price}</td>
                <td><button onclick="plusProducts(${i})">Thêm</button></td>
                <td><button onclick="minusProducts(${i})">Bớt</button></td>
                <td><button onclick="cancelProducts(${i})">Loại bỏ</button></td>
            </tr>
        `;
        totalBill += cartProducts[i].quantity * cartProducts[i].price;
    }
    html += `
        </table>
        <h3>Tổng cộng hoá đơn: ${totalBill}</h3>
        <button onclick="checkOut(${totalBill})">Thanh toán</button>
    `;
    document.getElementById("home").innerHTML = html;
}
function navToHistoryCheckOut() {
    
}
function searchByName() {
    updateFromLocal();
    let input = document.getElementById("ten").value.toLowerCase();
    if (input == "") {
        document.getElementById("searchResult").innerHTML = "";
        return;
    }
    let html = `
        <h3>Danh Sách Sản Phẩm</h3>
        <table border="1">
            <tr>
                <th>Tên</th>
                <th>Ảnh</th>
                <th>Mô tả</th>
                <th>Giá</th>
                <th>Số lượng</th>
                <th colspan="2">Hành động</th>
            </tr>
        `;
    for (let i = 0; i < myStore.listProduct.length; i++) {
        let data = myStore.listProduct[i].name.toLowerCase();
        if (data.includes(input)) {
            if (currentLogin.role == "ADMIN") {
                html += `
                <tr>
                    <td>${myStore.listProduct[i].name}</td>
                    <td><img src="${myStore.listProduct[i].image}" alt="${myStore.listProduct[i].name}" width="60" height="50"></td>
                    <td>${myStore.listProduct[i].description}</td>
                    <td>${myStore.listProduct[i].price}</td>
                    <td>${myStore.listProduct[i].quantity}</td>
                    <td><button onclick="navToEditPage(${i})">Sửa</button></td>
                    <td><button onclick="removeProducts(${i})">Xoá</button></td>
                </tr>
            `;
            }
            else {
                html += `
                <tr>
                    <td>${myStore.listProduct[i].name}</td>
                    <td><img src="${myStore.listProduct[i].image}" alt="${myStore.listProduct[i].name}" width="60" height="50"></td>
                    <td>${myStore.listProduct[i].description}</td>
                    <td>${myStore.listProduct[i].price}</td>
                    <td>${myStore.listProduct[i].quantity}</td>
                    <td><button onclick="addToCart(${i})">Thêm vào giỏ</button></td>
                </tr>
            `;
            }
        }
    }
    html += "</table>";
    document.getElementById("searchResult").innerHTML = html;
}
function searchByPrice() {
    updateFromLocal();
    let inputBegin = +document.getElementById("begin").value;
    let inputEnd = +document.getElementById("end").value;
    let html = `
        <h3>Danh Sách Sản Phẩm</h3>
        <table border="1">
            <tr>
                <th>Tên</th>
                <th>Ảnh</th>
                <th>Mô tả</th>
                <th>Giá</th>
                <th>Số lượng</th>
                <th colspan="2">Hành động</th>
            </tr>
        `;
    for (let i = 0; i < myStore.listProduct.length; i++) {
        let data = myStore.listProduct[i].price;
        if (((inputBegin <= 0 && inputEnd >= 0) && data == "Miễn phí") || (data >= inputBegin && data <= inputEnd)) {
            if (currentLogin.role == "ADMIN") {
                html += `
                <tr>
                    <td>${myStore.listProduct[i].name}</td>
                    <td><img src="${myStore.listProduct[i].image}" alt="${myStore.listProduct[i].name}" width="60" height="50"></td>
                    <td>${myStore.listProduct[i].description}</td>
                    <td>${myStore.listProduct[i].price}</td>
                    <td>${myStore.listProduct[i].quantity}</td>
                    <td><button onclick="navToEditPage(${i})">Sửa</button></td>
                    <td><button onclick="removeProducts(${i})">Xoá</button></td>
                </tr>
            `;
            }
            else {
                html += `
                <tr>
                    <td>${myStore.listProduct[i].name}</td>
                    <td><img src="${myStore.listProduct[i].image}" alt="${myStore.listProduct[i].name}" width="60" height="50"></td>
                    <td>${myStore.listProduct[i].description}</td>
                    <td>${myStore.listProduct[i].price}</td>
                    <td>${myStore.listProduct[i].quantity}</td>
                    <td><button onclick="addToCart(${i})">Thêm vào giỏ</button></td>
                </tr>
            `;
            }
        }
    }
    html += "</table>";
    document.getElementById("searchResult").innerHTML = html;
}
function searchByQuantity() {
    updateFromLocal();
    let inputBegin = +document.getElementById("begin").value;
    let inputEnd = +document.getElementById("end").value;
    let html = `
        <h3>Danh Sách Sản Phẩm</h3>
        <table border="1">
            <tr>
                <th>Tên</th>
                <th>Ảnh</th>
                <th>Mô tả</th>
                <th>Giá</th>
                <th>Số lượng</th>
                <th colspan="2">Hành động</th>
            </tr>
        `;
    for (let i = 0; i < myStore.listProduct.length; i++) {
        let data = myStore.listProduct[i].quantity;
        if (((inputBegin <= 0 && inputEnd >= 0) && data == "Hết hàng") || (data >= inputBegin && data <= inputEnd)) {
            if (currentLogin.role == "ADMIN") {
                html += `
                <tr>
                    <td>${myStore.listProduct[i].name}</td>
                    <td><img src="${myStore.listProduct[i].image}" alt="${myStore.listProduct[i].name}" width="60" height="50"></td>
                    <td>${myStore.listProduct[i].description}</td>
                    <td>${myStore.listProduct[i].price}</td>
                    <td>${myStore.listProduct[i].quantity}</td>
                    <td><button onclick="navToEditPage(${i})">Sửa</button></td>
                    <td><button onclick="removeProducts(${i})">Xoá</button></td>
                </tr>
            `;
            }
            else {
                html += `
                <tr>
                    <td>${myStore.listProduct[i].name}</td>
                    <td><img src="${myStore.listProduct[i].image}" alt="${myStore.listProduct[i].name}" width="60" height="50"></td>
                    <td>${myStore.listProduct[i].description}</td>
                    <td>${myStore.listProduct[i].price}</td>
                    <td>${myStore.listProduct[i].quantity}</td>
                    <td><button onclick="addToCart(${i})">Thêm vào giỏ</button></td>
                </tr>
            `;
            }
        }
    }
    html += "</table>";
    document.getElementById("searchResult").innerHTML = html;
}
function getAllProducts() {
    updateFromLocal();
    let list = myStore.displayProducts();
    let html = "";
    for (let i = 0; i < list.length; i++) {
        if (currentLogin.role == "ADMIN") {
            html += `
                <tr>
                    <td>${i + 1}</td>
                    <td>${list[i].name}</td>
                    <td><img src="${list[i].image}" alt="${list[i].name}" width="60" height="50"></td>
                    <td>${list[i].description}</td>
                    <td>${list[i].price}</td>
                    <td>${list[i].quantity}</td>
                    <td><button onclick="navToEditPage(${i})">Sửa</button></td>
                    <td><button onclick="removeProducts(${i})">Xoá</button></td>
                </tr>
                `;
        }
        else {
            html += `
                <tr>
                    <td>${i + 1}</td>
                    <td>${list[i].name}</td>
                    <td><img src="${list[i].image}" alt="${list[i].name}" width="60" height="50"></td>
                    <td>${list[i].description}</td>
                    <td>${list[i].price}</td>
                    <td>${list[i].quantity}</td>
                    <td><button onclick="addToCart(${i})">Thêm vào giỏ</button></td>
                </tr>
                `;
        }
    }
    document.getElementById("product").innerHTML = html;
}
function addProducts() {
    let id = myStore.listProduct.length;
    let name = document.getElementById("nameP").value;
    let image = document.getElementById("image").value;
    let description = document.getElementById("description").value != "" ? document.getElementById("description").value : "Chưa có";
    let price = document.getElementById("price").value > 0 ? document.getElementById("price").value : "Miễn phí";
    let quantity = document.getElementById("quantity").value > 0 ? document.getElementById("quantity").value : "Hết hàng";
    if (checkNullOfProducts(name)) {
        alert("Vui lòng điền đầy đủ thông tin sản phẩm");
        return;
    }
    if (!checkExitOfProducts(name)) {
        myStore.addProducts(id, name, price, quantity, image, description);
        saveInToLocalStore();
        navToHomePage();
    }
    else
        alert("Sản phẩm đã tồn tại");
}
function addUsers() {
    updateFromLocal();
    let users = myStore.getUsers();
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let re_password = document.getElementById("confirm-password").value;
    let email = document.getElementById("email").value;
    if (username == "" || password == "" || email == "") {
        alert("Vui lòng điền đầy đủ các trường");
        return;
    }
    if (re_password != password) {
        alert("Mật khẩu xác nhận không khớp với mật khẩu");
        return;
    }
    else if (password.length < 6) {
        alert("Mật khẩu phải có từ 6 ký tự trở lên");
        return;
    }
    for (let i = 0; i < users.length; i++) {
        if (username == users[i].username) {
            alert("Tài khoản đã tồn tại");
            return;
        }
        else if (email == users[i].email) {
            alert("Email đã tồn tại");
            return;
        }
    }
    myStore.addUsers(username, password, email);
    alert("Đăng ký tài khoản thành công !");
    saveInToLocalStore();
    navToLoginPage();
}
function removeProducts(index) {
    if (confirm("Bạn có muốn xoá " + myStore.listProduct[index].name)) {
        alert("Đã xoá " + myStore.listProduct[index].name + " khỏi cửa hàng");
        myStore.deleteProducts(index);
        saveInToLocalStore();
        navToHomePage();
    }
}
function removeUsers(index) {
    if (confirm("Bạn có muốn xoá " + myStore.listUser[index].username)) {
        myStore.deleteUsers(index);
        saveInToLocalStore();
        usersManage();
    }
}
function editProducts(index) {
    let name = document.getElementById("nameP").value;
    let image = document.getElementById("image").value;
    let description = document.getElementById("description").value != undefined ? document.getElementById("description").value : "Chưa có";
    let price = document.getElementById("price").value > 0 ? document.getElementById("price").value : "Miễn phí";
    let quantity = document.getElementById("quantity").value > 0 ? document.getElementById("quantity").value : "Hết hàng";
    if (checkNullOfProducts(name)) {
        alert("Vui lòng điền đầy đủ thông tin sản phẩm");
        return;
    }
    myStore.modifiProducts(name, price, quantity, image, description, index);
    saveInToLocalStore();
    navToHomePage();
}
function restoreUsersPassword() {
    let users = myStore.getUsers();
    let username = document.getElementById("username").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let re_password = document.getElementById("confirm-password").value;
    for (let i = 0; i < users.length; i++) {
        if ((username == users[i].username && email == users[i].email) && (password.length >= 6 && re_password == password)) {
            alert("Khôi phục mật khẩu thành công");
            myStore.listUser[i].password = password;
            saveInToLocalStore();
            navToLoginPage();
            return;
        }
    }
    alert("Khôi phục thất bại");
    navToLoginPage();
}
function saveInToLocalStore() {
    let data = JSON.stringify(myStore.listProduct);
    let users_data = JSON.stringify(myStore.listUser);
    let productOfCart = JSON.stringify(cartProducts);
    localStorage.setItem("MyShopee", data);
    localStorage.setItem("UserStore", users_data);
    localStorage.setItem("CartProduct", productOfCart);
}
function rememberMe() {
    remeberLogin = !remeberLogin;
    localStorage.setItem("RememberLogin", remeberLogin);
    if (remeberLogin) {
        localStorage.setItem("Username", document.getElementById("username").value);
        localStorage.setItem("Password", document.getElementById("password").value);
        alert("Đã lưu thông tin đăng nhập");
    }
    else {
        localStorage.removeItem("Username");
        localStorage.removeItem("Password");
        alert("Đã huỷ lưu thông tin đăng nhập");
    }
}
function getFromLocalStore() {
    let loginData = localStorage.getItem("RememberLogin");
    updateFromLocal();
    if (loginData) {
        remeberLogin = loginData;
        if (remeberLogin) {
            document.getElementById("username").value = localStorage.getItem("Username");
            document.getElementById("password").value = localStorage.getItem("Password");
        }
    }
    else {
        remeberLogin = false;
        localStorage.setItem("RememberLogin", remeberLogin);
    }
}
function updateFromLocal() {
    let data = localStorage.getItem("MyShopee");
    let users_data = localStorage.getItem("UserStore");
    let productOfCart = localStorage.getItem("CartProduct");
    if (data) {
        myStore.listProduct = JSON.parse(data);
    }
    else {
        myStore.listProduct = [];
        saveInToLocalStore();
    }
    if (users_data) {
        myStore.listUser = JSON.parse(users_data);
    }
    else {
        let admin = new User("BanhUTC", "1234utc", "abc@gmail.com", "ADMIN");
        myStore.listUser.push(admin);
        saveInToLocalStore();
    }
    if (productOfCart) {
        cartProducts = JSON.parse(productOfCart);
    }
    else {
        cartProducts = [];
        saveInToLocalStore();
    }
}
function saveprofile() {
    currentLogin.password = document.getElementById("password").value != "" ? document.getElementById("password").value : currentLogin.password;
    currentLogin.email = document.getElementById("email").value != "" ? document.getElementById("email").value : currentLogin.email;
    currentLogin.image = document.getElementById("image").value;
    for (let i = 0; i < myStore.listUser.length; i++) {
        if (currentLogin.username == myStore.listUser[i].username) {
            myStore.listUser[i].password = currentLogin.password;
            myStore.listUser[i].email = currentLogin.email;
            myStore.listUser[i].image = currentLogin.image;
            saveInToLocalStore();
        }
    }
    alert("Cập nhật thông tin thành công");
    if (currentLogin.role == "ADMIN") {
        document.getElementById("my-info").innerHTML = `
                <h4>xin chào ${currentLogin.username} <img src="${currentLogin.image}" alt="avatar" width="30" height="30"></h4>
                <button onclick="navToProfile()">Profile</button>
                <button onclick="logout()">Đăng xuất</button>
                <button onclick="usersManage()">QL.Users</button>
                `;
        document.getElementById("login").innerHTML = `
                <h1>Quản Lý Sản Phẩm</h1>
                <button onclick="navToHomePage()">Trang chủ</button>
                <button>Yêu cầu</button>
                <button onclick="navToAddPage()">Thêm</button>
                <button onclick="navToSearchProducts()">Tìm kiếm</button>
                <div id="home"></div>
                `;
    }
    else {
        document.getElementById("my-info").innerHTML = `
                <h4>xin chào ${currentLogin.username} <img src="${currentLogin.image}" alt="avatar" width="30" height="30"></h4>
                <button onclick="navToProfile()">Profile</button>
                <button onclick="logout()">Đăng xuất</button>
                `;
        document.getElementById("login").innerHTML = `
                <h1>Mua sắm tiện ích</h1>
                <button onclick="navToHomePage()">Trang chủ</button>
                <button>Giỏ hàng</button>
                <button onclick="navToSearchProducts()">Tìm kiếm</button>
                <div id="home"></div>
                `;
    }
}
function usersManage() {
    updateFromLocal();
    let users = myStore.getUsers();
    let html = `
        <h3>Danh Sách Người Dùng</h3>
        <table border="1">
            <tr>
                <th>Id</th>
                <th>Username</th>
                <th>Avatar</th>
                <th>Trạng thái</th>
                <th colspan="2">Hành động</th>
            </tr>
        `;
    for (let i = 1; i < users.length; i++) {
        html += `
            <tr>
                <td>${i}</td>
                <td>${users[i].username}</td>
                <td><img src="${users[i].image}" alt="${users[i].username}" width="60" height="50"></td>
                <td>${users[i].statusOnline}</td>
            `;
        if (users[i].statusAccount) {
            html += `
                <td><button onclick="lockAndUnlockAccount(${i})">Khoá</button></td>
                <td><button onclick="removeUsers(${i})">Xoá</button></td>
            </tr>
            `;
        }
        else {
            html += `
                <td><button onclick="lockAndUnlockAccount(${i})">Mở khoá</button></td>
                <td><button onclick="removeUsers(${i})">Xoá</button></td>
            </tr>
            `;
        }
    }
    html += "</table>";
    document.getElementById("home").innerHTML = html;
}
function lockAndUnlockAccount(index) {
    if (myStore.listUser[index].statusAccount) {
        if (confirm("Bạn có chắc chắn muốn khoá " + myStore.listUser[index].username)) {
            myStore.listUser[index].statusAccount = false;
            saveInToLocalStore();
            usersManage();
        }
    }
    else {
        if (confirm("Bạn có muốn mở khoá " + myStore.listUser[index].username)) {
            myStore.listUser[index].statusAccount = true;
            saveInToLocalStore();
            usersManage();
        }
    }
}
function addToCart(index) {
    updateFromLocal();
    let product = myStore.listProduct[index];
    if (product.quantity == "Hết hàng") {
        alert(product.name + " đã hết hàng");
        return;
    }
    for (let i = 0; i < cartProducts.length; i++) {
        if (product.name == cartProducts[i].name) {
            cartProducts[i].quantity++;
            myStore.listProduct[index].quantity--;
            if (myStore.listProduct[index].quantity == 0)
                myStore.listProduct[index].quantity = "Hết hàng";
            saveInToLocalStore();
            navToHomePage();
            return;
        }
    }
    cartProducts.push(new ProductsOfCart(product.name, product.price == "Miễn phí" ? 0 : parseInt(product.price), 1, product.image, product.description));
    myStore.listProduct[index].quantity--;
    if (myStore.listProduct[index].quantity == 0)
        myStore.listProduct[index].quantity = "Hết hàng";
    saveInToLocalStore();
    navToHomePage();
}
function cancelProducts(index) {
    updateFromLocal();
    for (let i = 0; i < myStore.listProduct.length; i++) {
        if (myStore.listProduct[i].name == cartProducts[index].name) {
            myStore.listProduct[i].quantity = myStore.listProduct[i].quantity == "Hết hàng" ? cartProducts[index].quantity : (myStore.listProduct[i].quantity + cartProducts[index].quantity);
            break;
        }
    }
    cartProducts.splice(index, 1);
    saveInToLocalStore();
    navToUsersCart();
}
function minusProducts(index) {
    updateFromLocal();
    for (let i = 0; i < myStore.listProduct.length; i++) {
        if (myStore.listProduct[i].name == cartProducts[index].name) {
            cartProducts[index].quantity--;
            if (myStore.listProduct[i].quantity == "Hết hàng") 
                myStore.listProduct[i].quantity = 1;
            else
                myStore.listProduct[i].quantity++;
            if (cartProducts[index].quantity == 0) {
                cartProducts.splice(index, 1);
                break;
            }
        }
    }
    saveInToLocalStore();
    navToUsersCart();
}
function plusProducts(index) {
    updateFromLocal();
    for (let i = 0; i < myStore.listProduct.length; i++) {
        if (myStore.listProduct[i].name == cartProducts[index].name) {
            if (myStore.listProduct[i].quantity == "Hết hàng") {
                alert(myStore.listProduct[i].name + " đã hết hàng");
                break;
            }
            myStore.listProduct[i].quantity--;
            if (myStore.listProduct[i].quantity == 0)
                myStore.listProduct[i].quantity = "Hết hàng";
            cartProducts[index].quantity++;
        }
    }
    saveInToLocalStore();
    navToUsersCart();
}
function checkOut(totalPrice) {
    updateFromLocal();
    let date = new Date();
    for (let i = 0; i < myStore.listUser.length; i++) {
        if (currentLogin.username == myStore.listUser[i].username) {
            myStore.listUser[i].myCart.push(new Cart(myStore.listUser[i].myCart.length + 1, date.toString(), currentLogin.username, totalPrice, cartProducts));
            alert("Thanh toán hoàn tất, hệ thống đang xử lý đơn hàng của bạn");
            cartProducts = [];
            saveInToLocalStore();
            break;
        }
    }
    navToUsersCart();
}
function logout(index) {
    updateFromLocal();
    if (confirm("Bạn có chắc chắn muốn đăng xuất ?")) {
        myStore.listUser[index].statusOnline = "Offline";
        saveInToLocalStore();
        navToLoginPage();
        document.getElementById("my-info").innerHTML = "";
        getFromLocalStore();
    }
}
function checkExitOfProducts(name) {
    for (let i = 0; i < myStore.listProduct.length; i++) {
        if (name.toLowerCase() == myStore.listProduct[i].name.toLowerCase())
            return true;
    }
    return false;
}
function checkNullOfProducts(name) {
    if (name.trim() == "")
        return true;
    return false;
}
