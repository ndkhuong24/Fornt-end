const userData = localStorage.getItem("userData-customer");
if (userData) {
  document.getElementById("fullname").innerText = userData;
}

const apiUrl = "https://192.168.109.128/api/ProductDetail/getAll";

const perPage = 8;
let currentPage = 1;

const row = document.querySelector(".row.row-pb-md");

let data = [];
function renderTable(data, page) {
  const startIndex = (page - 1) * perPage;
  const endIndex = page * perPage;
  row.innerHTML = "";
  for (let i = startIndex; i < endIndex && i < data.length; i++) {
    const item = data[i];
    const formattedPrice = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(item.price);

    const priceWithVND = formattedPrice.replace("₫", "VND");
    row.innerHTML += `
    <div class="col-lg-3 mb-4 text-center" >
      <div class="product-entry border">
      <a href="product-detail.html?id=${item.id}" class="prod-img">
      <img src="https://192.168.109.128${item.path}" class="img-fluid" alt="">
    </a>
        <div class="desc">
          <h2><a href="">${item.productName}</a></h2>
          <span class="price" style="color:red;font-weight:500">${priceWithVND}</span>
        </div>
      </div>
    </div>
  `;
  }
}
let totalPages = 1;

function fetchDataAndPopulateTable() {
  fetch(apiUrl)
    .then((response) => response.json())
    .then((apiData) => {
      data = apiData;
      totalPages = Math.ceil(data.length / perPage);
      updatePageInfo();
      renderTable(data, currentPage);
    })
    .catch((error) => {
      console.error("Lỗi khi gọi API:", error);
    });
}
const prevButton = document.getElementById("prev-button");
const nextButton = document.getElementById("next-button");

prevButton.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    renderTable(data, currentPage);
    updatePageInfo();
  }
});

nextButton.addEventListener("click", () => {
  if (currentPage < totalPages) {
    currentPage++;
    renderTable(data, currentPage);
    updatePageInfo();
  }
});

function updatePageInfo() {
  const currentPageElement = document.getElementById("currentPage");
  currentPageElement.textContent = `${currentPage}/${totalPages}`;
}

fetchDataAndPopulateTable();

document
  .getElementById("searchButton")
  .addEventListener("click", function (event) {
    event.preventDefault();
    var searchValue = document.getElementById("searchInput").value.trim();
    if (searchValue !== "") {
      window.location.href =
        "nike.html?search=" + encodeURIComponent(searchValue);
    } else {
      console.log("Please enter a search term.");
    }
  });
