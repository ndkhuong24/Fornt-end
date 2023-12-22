const searchInput = document.getElementById("searchInput");
const suggestionsDiv = document.getElementById("suggestions");

async function fetchSuggestions(query) {
  try {
    const response = await fetch(`http://localhost:8081/search/${query}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching suggestions:", error);
    return [];
  }
}

async function showSuggestions() {
  const query = searchInput.value.trim();
  if (query === "") {
    suggestionsDiv.style.display = "none";
    return;
  }

  const suggestions = await fetchSuggestions(query);

  if (suggestions.length > 0) {
    const suggestionsList = suggestions
      .map((suggestion) => {
        const formattedPrice = new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(suggestion.price);
        const priceWithVND = formattedPrice.replace("VNĐ", "VND");

        return (
          `<li style="height:90px;"><a style="text-decoration: none;" href="product-detail.html?id=${suggestion.id}"><img style="width: 70px;margin-bottom:10px;" src="http://localhost:5192${suggestion.path}" class="img-fluid" alt="">` +
          ` <div style="margin-left:100px;margin-top:-75px;"><span style="font-size:medium">${suggestion.productName}</span> - <span style="color:black;">Size : ${suggestion.sizeName}  </span> <br> <span style="font-size:small;color:red;font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;"> ${priceWithVND}   </span></div>    </a></li> <br>`
        );
      })
      .join("");

    suggestionsDiv.innerHTML = `<ul>${suggestionsList}</ul>`;
    suggestionsDiv.style.display = "block";
  } else {
    suggestionsDiv.style.display = "none";
  }
}

searchInput.addEventListener("input", showSuggestions);
