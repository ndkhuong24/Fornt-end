const apiUrl = "https://192.168.109.128/api/ProductDetail/getAll";

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
              <a href="product-detail.html" class="prod-img">
                <img  src="https://192.168.109.128${item.path}" class="img-fluid" alt="">
              </a>
              <div class="desc">
                <h2><a href="">${item.productName}</a></h2>
                <span class="price">${item.price}</span>
              </div>
            </div>
          </div>
        `;
      
      });
    })
    .catch((error) => {
      console.error("Lỗi khi gọi API:", error);
    });
}



fetchData();
