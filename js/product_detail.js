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
            console.log(imgElement);
            if (imgElement && image.path) {
              console.log(image.path);
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
      nameProduct.innerHTML += `<span>${data.productName}</span>`
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
    <th style="font-weight:500;font-size:smaller"> <label style="margin-left:30px;">Mã SP : </label> ${data.productCode}
    <br/><label style="margin-left:30px;"> Trạng thái : </label><span style="color: green;font-weight:600"> ${data.status === 1 ? "CÒN HÀNG" : "HẾT HÀNG"}</span></th>
        </tr>
        </thead>
        <tbody>
        <tr>
        
        </tr>
        </tbody>
        </table>
        <hr>
        
        <div style="font-weight:600;">
            <label style="font-size: large;font-weight: 500;">Style : </label> ${data.styleName
        } <br>
            <label style="font-size: large;font-weight: 500;">Category : </label> ${data.categoryName
        } <br>
            <label style="font-size: large;font-weight: 500;">Brand : </label> ${data.brandName
        } <br>
            <label style="font-size: large;font-weight: 500;">Sole : </label> ${data.soleName
        } <br>
            <label style="font-size: large;font-weight: 500;">Material : </label> ${data.materialName
        } <br>
            <labels style="font-size: large;font-weight: 500;">Size : </labels> ${data.sizeName
        } <br>
        </div>
         <div class="size-wrap">
            <div class="block-26 mb-4">
                <h4>Color</h4>
                <ul>
                    <li><a style="background-color:${data.colorName
        } ;"></a></li>
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
                        onclick="cart.add(${data.productDetailID
        },document.getElementById('quantity').value)"><i
                            class="icon-shopping-cart"></i> Add to Cart</a></p>
            </div>
        </div>
	  
      `;
    });
}

fetchdata();
