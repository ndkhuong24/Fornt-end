const urlParams = new URLSearchParams(window.location.search);
const itemId = urlParams.get("id");

function fetchdata() {
  fetch(`http://localhost:8080/api/ProductDetail/` + itemId)
    .then((response) => response.json())
    .then((data) => {
      const row = document.getElementById("addtocart");
      const quantity = document.getElementById("quantity").value;

     

      row.innerHTML +=
        `
         <p class="addtocart"><a href="#" class="btn btn-primary btn-addtocart" onclick="cart.add(${data.id}, ${quantity})"><i
         class="icon-shopping-cart"></i> Add to Cart</a></p>`;
    });
}

fetchdata();