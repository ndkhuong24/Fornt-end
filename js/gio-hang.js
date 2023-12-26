function showNotification(message) {
  var notification = document.getElementById("notification");
  var notificationText = document.getElementById("notification-text");

  notificationText.textContent = message;
  notification.style.display = "block";

  setTimeout(function () {
    notification.style.display = "none";
  }, 3000);
}

const routes = "/nike.html";

// Hàm để cập nhật nội dung trang dựa trên URL hiện tại.
function updateContent() {
  const path = window.location.pathname;
  const contentDiv = document.getElementById("content");

  if (routes[path]) {
    contentDiv.textContent = routes[path];
  } else {
  }
}

window.addEventListener("popstate", updateContent);

updateContent();

function onlyOne(checkbox) {
  var checkboxes = document.getElementsByName("check");
  checkboxes.forEach((item) => {
    if (item !== checkbox) item.checked = false;
  });
}

function tinhTongTien() {
  var soLuong = parseInt(document.getElementById("quantity").value);
  var giaTien = parseInt(
    document
      .getElementsByClassName("price")[0]
      .innerHTML.replace(" vnđ", "")
      .replace(".", "")
  );
  var tongTien = soLuong * giaTien;
  // Hiển Thị Tông Tiền Lên form:
  document.getElementById("tongTien").innerHTML =
    tongTien.toLocaleString() + "vnđ";
}

const productDivs = document.querySelectorAll(".product");
//khởi tạo biến tổng tiền:
let total = 0;
//Lặp qua từng thẻ div và tính tổng tiền;
productDivs.forEach((div) => {
  //Trích Xuất giá trị tiền sản phẩm từ văn bản trong thẻ div:
  const text = div.textContent;
  //Sử Dụng biểu thức chính quy để tìm số nguyên trong văn bản:
  const priceMatch = text.match(/\$\d+/);
  if (priceMatch) {
    //Loại bỏ kí tự "$" và chuyển đổi thành số nguyên
    const price = parseInt(priceMatch[0].slice(1));
    //Cộng dồn vào tổng:
    total += price;
  }
});
//Hiện số lượng trong giỏ hàng
const cart = {
  items: [],
  add(data, quantity) {
    console.log(data,quantity);
    const item = this.items.find((item) => item.id == data.id);
    if (quantity <= 0) {
      showNotification("số lượng ko đc nhỏ hơn 0");
      return;
    }
    if (item) {
      if (item.qty >= item.quantity) {
        showNotification("Số lượng trong kho ko đủ ");
        return;
      } else {
        if (parseInt(item.qty) + parseInt(quantity) > item.quantity) {
          showNotification("Số lượng trong kho ko đủ ");
          return;
        }
        item.qty = parseInt(item.qty) + parseInt(quantity);
        this.saveToLocalStorage();
        this.updateCountAndAmount();
        showNotification("Thêm thành công");
      }
    } else {
          if (quantity > data.quantity) {
            showNotification("Số lượng trong kho ko đủ ");
            return;
          }
          data.qty = parseInt(quantity);
          this.items.push(data);
          this.saveToLocalStorage();
          this.updateCountAndAmount();
          showNotification("Thêm thành công");
    }
  },
  updateCountAndAmount() {
    const countElement = document.getElementById("cart-count");

    countElement.textContent = this.count;
  },

  amt_of(item) {
    return item.qty * item.price;
  },
  get count() {
    return this.items.reduce((total, item) => total + item.qty, 0);
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
    countElement.textContent = this.count;
  },
};

// Attach event listeners and initialize the cart
document.addEventListener("DOMContentLoaded", function () {
  cart.loadFromLocalStorage();
});
function showNotification(message) {
  console.log(message);
  notificationText.textContent = message;
  notification.style.display = "block";
  setTimeout(function () {
    notification.style.display = "none";
  }, 3000);
}
