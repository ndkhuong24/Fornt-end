var cart = {
  items: [],

  remove: function (id) {
    var index = this.items.findIndex(function (item) {
      return item.id == id;
    });
    this.items.splice(index, 1);
    this.saveToLocalStorage();
    this.renderCartItems();
  },
  clear: function () {
    this.items = [];
    this.saveToLocalStorage();
    this.renderCartItems();
  },
  amt_of: function (item) {
    // Calculate the amount of a product
  },
  
  saveToLocalStorage: function () {
    var json = JSON.stringify(this.items);
    localStorage.setItem("cart", json);
  },
  loadFromLocalStorage: function () {
    var json = localStorage.getItem("cart");
    this.items = json ? JSON.parse(json) : [];
  },
  renderCartItems: function () {
    var tbody = document.getElementById("cart-items");
    tbody.innerHTML = "";
    this.items.forEach(function (item) {
        var row = document.createElement("tr");
        row.innerHTML = `
                <td>${item.id}</td>
                <td><img  src="https://192.168.109.128${item.path}" class="img-fluid" alt="" style="width: 100px;"></td>
                <td>${item.name}</td>
                <td>${item.price}</td>
               <td>
                  <input onchange="updateQuantity(${item.id}, this.value)" type="number" min="1" value="${item.qty}">
                </td>
                <td>${item.qty * item.price}</td>
                <td>
                    <button onclick="cart.remove(${item.id})" class="btn btn-sm btn-danger">
                        delete
                    </button>
                </td>
         `;
        tbody.appendChild(row);
    });
}
};

document.getElementById("clear-btn").addEventListener("click", function () {
  cart.clear();
});

document.addEventListener("DOMContentLoaded", function () {
  cart.loadFromLocalStorage();
  cart.renderCartItems();
});
function showNotification(message) {
  console.log(message);
  notificationText.textContent = message;
  notification.style.display = "block";
  setTimeout(function () {
    notification.style.display = "none";
  }, 3000);
}
function updateQuantity(itemId, newQuantity) {
  // Find the item in the cart
  var item = cart.items.find(function (item) {
    return item.id === itemId;
  });

  // Update the quantity
  var availableQuantity = item.quantity; // Assuming the available quantity is stored in the 'quantity' property of the item

  if (parseInt(newQuantity) >= availableQuantity) {
    showNotification("số lượng trong kho ko đủ ")
    item.qty = parseInt(item.quantity);
    cart.saveToLocalStorage();
    cart.renderCartItems();
    return;
  } else {
    item.qty = parseInt(newQuantity);
    cart.saveToLocalStorage();
    cart.renderCartItems();
  }
}
