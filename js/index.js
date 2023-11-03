const apiUrl = "http://localhost:8080/api/ProductDetail";

function fetchData() {
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      // Xử lý dữ liệu trả về từ API

      data.forEach((item) => {
        const row = document.querySelector(".row.row-pb-md");
        row.innerHTML += `
          <div class="col-lg-3 mb-4 text-center">
            <div class="product-entry border">
              <a href="#" class="prod-img">
                <img id="image-${item.id}" src="" class="img-fluid" alt="">
              </a>
              <div class="desc">
                <h2><a href="" id="product-name-${item.product_id}" ></a></h2>
                <span class="price">${item.price}</span>
              </div>
            </div>
          </div>
        `;
        GetImageByProduct_detail_Id(item.id)
        GetProductById(item.product_id);
      });
    })
    .catch((error) => {
      console.error("Lỗi khi gọi API:", error);
    });
}

function GetProductById(productid) {
  fetch(`http://localhost:8080/api/Product/${productid}`)
    .then((response) => response.json())
    .then((productData) => {
      const productNameCell = document.getElementById(
        `product-name-${productid}`
      );
      productNameCell.textContent = productData.name;
      console.log(productData.name);
    })
    .catch((error) => {
      console.error("Lỗi khi tải dữ liệu từ API: " + error);
    });
}

function GetImageByProduct_detail_Id(id){
  fetch(`http://localhost:8080/api/Image/product_detail_id/${id}`)
  .then((response)=>response.json())
  .then((data)=>{
    const imageCell=document.getElementById(`image-${id}`)
    imageCell.src=`https://192.168.109.128${data.path}`
    console.log(imageCell)
  })
}

fetchData();
