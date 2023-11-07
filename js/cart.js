const cart = {
    items: [],
    add(id) {
       
        const item = this.items.find(item => item.id ==id);
        if (item) {
            if(item.qty==item.quantity){
                alert("Số lượng trong kho ko đủ ")
            }else {
            item.qty++;
            this.saveToLocalStorage();
            this.updateCountAndAmount();}
        } else {
            // Make a request to fetch the product data
            // Replace the API URL with the appropriate endpoint
            fetch(`https://192.168.109.128/api/ProductDetail/getById/${id}`)
                .then(response => response.json())
                .then(data => {
                    data.qty = 1;
                    this.items.push(data);
                    this.saveToLocalStorage();
                    this.updateCountAndAmount();
                });
        }
    },
    updateCountAndAmount() {
        const countElement = document.getElementById("cart-count");
        const amountElement = document.getElementById("cart-amount");
        countElement.textContent = this.count;
        amountElement.textContent = this.amount;
    },
    
    amt_of(item) {
        // Calculate the amount of a single item
        // based on its quantity and price
        return item.qty * item.price;
    },
    get count() {
        // Calculate the total count of items in the cart
        return this.items.reduce((total, item) => total + item.qty, 0);
    },
    get amount() {
        // Calculate the total amount of items in the cart
        return this.items.reduce((total, item) => total + (item.qty * item.price), 0);
    },
    saveToLocalStorage() {
        // Save the cart to local storage
        const json = JSON.stringify(this.items);
        localStorage.setItem("cart", json);
    },
    loadFromLocalStorage() {
        // Load the cart from local storage
        const json = localStorage.getItem("cart");
        this.items = json ? JSON.parse(json) : [];

        const countElement = document.getElementById("cart-count");
        const amountElement = document.getElementById("cart-amount");
        countElement.textContent = this.count;
        amountElement.textContent = this.amount;
    }
};
function showNotification(message) {
    console.log(message);
    notificationText.textContent = message;
    notification.style.display = "block";
    setTimeout(function () {
      notification.style.display = "none";
    }, 3000);
  }
// Attach event listeners and initialize the cart
document.addEventListener("DOMContentLoaded", function () {
    const listElement = document.getElementById("list");
    const cartLinkElement = document.getElementById("cart-link");
    cartLinkElement.addEventListener("click", function (event) {
        event.preventDefault();

        window.location.href = this.getAttribute("href");
    });

    // Load the cart from local storage
    cart.loadFromLocalStorage();
});