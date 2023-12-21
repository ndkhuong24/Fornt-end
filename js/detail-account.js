// var selectProvince = document.getElementById("Province");
// var provinceOption = selectProvince.value;

// var selectDistrict = document.getElementById("District");
// var districtOption = selectDistrict.value;

// var selectCommune = document.getElementById("Commune");
// var communeOption = selectCommune.value;

// var serviceID;

// document.addEventListener("DOMContentLoaded", function () {
//   var token = "123510a7-56b9-11ee-b394-8ac29577e80e"; // Thay thế với mã thông báo của bạn

//   // Load provinces when the page loads
//   fetch("https://online-gateway.ghn.vn/shiip/public-api/master-data/province", {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       Token: token,
//       ShopId: "4556959",
//     },
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       data.data.forEach((item) => {
//         var option = document.createElement("option");
//         option.value = item.ProvinceID;
//         option.text = item.ProvinceName;
//         selectProvince.appendChild(option);
//       });
//       4556959;

//       // Call GetDistrictByProvince with the selected province
//       provinceOption = selectProvince.value;
//       GetDistrictByProvince(provinceOption);
//     })
//     .catch((error) => {
//       console.error("Error: " + error);
//     });

//   // Add an event listener to detect changes in the Province select element
//   selectProvince.addEventListener("change", function () {
//     provinceOption = selectProvince.value;
//     selectDistrict.innerHTML = ""; // Clear the options
//     GetDistrictByProvince(provinceOption);

//     districtOption = selectDistrict.value;
//     selectCommune.innerHTML = ""; // Clear the options
//     GetCommuneWithDistrict(districtOption);
//   });
// });

// function GetDistrictByProvince(provinceOption) {
//   var token = "123510a7-56b9-11ee-b394-8ac29577e80e"; // Replace with your token

//   fetch(
//     "https://online-gateway.ghn.vn/shiip/public-api/master-data/district?province_id=" +
//       provinceOption,
//     {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Token: token,
//       },
//     }
//   )
//     .then((response) => response.json())
//     .then((data) => {
//       data.data.forEach((item) => {
//         var option = document.createElement("option");
//         option.value = item.DistrictID;
//         option.text = item.DistrictName;
//         selectDistrict.appendChild(option);
//       });

//       districtOption = selectDistrict.value;
//       GetCommuneWithDistrict(districtOption);
//     })
//     .catch((error) => {
//       console.error("Error: " + error);
//     });

//   // Add an event listener to detect changes in the District select element
//   selectDistrict.addEventListener("change", function () {
//     districtOption = selectDistrict.value;
//     // Clear existing options in the Commune select element
//     selectCommune.innerHTML = ""; // Clear the options
//     GetCommuneWithDistrict(districtOption);
//   });
// }

// function GetCommuneWithDistrict(districtOption) {
//   var token = "123510a7-56b9-11ee-b394-8ac29577e80e"; // Thay thế với mã thông báo của bạn

//   fetch(
//     "https://online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id=" +
//       districtOption,
//     {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Token: token,
//       },
//     }
//   )
//     .then((response) => response.json())
//     .then((data) => {
//       data.data.forEach((item) => {
//         var option = document.createElement("option");
//         option.value = item.WardCode;
//         option.text = item.WardName;
//         selectCommune.appendChild(option);
//       });
//     })
//     .catch((error) => {
//       console.error("Error: " + error);
//     });
// }

function openTab(tabId) {
  var tabContents = document.getElementsByClassName("tab-content");
  for (var i = 0; i < tabContents.length; i++) {
    tabContents[i].classList.remove("active");
  }

  var tabs = document.getElementsByClassName("tab");
  for (var i = 0; i < tabs.length; i++) {
    tabs[i].classList.remove("active");
  }

  document.getElementById(tabId).classList.add("active");

  var activeTab = document.querySelector(
    "[onclick=\"openTab('" + tabId + "')\"]"
  );
  if (activeTab) {
    activeTab.classList.add("active");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  openTab("tab1");
});

const customerID = localStorage.getItem("id");

document.addEventListener("DOMContentLoaded", function () {
  fetch(`http://localhost:5192/api/Users/getById/${customerID}`)
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("fullTenCustomer").value = data.fullName;

      document.getElementById("gmailCustomer").value = data.email;

      document.getElementById("soDienThoaiCustomer").value = data.phoneNumber;

      var genderValue = data.gender;
      if (genderValue === 1) {
        document.getElementById("MaleCustomer").checked = true;
      } else {
        document.getElementById("FemaleCustomer").checked = true;
      }
    });

  fetch(`http://localhost:5192/api/User/Address/${customerID}`)
    .then((response) => response.json())
    .then((data) => {
      renderTable(data);
    });
});

const table = document.getElementById("data-table");
const tbody = table.querySelector("tbody");

function renderTable(data) {
  tbody.innerHTML = "";

  data.forEach((item) => {
    const row = document.createElement("tr");

    row.innerHTML = `
        <td style="text-align: center;">${item.addressID}</td>
        <td>${item.detailAddress}, ${item.communeName}, ${item.districtName}, ${
      item.provinceName
    } ${
      item.status === 1 ? '<span class="default-status">Mặc định</span>' : ""
    }</td>
        <td style="text-align: center;">
          <p class="inline-p" style="margin-right: 5px;"><a style="text-decoration: none; color: blue;" href="">Cập nhật</a></p>
          <p class="inline-p" style="margin-left: 5px;"><a style="text-decoration: none; color: blue;" href="">Xóa</a></p>
          <br>
          <button class="default-button" ${item.status === 1 ? "disabled" : ""}
              onclick="updateTrangThai('${item.addressID}')">Mặc địch</button>
        </td>
      `;

    tbody.appendChild(row);
  });
}

function updateTrangThai(value) {
  fetch(
    `http://localhost:5192/api/User/Address/${customerID}?addressID=${value}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        addressID: value,
        userID: customerID,
      }),
    }
  ).then((data) => {
    localStorage.setItem("AddressID", value);
    location.reload();
  });
}

const selectProvince = document.getElementById("Province");
const selectDistrict = document.getElementById("District");
const selectCommune = document.getElementById("Commune");
const token = "123510a7-56b9-11ee-b394-8ac29577e80e";
const shopID = "4556959";

document.addEventListener("DOMContentLoaded", function () {
  selectProvince.innerHTML = "";
  selectDistrict.innerHTML = "";
  selectCommune.innerHTML = "";

  document.getElementById("District").disabled = true;
  document.getElementById("Commune").disabled = true;

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
      selectProvince.append(new Option("Vui lòng chọn một thành phố", ""));

      data.data.forEach((item) => {
        var options = document.createElement("option");
        options.value = item.ProvinceID;
        options.text = item.ProvinceName;
        selectProvince.appendChild(options);
      });
    });

  selectProvince.addEventListener("change", function () {
    var provinceOption = selectProvince.value;

    if (provinceOption.trim() !== "") {
      selectDistrict.innerHTML = "";
      document.getElementById("District").disabled = false;

      selectCommune.innerHTML = "";
      document.getElementById("Commune").disabled = true;

      fetch(
        `https://online-gateway.ghn.vn/shiip/public-api/master-data/district?province_id=${provinceOption}`,
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
          selectDistrict.append(new Option("Vui lòng chọn một quận huyện", ""));

          data.data.forEach((item) => {
            var option = document.createElement("option");
            option.value = item.DistrictID;
            option.text = item.DistrictName;
            selectDistrict.appendChild(option);
          });
        });
    } else {
      selectDistrict.innerHTML = "";
      selectCommune.innerHTML = "";

      document.getElementById("District").disabled = true;
      document.getElementById("Commune").disabled = true;
    }
  });

  selectDistrict.addEventListener("change", function () {
    var districtOption = selectDistrict.value;

    if (districtOption.trim() !== "") {
      selectCommune.innerHTML = "";
      document.getElementById("Commune").disabled = false;

      fetch(
        `https://online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id=${districtOption}`,
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
        });
    } else {
      selectCommune.innerHTML = "";
      document.getElementById("Commune").disabled = true;
    }
  });
});

const form = document.getElementById("form-address");

form.addEventListener("submit", function (event) {
  event.preventDefault(); // Ngăn chặn hành vi mặc định của form

  var modal = document.getElementById("addAddressModal");
  modal.modal("hide");
});
