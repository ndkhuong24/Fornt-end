const cart = {
  items: [],
  add(id) {

    const item = this.items.find(item => item.id == id);
    if (item) {
      if (item.qty == item.quantity) {
        alert("Số lượng trong kho ko đủ ")
      } else {
        item.qty++;
        this.saveToLocalStorage();
        this.updateCountAndAmount();
      }
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
  remove: function (id) {
    var index = this.items.findIndex(function (item) {
      return item.id == id;
    });
    this.items.splice(index, 1);
    this.saveToLocalStorage();
    this.renderCartItems();
    location.reload();
  },
  clear: function () {
    this.items = [];
    this.saveToLocalStorage();
    this.renderCartItems();
    location.reload();
  },
  amt_of(item) {
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
    const totalElement = document.getElementById("total")

    totalElement.textContent = this.amount + " vnd ";
    countElement.textContent = this.count;
    amountElement.textContent = this.amount;
  },
  renderCartItems: function () {
    var tbody = document.getElementById("cart-items");
    tbody.innerHTML = "";
    this.items.forEach(function (item) {
      var row = document.createElement("tr");
      row.innerHTML = `
                    <td><img  src="https://192.168.109.128${item.path}" class="img-fluid" alt="" style="width: 100px;"></td>
                    <td  style="font-weight: 600;text-decoration: underline;color: dodgerblue;">${item.name}</td>
                    <td>${item.price} VNĐ</td>
                   <td>
                      <input onchange="updateQuantity(${item.id}, this.value)" style="width:85px;text-align:center" type="number" min="1" value="${item.qty}">
                    </td>
                    <td>${item.qty * item.price} VNĐ</td>
                    <td>
                        <btn style="font-size: larger;font-weight: 500;margin-top:-4px;text-decoration: underline;color:red;" class="btn" onclick="cart.remove(${item.id})">Xóa
                        </btn>
                        
                    </td>
             `;
      tbody.appendChild(row);
    });
  }
};

function updateQuantity(itemId, newQuantity) {
  // Find the item in the cart
  var item = cart.items.find(function (item) {
    return item.id === itemId;
  });

  // Update the quantity
  var availableQuantity = item.quantity; // Assuming the available quantity is stored in the 'quantity' property of the item

  if (parseInt(newQuantity) == availableQuantity || parseInt(newQuantity) > availableQuantity) {
    showNotification("số lượng trong kho ko đủ ")
    item.qty = parseInt(availableQuantity - 1);
    cart.saveToLocalStorage();
    cart.renderCartItems();

    return;
  } else {
    item.qty = parseInt(newQuantity);
    cart.saveToLocalStorage();
    cart.renderCartItems();
    location.reload();
  }
}
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
  cart.loadFromLocalStorage();
  cart.renderCartItems();
});