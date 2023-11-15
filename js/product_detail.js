const urlParams = new URLSearchParams(window.location.search);
const itemId = urlParams.get("id");

// let data = [];

// document.addEventListener("DOMContentLoaded", function () {
//   fetch(`https://192.168.109.128/api/ProductDetail/getImageChinhById/${itemId}`)
//     .then((response) => response.json())
//     .then((imageChinhData) => {
//       Promise.all([
//         fetch(
//           `https://192.168.109.128/api/ProductDetail/getImagePhuById/${itemId}`
//         ),
//       ])
//         .then((responses) => Promise.all(responses.map((res) => res.json())))
//         .then((imagePhuData) => {
//           // Gộp dữ liệu imageChinhData và imagePhuData
//           imagePhuData.concat(imageChinhData);

//           var carouselItems = document.querySelectorAll(".owl-carousel .item");
//           // Lặp qua các phần tử của carousel và cập nhật hình ảnh
//           carouselItems.forEach((item, index) => {
//             var imgElement = item.querySelector(".prod-img img");
//             if (imgElement) {
//               // Lấy đường dẫn hình ảnh từ phần tử mảng imagePhuData
//               imgElement.src = `https://192.168.109.128${imagePhuData.path}`;
//             }
//           });

//           initializeOwlCarousel();
//         })
//         .catch((error) => {
//           console.error("Lỗi khi lấy dữ liệu ảnh phụ từ API", error);
//         });
//     })
//     .catch((error) => {
//       console.error("Lỗi khi lấy dữ liệu ảnh chính từ API", error);
//     });
// });

function initializeOwlCarousel() {
  var owl = $("#owl-carousel");
  owl.owlCarousel({
    loop: true,
  });
}

document.addEventListener("DOMContentLoaded", function () {
  // Bước 1: Lấy dữ liệu từ API bằng fetch
  fetch(`https://192.168.109.128/api/ProductDetail/getImagePhuById/${itemId}`)
    .then((response) => response.json())
    .then((imageChinhData) => {
      console.log(imageChinhData);

      var carouselItems = document.querySelectorAll(".owl-carousel .item");
      carouselItems.forEach((item, index) => {
        var imgElement = item.querySelector(".prod-img img");
        if (imgElement && imageChinhData[index]?.path) {
          imgElement.src = `https://192.168.109.128${imageChinhData[index].path}`;
        }
      });

      initializeOwlCarousel();
    })
    .catch((error) => {
      console.error("Lỗi khi lấy dữ liệu từ API", error);
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

      row.innerHTML += `
	  
	  <div class="product-desc">
        <h3>${data.productName}</h3>
        <p class="price">
            <span>${priceWithVND}</span>
            <br/>
        </p>
        <div>
            <label>Mã : </label> ${data.productCode} - <label>Trạng thái : </label> ${data.status}<br>
            <br/>
            <label style="font-size: large;font-weight: 500;">Style : </label> ${data.styleName} <br>
            <label style="font-size: large;font-weight: 500;">Category : </label> ${data.categoryName} <br>
            <label style="font-size: large;font-weight: 500;">Brand : </label> ${data.brandName} <br>
            <label style="font-size: large;font-weight: 500;">Sole : </label> ${data.soleName} <br>
            <label style="font-size: large;font-weight: 500;">Material : </label> ${data.materialName} <br>
            <label style="font-size: large;font-weight: 500;">Size : </label> ${data.sizeName} <br>
        </div>
         <div class="size-wrap">
		 <!--<div class="block-26 mb-2">
                <h4>Size</h4>
                <ul>
                    <li><a>${data.sizeName}</a></li>
                </ul>
            </div>-->
            <div class="block-26 mb-4">
                <h4>Color</h4>
                <ul>
                    <li><a style="background-color:${data.colorName} ;"></a></li>
                </ul>
            </div>
        </div> 
        <div class="input-group mb-4">
            <!-- <span class="input-group-btn">
                <button type="button" class="quantity-left-minus btn" data-type="minus" data-field="">
                    <i class="icon-minus2"></i>
                </button>
            </span> -->
            <input type="number" id="quantity" name="quantity" class="form-control input-number" value="1" min="1"
                max="100">
            <!-- <span class="input-group-btn">
                <button type="button" class="quantity-right-plus btn" data-type="plus" data-field="">
                    <i class="icon-plus2"></i>
                </button>
            </span> -->
        </div>
        <div class="row">
            <div class="col-sm-12 text-center" id="addtocart">
                <p class="addtocart"><a style="color: white" class="btn btn-primary btn-addtocart"
                        onclick="cart.add(${data.productDetailID},document.getElementById('quantity').value)"><i
                            class="icon-shopping-cart"></i> Add to Cart</a></p>
            </div>
        </div>
	  
      `;
    });
}

fetchdata();
