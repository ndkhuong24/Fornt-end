const apiUrl = "http://localhost:8081/api/Product3/getAll";

const perPage = 8;
let currentPage = 1;

const row = document.querySelector(".row.row-pb-md");

function renderTable(data, page) {
  const startIndex = (page - 1) * perPage;
  const endIndex = page * perPage;
  row.innerHTML = "";
  for (let i = startIndex; i < endIndex && i < data.length; i++) {
    const item = data[i];

    // Format minPrice with VND currency symbol
    const formattedMinPrice = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(item.minPrice);

    // Format maxPrice with VND currency symbol
    const formattedMaxPrice = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(item.maxPrice);


    // Check if minPrice equals maxPrice
    let priceToShow = formattedMinPrice;
    if (item.minPrice !== item.maxPrice) {
      priceToShow += ` - ${formattedMaxPrice} `;
    }

    // Replace the currency symbol for both minPrice and maxPrice
    priceToShow = priceToShow.replace(/₫/g, "VND");

    row.innerHTML += `
      <div class="col-lg-3 mb-4 text-center">
        <div class="product-entry border">
          <a href="product-detail.html?id=${item.id}" class="prod-img">
            <img src="https://bizweb.dktcdn.net/thumb/1024x1024/100/427/145/products/nike-air-jordan-low-panda-dc0774-101-japanorderstore-0909665979-3.jpg?v=1683203717147" class="img-fluid" alt="">
          </a>
          <div class="desc">
            <h2><a>${item.name}</a></h2>
            <span class="price" style="color:red;font-weight:500">${priceToShow}</span>
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
