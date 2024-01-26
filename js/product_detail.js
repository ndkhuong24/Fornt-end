const urlParams = new URLSearchParams(window.location.search);
const itemId = urlParams.get("id");

let data = [];

document.addEventListener("DOMContentLoaded", function () {
  fetch(`http://localhost:5192/api/ProductDetail/getImageChinhById/${itemId}`)
    .then((response) => response.json())
    .then((imageChinhData) => {
      fetch(`http://localhost:5192/api/ProductDetail/getImagePhuById/${itemId}`)
        .then((response) => response.json())
        .then((imagePhuData) => {
          const imageData = imagePhuData.concat(imageChinhData);
          console.log(imageData);
          const carouselInner = document.getElementById("carousel-inner");

          imageData.forEach((image, index) => {
            const isActive = index === 0 ? "active" : "";
            const carouselItem = document.createElement("div");
            carouselItem.className = `carousel-item ${isActive}`;
            carouselItem.innerHTML = `<img src="http://localhost:5192${image.path}" class="d-block w-100" alt="...">`;
            carouselInner.appendChild(carouselItem);
          });
        })
        .catch((error) => {
          console.error("Lỗi khi lấy dữ liệu ảnh phụ từ API", error);
        });
    })
    .catch((error) => {
      console.error("Lỗi khi lấy dữ liệu ảnh chính từ API", error);
    });
});

function fetchData(itemId) {
  fetch(`http://localhost:8081/api/Product3/${itemId}`)
    .then((response) => response.json())
    .then((data) => {
      const row = document.getElementById("detail");
      const formattedPrice = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(data.minPrice);

      const priceWithVND = formattedPrice.replace("₫", "VND");
      const nameProduct = document.getElementById("nameProduct");
      nameProduct.innerHTML += `<span>${data.name}</span>`;

      row.innerHTML += `
      <div class="product-desc">
        <h3 style="font-weight:600">${data.name}</h3>
        <hr>
        <table>
            <thead>
                <tr>
                    <th>
                        <p class="price">
                            <span style="font-weight:700;color:red;margin-top:15px">${priceWithVND}</span>
                        </p>
                    </th>
                    <th style="font-weight:500;font-size:smaller"> <label style="margin-left:30px;">Mã SP : </label>
                        ${data.code}
                        <br /><label style="margin-left:30px;"> Trạng thái : </label><span
                            style="color: green;font-weight:600"> ${
                              data.status === 1 ? "CÒN HÀNG" : "HẾT HÀNG"
                            }</span>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr>

                </tr>
            </tbody>
        </table>
        <hr>

        <div class="size-wrap">
            <div class="block-26 mb-4">
                <h4 style="font-weight:500">Size</h4>
                <div id="size">
               </div> <br>
                <br>  
                <h4 style="font-weight:500">Màu Sắc</h4>
               <div id=color></div>
               <br> <br>
               <h4 style="font-weight:500">Material</h4>
               <div id=material></div> 
               <br> 
               <h4 style="font-weight:500"> Sole</h4>
               <div id=sole></div>   
            </div>
        </div>
        <div class="row">
            <div class="col-sm-3">
                <input
                    style="border:1px solid;text-align:center;height:41px;width:80px;font-size:large;border-radius:3px;"
                    type="number" id="quantity" name="quantity" class="input-number" value="1" min="1" max="100">
            </div>
            <div class="col-sm-6 text-center" id="addtocart">
                <p class="addtocart"><a style="color: white; padding: 10px 30px;
              font-size: 18px;
              background-color:  #45a049;
              color: white; 
              border: none;
              border-radius: 5px;
              cursor: pointer;
              font-weight:600;
              height:30px;
              margin-left:5px;
              transition: background-color 0.3s;" class="btn btn-success btn-addtocart" onclick="getProductDetail()"> THÊM
                        VÀO GIỎ HÀNG</a></p>
            </div>
        </div>

        <div style="margin-top: 25px;">
            <ul class="nav nav-tabs" id="myTab" role="tablist">
                <li class="nav-item" role="presentation">
                    <button style="font-weight:500;" class="nav-link active" id="tab1-tab" data-bs-toggle="tab" data-bs-target="#tab1"
                        type="button" role="tab" aria-controls="tab1" aria-selected="true">Chi tiết sản phẩm</button>
                </li>
                <li class="nav-item" role="presentation">
                    <button style="font-weight:500;" class="nav-link" id="tab2-tab" data-bs-toggle="tab" data-bs-target="#tab2" type="button"
                        role="tab" aria-controls="tab2" aria-selected="false">Mô tả sản phẩm</button>
                </li>
            </ul>
            <div class="tab-content" id="myTabContent">
                <div class="tab-pane fade show active" id="tab1" role="tabpanel" aria-labelledby="tab1-tab" style="font-weight:500;margin-top: 20px;">
                  <label>Kiểu Dáng: </label> ${data.style} <br>
                  <label>Danh Mục : </label> ${data.category} <br>
                  <label>Thương Hiệu : </label> ${data.brand} <br>
            </div>
        </div>
    </div>

      `;

      fetch(`http://localhost:8081/api/Size/findByProduct/${itemId}`)
        .then((response) => response.json())
        .then((sizeData) => {
          const sizeRow = document.getElementById("size");
          sizeData.forEach((item) => {
            sizeRow.innerHTML += `
            <input type="checkbox" name="size" value="${item.name}">${item.name}
            `;
          });
        })
        .catch((sizeError) => {
          console.error("Error fetching sizes:", sizeError);
        });

      fetch(`http://localhost:8081/api/Color/findByProduct/${itemId}`)
        .then((response) => response.json())
        .then((colorData) => {
          const colorRow = document.getElementById("color");
          colorData.forEach((item) => {
            colorRow.innerHTML += `
            <input type="checkbox" name="color" value="${item.name}">${item.name}
            `;
          });
        })
        .catch((colorError) => {
          console.error("Error fetching color:", colorError);
        });

      fetch(`http://localhost:8081/api/Material/findByProduct/${itemId}`)
        .then((response) => response.json())
        .then((materialData) => {
          const materialRow = document.getElementById("material");
          materialData.forEach((item) => {
            materialRow.innerHTML += `
            <input type="checkbox" name="material" value="${item.name}">${item.name}
            `;
          });
        })
        .catch((materialError) => {
          console.error("Error fetching material:", materialError);
        });

      fetch(`http://localhost:8081/api/Sole/findByProduct/${itemId}`)
        .then((response) => response.json())
        .then((soleData) => {
          const soleRow = document.getElementById("sole");
          soleData.forEach((item) => {
            soleRow.innerHTML += `
            <input type="checkbox" name="sole" value="${item.name}">${item.name}
            `;
          });
        })
        .catch((soleError) => {
          console.error("Error fetching sole:", soleError);
        });
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

fetchData(itemId);

function getProductDetail() {
  const selectedSizes = Array.from(document.getElementsByName("size"))
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => checkbox.value);

  const selectedColors = Array.from(document.getElementsByName("color"))
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => checkbox.value);

  const selectedMaterials = Array.from(document.getElementsByName("material"))
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => checkbox.value);

  const selectedSoles = Array.from(document.getElementsByName("sole"))
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => checkbox.value);
  fetch(
    `http://localhost:8081/api/ProductDetail/getOne/${itemId}/${selectedSizes}/${selectedColors}/${selectedMaterials}/${selectedSoles}`
  )
    .then((response) => response.json())
    .then((data) => {
      cart.add(data, document.getElementById("quantity").value);
    });
}

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

function clearAllCookies() {
  const cookies = document.cookie.split(";");
  for (const cookie of cookies) {
    const eqPos = cookie.indexOf("=");
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }
}

const cookie = getCookie("token-user");

if (cookie != null && cookie != "") {
  document.getElementById("dangKiOption").classList.add("hidden");
  document.getElementById("dividerDangNhapOption").classList.add("hidden");
  document.getElementById("dangNhapOption").classList.add("hidden");

  document.getElementById("thongTinOption").classList.remove("hidden");
  document.getElementById("dividerThongTinOption").classList.remove("hidden");
  document.getElementById("dangXuatOption").classList.remove("hidden");
}

const userData = localStorage.getItem("userData-customer");
if (userData) {
  document.getElementById("fullname").innerText = userData;
}

document.getElementById("logoutButton").addEventListener("click", function () {
  if (cookie) {
    fetch("http://localhost:8080/api/auth/logout", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${cookie}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "You've been signed out!") {
          clearAllCookies();

          var cookieNow = getCookie("cookie");
          if (cookieNow === undefined) {
            window.location.href = "/login.html";
          }

          localStorage.removeItem("userData-customer");
          localStorage.removeItem("data-customer");
        } else {
          console.error("Lỗi khi đăng xuất:");
        }
      })
      .catch((error) => {
        console.log(error);
        console.error("Đăng xuất thất bại");
      });
  }
});
