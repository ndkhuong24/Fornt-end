const apiUrl = "http://localhost:8080/api/filter";

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
    <div class="col-lg-3 mb-5 text-center" >
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
     
       let max = 0; // Initializing max with 0
       let min = Number.MAX_VALUE; // Initializing min with a very large value

      apiData.forEach((item) => {
          if (item.price > max) {
              max = item.price;
          }

          if (item.price < min) {
              min = item.price; // Update min if a smaller price is found
          }
      });

      console.log('Maximum price:', max);
      console.log('Minimum price:', min);
 
      // Gán giá trị của apiData cho biến data
      data = apiData;

      // Tính totalPages dựa trên số mục và số mục trên mỗi trang
      totalPages = Math.ceil(data.length / perPage);
      // Hiển thị thông tin trang hiện tại và tổng số trang
      updatePageInfo();

      // Render trang đầu tiên
      renderTable(data, currentPage);
      setupSlider(min, max);
       
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
    let sizes=[];
    let soles=[];
    let materials=[];

// Get checked checkboxes and update colors array
document.querySelectorAll('input[id="color"]:checked').forEach((checkbox) => {
 colors.push(checkbox.value);
});

document.querySelectorAll('input[id="brand"]:checked').forEach((checkbox) => {
 brands.push(checkbox.value);
});
document.querySelectorAll('input[id="size"]:checked').forEach((checkbox) => {
  sizes.push(checkbox.value);
 });
 document.querySelectorAll('input[id="sole"]:checked').forEach((checkbox) => {
  soles.push(checkbox.value);
 });
 document.querySelectorAll('input[id="material"]:checked').forEach((checkbox) => {
  materials.push(checkbox.value);
 });

     const apiFilter = `http://localhost:8080/api/filter?minPrice=${min}&maxPrice=${max}`+
                        `&colors=${colors.join("&colors=")}&brands=${brands.join("&brands=")}`+
                        `&sizes=${sizes.join("&sizes=")}&soles=${soles.join("&soles=")}&materials=${materials.join("&material=")}`;
     fetch(apiFilter)
         .then((response) => response.json())
         .then((filterdata) => {
          currentPage = 1;
          data=filterdata;
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
         <table>
         <tbody>
         <tr>
         <td><input type="checkbox" value="${item.name}" id="color" /> <span style="font-size:larger;font-weight:500">${item.name}</span></td></tr>
         </tbody>
         </table>`;
     })
     
 })
 fetch("http://localhost:8080/api/Brand/getAll")
 .then((response) => response.json())
 .then((data)=>{
    
     const row=document.getElementById("brand")
     data.forEach((item)=>{
         row.innerHTML+=`
         <table>
         <tbody>
         <tr>
         <td><input type="checkbox" value="${item.name}" id="brand" /> <span style="font-size:larger;font-weight:500">${item.name}</span></td></tr>
         </tbody>
         </table>
         `;
     })
     
 })

 fetch("http://localhost:8080/api/Size/getAll")
 .then((response) => response.json())
 .then((data)=>{
    
     const row=document.getElementById("size")
     data.forEach((item)=>{
         row.innerHTML+=`
         <table>
         <tbody>
         <tr>
         <td><input type="checkbox" value="${item.name}" id="size" /> <span style="font-size:larger;font-weight:500">${item.name}</span></td></tr>
         </tbody>
         </table>`;
     })
     
 })
 fetch("http://localhost:8080/api/Sole/getAll")
 .then((response) => response.json())
 .then((data)=>{
    
     const row=document.getElementById("sole")
     data.forEach((item)=>{
         row.innerHTML+=`
         <table>
         <tbody>
         <tr>
         <td><input type="checkbox" value="${item.name}" id="sole" /> <span style="font-size:larger;font-weight:500">${item.name}</span></td></tr>
         </tbody>
         </table>`;
     })
     
 })
 fetch("http://localhost:8080/api/Material/getAll")
 .then((response) => response.json())
 .then((data)=>{
    
     const row=document.getElementById("material")
     data.forEach((item)=>{
         row.innerHTML+=`
         <table>
         <tbody>
         <tr>
         <td><input type="checkbox" value="${item.name}" id="material" /> <span style="font-size:larger;font-weight:500">${item.name}</span></td></tr>
         </tbody>
         </table>`;
     })
     
 })
};
fetchThuocTinh();
var toggleArrow1 = document.getElementById('toggleArrow1');
var myList1 = document.getElementById('brand');
myList1.style.display = 'none';
// Thêm sự kiện click cho mũi tên
toggleArrow1.addEventListener('click', function() {
  // Toggle trạng thái hiển thị/ẩn của danh sách
  if (myList1.style.display === 'none' || myList1.style.display === '') {
    myList1.style.display = 'block';
    toggleArrow1.textContent = 'Thương Hiệu ➜'; 
  } else {
    myList1.style.display = 'none';
    toggleArrow1.textContent = 'Thương Hiệu ➜'; 
  }
});

var toggleArrow2 = document.getElementById('toggleArrow2');
var myList2 = document.getElementById('size');
myList2.style.display = 'none';
// Thêm sự kiện click cho mũi tên
toggleArrow2.addEventListener('click', function() {
  // Toggle trạng thái hiển thị/ẩn của danh sách
  if (myList2.style.display === 'none' || myList2.style.display === '') {
    myList2.style.display = 'block';
    toggleArrow2.textContent = 'Size ➜'; 
  } else {
    myList2.style.display = 'none';
    toggleArrow2.textContent = 'Size ➜'; 
  }
});

var toggleArrow3 = document.getElementById('toggleArrow3');
var myList3 = document.getElementById('color');
myList3.style.display = 'none';
// Thêm sự kiện click cho mũi tên
toggleArrow3.addEventListener('click', function() {
  // Toggle trạng thái hiển thị/ẩn của danh sách
  if (myList3.style.display === 'none' || myList3.style.display === '') {
    myList3.style.display = 'block';
    toggleArrow3.textContent = 'Màu Sắc ➜'; 
  } else {
    myList3.style.display = 'none';
    toggleArrow3.textContent = 'Màu Sắc ➜'; 
  }
});

var toggleArrow4 = document.getElementById('toggleArrow4');
var myList4 = document.getElementById('material');
myList4.style.display = 'none';
// Thêm sự kiện click cho mũi tên
toggleArrow4.addEventListener('click', function() {
  // Toggle trạng thái hiển thị/ẩn của danh sách
  if (myList4.style.display === 'none' || myList4.style.display === '') {
    myList4.style.display = 'block';
    toggleArrow4.textContent = 'Chất Liệu ➜'; 
  } else {
    myList4.style.display = 'none';
    toggleArrow4.textContent = 'Chất Liệu ➜'; 
  }
});


var toggleArrow5 = document.getElementById('toggleArrow5');
var myList5 = document.getElementById('sole');
myList5.style.display = 'none';
// Thêm sự kiện click cho mũi tên
toggleArrow5.addEventListener('click', function() {
  // Toggle trạng thái hiển thị/ẩn của danh sách
  if (myList5.style.display === 'none' || myList5.style.display === '') {
    myList5.style.display = 'block';
    toggleArrow5.textContent = 'Đế Giày ➜'; 
  } else {
    myList5.style.display = 'none';
    toggleArrow5.textContent = 'Đế Giày ➜'; 
  }
});

function setupSlider(min, max) {
  $(function() {
    var slider = $("#slider-range").slider({
        range: true,
        min: min,
        max:max,
        values: [min,max],
        slide: function( event, ui ) {
            $("#minPrice").val(ui.values[0]);
            $("#maxPrice").val(ui.values[1]);
        }
    });

    // Cập nhật giá trị slider khi input thay đổi
    $("#minPrice, #maxPrice").on('input', function() {
        var minValue = parseInt($("#minPrice").val());
        var maxValue = parseInt($("#maxPrice").val());

        // Kiểm tra giá trị hợp lệ và thiết lập lại giá trị cho slider
        if (!isNaN(minValue) && !isNaN(maxValue) && minValue < maxValue) {
            slider.slider('values', [minValue, maxValue]);
        }
    });

    // Cập nhật giá trị input ban đầu
    $("#minPrice").val($("#slider-range").slider("values", 0));
    $("#maxPrice").val($("#slider-range").slider("values", 1));
  });
}
