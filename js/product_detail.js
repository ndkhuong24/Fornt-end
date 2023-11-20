const urlParams = new URLSearchParams(window.location.search);
const itemId = urlParams.get("id");

let data = [];

document.addEventListener("DOMContentLoaded", function () {
  fetch(`https://192.168.109.128/api/ProductDetail/getImageChinhById/${itemId}`)
    .then((response) => response.json())
    .then((imageChinhData) => {
      fetch(
        `https://192.168.109.128/api/ProductDetail/getImagePhuById/${itemId}`
      )
        .then((response) => response.json())
        .then((imagePhuData) => {
          const combinedImageData = imagePhuData.concat(imageChinhData);
          var carouselItems = document.querySelectorAll(".owl-carousel .item");
          combinedImageData.forEach((image, index) => {
            var imgElement =
              carouselItems[index].querySelector(".prod-img img");
            if (imgElement && image.path) {
              imgElement.src = `https://192.168.109.128${image.path}`;
            }
          });

          initializeOwlCarousel();
        })
        .catch((error) => {
          console.error("Lỗi khi lấy dữ liệu ảnh phụ từ API", error);
        });
    })
    .catch((error) => {
      console.error("Lỗi khi lấy dữ liệu ảnh chính từ API", error);
    });
});

function initializeOwlCarousel() {
  var owl = $("#owl-carousel");
  owl.owlCarousel({
    // loop: true,
  });
}

function fetchdata() {
  fetch(
    `https://192.168.109.128/api/ProductDetail/GetProductDetailAndCart/` +
    itemId
  )
    .then((response) => response.json())
    .then((data) => {
      const row = document.getElementById("detail");
      // Format currency and replace currency symbol
      const formattedPrice = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(data.price);

      const priceWithVND = formattedPrice.replace("₫", "VND");
      const nameProduct = document.getElementById("nameProduct");
      nameProduct.innerHTML += `<span>${data.productName}</span>`;
      row.innerHTML += `
	  
	  <div class="product-desc">
        <h3 style="font-weight:600">${data.productName}</h3>
        <hr>
        <table>
        <thead>
        <tr>
        <th> <p class="price">
        <span style="font-weight:700;color:red;margin-top:15px">${priceWithVND}</span>
        
    </p> </th>
    <th style="font-weight:500;font-size:smaller"> <label style="margin-left:30px;">Mã SP : </label> ${data.productCode
        }
    <br/><label style="margin-left:30px;"> Trạng thái : </label><span style="color: green;font-weight:600"> ${data.status === 1 ? "CÒN HÀNG" : "HẾT HÀNG"
        }</span></th>
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
            <h4 style="font-weight:500">Size</h4> <div style="border: 2px solid rgb(0, 0, 0);color:red;width:40px;height:37px;text-align:center;border-radius:5px;font-weight:500;font-size:large" >${data.sizeName
        } </div> <br>
                <h4 style="font-weight:500">Màu Sắc</h4>
                <ul>
                    <li style="border-radius:20px"><a style="background-color:${data.colorName
        } ;border-radius:20px;border:2px solid"></a></li>
                </ul>
            </div>
        </div> 
        <div class="row">
        <div  class="col-sm-3">
            <input style="border:1px solid;text-align:center;height:41px;width:90px;font-size:large;border-radius:3px;" type="number" id="quantity" name="quantity" class="input-number" value="1" min="1"
                max="100">
           
        </div>
            <div class="col-sm-6 text-center" id="addtocart">
                <p class="addtocart"><a style="color: white; padding: 10px 20px;
                font-size: 18px;
                background-color:  #45a049;
                color: white; 
                border: none;
                border-radius: 5px;
                cursor: pointer;
                font-weight:600;
                height:30px;
                margin-left:10px;
                transition: background-color 0.3s;" class="btn btn-success btn-addtocart"
                        onclick="cart.add(${data.productDetailID},document.getElementById('quantity').value)"><i style="width:30px"
                            class="icon-shopping-cart"></i>THÊM VÀO GIỎ HÀNG</a></p>
            </div>
        </div>
	  
      `;
    });
}

fetchdata();
