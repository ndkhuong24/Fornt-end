var selectProvince = document.getElementById("Province");
var provinceOption = selectProvince.value;

var selectDistrict = document.getElementById("District");
var districtOption = selectDistrict.value;

var selectCommune = document.getElementById("Commune");
var communeOption = selectCommune.value;

var serviceID;

var token = "123510a7-56b9-11ee-b394-8ac29577e80e";

document.addEventListener("DOMContentLoaded", function () {
  fetch("https://online-gateway.ghn.vn/shiip/public-api/master-data/province", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Token: token,
      ShopId: "4556959",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      data.data.forEach((item) => {
        var option = document.createElement("option");
        option.value = item.ProvinceID;
        option.text = item.ProvinceName;
        selectProvince.appendChild(option);
      });
      provinceOption = selectProvince.value;
      GetDistrictByProvince(provinceOption);
    })
    .catch((error) => {
      console.error("Error: " + error);
    });

  selectProvince.addEventListener("change", function () {
    provinceOption = selectProvince.value;
    selectDistrict.innerHTML = "";
    GetDistrictByProvince(provinceOption);

    districtOption = selectDistrict.value;
    selectCommune.innerHTML = "";
    GetCommuneWithDistrict(districtOption);
  });
});

function GetDistrictByProvince(provinceOption) {
  //   var token = "123510a7-56b9-11ee-b394-8ac29577e80e";
  fetch(
    "https://online-gateway.ghn.vn/shiip/public-api/master-data/district?province_id=" +
      provinceOption,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Token: token,
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      data.data.forEach((item) => {
        var option = document.createElement("option");
        option.value = item.DistrictID;
        option.text = item.DistrictName;
        selectDistrict.appendChild(option);
      });

      districtOption = selectDistrict.value;
      GetCommuneWithDistrict(districtOption);
    })
    .catch((error) => {
      console.error("Error: " + error);
    });

  selectDistrict.addEventListener("change", function () {
    districtOption = selectDistrict.value;
    selectCommune.innerHTML = "";
    GetCommuneWithDistrict(districtOption);
  });
}

function GetCommuneWithDistrict(districtOption) {
  //   var token = "123510a7-56b9-11ee-b394-8ac29577e80e";
  fetch(
    "https://online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id=" +
      districtOption,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Token: token,
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      data.data.forEach((item) => {
        var option = document.createElement("option");
        option.value = item.WardCode;
        option.text = item.WardName;
        selectCommune.appendChild(option);
      });
    })
    .catch((error) => {
      console.error("Error: " + error);
    });
}
