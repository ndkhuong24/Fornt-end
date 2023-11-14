const apiUrl = "https://192.168.109.128/api/ProductDetail/getAll";

const perPage = 12; // Số lượng mục trên mỗi trang
let currentPage = 1; // Trang hiện tại

const row = document.querySelector(".row.row-pb-md");

// Định nghĩa biến data và khởi tạo nó là một mảng trống
let data = [];
function renderTable(data, page) {
  const startIndex = (page - 1) * perPage;
  const endIndex = page * perPage;
  row.innerHTML = "";
  // Lặp qua các mục dựa trên chỉ mục bắt đầu và kết thúc
  for (let i = startIndex; i < endIndex && i < data.length; i++) {
    const item = data[i];
    // Format currency and replace currency symbol
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
let totakPages = 1;

// Sửa hàm fetchDataAndPopulateTable để tính totalPages
function fetchDataAndPopulateTable() {
  // Lấy dữ liệu từ API và render trang đầu tiên
  fetch(apiUrl)
    .then((response) => response.json())
    .then((apiData) => {
      // Gán giá trị của apiData cho biến data
      data = apiData;

      // Tính totalPages dựa trên số mục và số mục trên mỗi trang
      totalPages = Math.ceil(data.length / perPage);
      // Hiển thị thông tin trang hiện tại và tổng số trang
      updatePageInfo();

      // Render trang đầu tiên
      renderTable(data, currentPage);
    })
    .catch((error) => {
      console.error("Lỗi khi gọi API:", error);
    });
}
// Thêm nút điều hướng phân trang
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

// Thêm hàm để cập nhật thông tin trang
function updatePageInfo() {
  const currentPageElement = document.getElementById("currentPage");
  currentPageElement.textContent = `${currentPage}/${totalPages}`;
}
fetchDataAndPopulateTable();

function filter() {
    let min = document.getElementById("minPrice").value || 0;
    let max = document.getElementById("maxPrice").value || Number.MAX_SAFE_INTEGER;
    let colors = [];
    let brands=[];

// Get checked checkboxes and update colors array
document.querySelectorAll('input[id="color"]:checked').forEach((checkbox) => {
 colors.push(checkbox.value);
});

document.querySelectorAll('input[id="brand"]:checked').forEach((checkbox) => {
 brands.push(checkbox.value);
});

     const apiFilter = `http://localhost:8080/api/filter?minPrice=${min}&maxPrice=${max}&colors=${colors.join("&colors=")}&brands=${brands.join("&brands=")}`;
     fetch(apiFilter)
         .then((response) => response.json())
         .then((data) => {
          currentPage = 1;
          totalPages = Math.ceil(data.length / perPage);
          updatePageInfo();
          renderTable(data, currentPage);
         })
         .catch((error) => {
             console.error("Error fetching data:", error);
         });
 }
function fetchThuocTinh(){
 fetch("http://localhost:8080/api/Color/getAll")
 .then((response) => response.json())
 .then((data)=>{
    
     const row=document.getElementById("color")
     data.forEach((item)=>{
         row.innerHTML+=`
         ${item.name} <input type="checkbox" value="${item.name}" id="color" />`;
     })
     
 })
 fetch("http://localhost:8080/api/Brand/getAll")
 .then((response) => response.json())
 .then((data)=>{
    
     const row=document.getElementById("brand")
     data.forEach((item)=>{
         row.innerHTML+=`
         ${item.name} <input type="checkbox" value="${item.name}" id="brand" />`;
     })
     
 })
};
fetchThuocTinh();

