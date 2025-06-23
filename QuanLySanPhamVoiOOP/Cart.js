class Cart {
    listProductAdded;
    statusPayment;
    orderNo;
    orderDate;
    billName;
    totalPrice;

    constructor(orderNo, orderDate, billName, totalPrice, listProductAdded) {
        this.orderNo = orderNo;
        this.orderDate = orderDate;
        this.billName = billName;
        this.totalPrice = totalPrice;
        this.listProductAdded = listProductAdded;
        this.statusPayment = "Chờ xử lý";
    }
}