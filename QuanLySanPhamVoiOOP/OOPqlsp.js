let myStore = new Store(1, "abc");
getFromLocalStore();

function navToHomePage() {
    document.getElementById("home").innerHTML = `
    <h3>Danh Sách Sản Phẩm</h3>
    <table border="1">
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th colspan="2">Action</th>
            </tr>
            <tbody id="product"></tbody>
        </table>`;
    getAllProducts();
}
function navToAddPage() {
    document.getElementById("home").innerHTML = `
        <h3>Thêm Sản Phẩm</h3>
        <input type="text" placeholder="Name" id="nameP">
        <br>
        <br>
        <input type="number" placeholder="Price" id="price">
        <br>
        <br>
        <input type="number" placeholder="Quantity" id="quantity">
        <br>
        <br>
        <button onClick="addProducts()">Lưu</button>
    `;
}
function navToEditPage(index) {
    document.getElementById("home").innerHTML = `
        <h3>Sửa Sản Phẩm</h3>
        <input type="text" placeholder="Name" id="nameP" value="${myStore.listProduct[index].name}">
        <br>
        <br>
        <input type="number" placeholder="Price" id="price" value=${myStore.listProduct[index].price}>
        <br>
        <br>
        <input type="number" placeholder="Quantity" id="quantity" value=${myStore.listProduct[index].quantity}>
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
function searchByName() {
    let input = document.getElementById("ten").value.toLowerCase();
    if (input == ""){
        document.getElementById("searchResult").innerHTML = "";
        return;
    }
    let html = `
        <h3>Danh Sách Sản Phẩm</h3>
        <table border="1">
            <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
            </tr>
        `;
    for (let i = 0; i < myStore.listProduct.length; i++) {
        let data = myStore.listProduct[i].name.toLowerCase();
        if (data.includes(input)) {
            html += `
                <tr>
                    <td>${myStore.listProduct[i].name}</td>
                    <td>${myStore.listProduct[i].price}</td>
                    <td>${myStore.listProduct[i].quantity}</td>
                </tr>
            `;
        }
    }
    html += "</table>";
    document.getElementById("searchResult").innerHTML = html;
}
function searchByPrice() {
    let inputBegin = +document.getElementById("begin").value;
    let inputEnd = +document.getElementById("end").value;
    let html = `
        <h3>Danh Sách Sản Phẩm</h3>
        <table border="1">
            <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
            </tr>
        `;
    for (let i = 0; i < myStore.listProduct.length; i++) {
        let data = myStore.listProduct[i].price;
        if ((inputBegin <= 0 && inputEnd >= 0) && data == "Miễn phí") {
            html += `
                <tr>
                    <td>${myStore.listProduct[i].name}</td>
                    <td>${myStore.listProduct[i].price}</td>
                    <td>${myStore.listProduct[i].quantity}</td>
                </tr>
            `;
        }
        if (data >= inputBegin && data <= inputEnd) {
            html += `
                <tr>
                    <td>${myStore.listProduct[i].name}</td>
                    <td>${myStore.listProduct[i].price}</td>
                    <td>${myStore.listProduct[i].quantity}</td>
                </tr>
            `;
        }
    }
    html += "</table>";
    document.getElementById("searchResult").innerHTML = html;
}
function searchByQuantity() {
    let inputBegin = +document.getElementById("begin").value;
    let inputEnd = +document.getElementById("end").value;
    let html = `
        <h3>Danh Sách Sản Phẩm</h3>
        <table border="1">
            <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
            </tr>
        `;
    for (let i = 0; i < myStore.listProduct.length; i++) {
        let data = myStore.listProduct[i].quantity;
        if ((inputBegin <= 0 && inputEnd >= 0) && data == "Hết hàng") {
            html += `
                <tr>
                    <td>${myStore.listProduct[i].name}</td>
                    <td>${myStore.listProduct[i].price}</td>
                    <td>${myStore.listProduct[i].quantity}</td>
                </tr>
            `;
        }
        if (data >= inputBegin && data <= inputEnd) {
            html += `
                <tr>
                    <td>${myStore.listProduct[i].name}</td>
                    <td>${myStore.listProduct[i].price}</td>
                    <td>${myStore.listProduct[i].quantity}</td>
                </tr>
            `;
        }
    }
    html += "</table>";
    document.getElementById("searchResult").innerHTML = html;
}
function getAllProducts() {
    let list = myStore.displayProducts();
    let html = "";
    for (let i = 0; i < list.length; i++) {
        html += `
                <tr>
                    <td>${i + 1}</td>
                    <td>${list[i].name}</td>
                    <td>${list[i].price}</td>
                    <td>${list[i].quantity}</td>
                    <td><button onclick="navToEditPage(${i})">Sửa</button></td>
                    <td><button onclick="removeProducts(${i})">Xoá</button></td>
                </tr>
                `;
    }
    document.getElementById("product").innerHTML = html;
}
function addProducts() {
    let id = myStore.listProduct.length;
    let name = document.getElementById("nameP").value;
    let price = document.getElementById("price").value > 0 ? document.getElementById("price").value : "Miễn phí";
    let quantity = document.getElementById("quantity").value > 0 ? document.getElementById("quantity").value : "Hết hàng";
    if (checkNullOfProducts(name)) {
        alert("Vui lòng điền đầy đủ thông tin sản phẩm");
        return;
    }
    if (!checkExitOfProducts(name)) {
        myStore.addProducts(id, name, price, quantity);
        saveInToLocalStore();
        navToHomePage();
    }
    else
        alert("Sản phẩm đã tồn tại");
}
function removeProducts(index) {
    if (confirm("Bạn có muốn xoá " + myStore.listProduct[index].name)) {
        myStore.deleteProducts(index);
        saveInToLocalStore();
        getAllProducts();
    }
}
function editProducts(index) {
    let name = document.getElementById("nameP").value;
    let price = document.getElementById("price").value > 0 ? document.getElementById("price").value : "Miễn phí";
    let quantity = document.getElementById("quantity").value > 0 ? document.getElementById("quantity").value : "Hết hàng";
    if (checkNullOfProducts(name)) {
        alert("Vui lòng điền đầy đủ thông tin sản phẩm");
        return;
    }
    myStore.modifiProducts(name, price, quantity, index);
    saveInToLocalStore();
    navToHomePage();
}
function saveInToLocalStore() {
    let data = JSON.stringify(myStore.listProduct);
    localStorage.setItem("MyShopee", data);
}
function getFromLocalStore() {
    let data = localStorage.getItem("MyShopee");
    if (data) {
        myStore.listProduct = JSON.parse(data);
    }
    else {
        myStore.listProduct = [];
        saveInToLocalStore();
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
