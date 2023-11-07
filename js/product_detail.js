const urlParams = new URLSearchParams(window.location.search);
const itemId = urlParams.get("id");
function fetchdata(){
    fetch(`http://localhost:8080/api/ProductDetail/`+itemId)
    .then((response)=>response.json())
    .then((data)=>{
        console.log(data);
    })
}
fetchdata();