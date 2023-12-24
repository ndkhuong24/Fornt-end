var notification = document.getElementById("notification");
var notificationText = document.getElementById("notification-text");

function showNotification(message) {
  notificationText.textContent = message;
  notification.style.display = "block";
  setTimeout(function () {
    notification.style.display = "none";
  }, 3000);
}

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
      if (data.status === 404) {
        var table = document.getElementById("data-table");
        var tbody = table.querySelector("tbody");

        var row = document.createElement("tr");
        row.innerHTML = `
            <td style="padding-top:20px;padding-bottom:20px;text-align:center;color:blue" colspan="3">Không có dữ liệu</td>
        `;
        tbody.appendChild(row);
      } else {
        renderTable(data);
      }
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

var statusCheckbox = document.getElementById("statusCheckbox");
let checkboxValue = 0;

statusCheckbox.addEventListener("change", function () {
  var isChecked = statusCheckbox.checked;
  var checkboxValueNow = isChecked ? statusCheckbox.value : 0;
  checkboxValue = checkboxValueNow;
});

function getCheckboxValue() {
  return parseInt(checkboxValue);
}

document.getElementById("saveAddress").addEventListener("click", function () {
  const selectedProvinceIndex = selectProvince.selectedIndex;
  const provinceOption = selectProvince.options[selectedProvinceIndex].value;
  const provinceText = selectProvince.options[selectedProvinceIndex].text;

  if (!provinceOption || !provinceText) {
    showNotification("Vui lòng chọn thành phố.");
    return;
  }

  const selectedDistrictIndex = selectDistrict.selectedIndex;
  const districtOption = selectDistrict.options[selectedDistrictIndex].value;
  const districtText = selectDistrict.options[selectedDistrictIndex].text;

  if (!districtOption || !districtText) {
    showNotification("Vui lòng chọn quận / huyện.");
    return;
  }

  const selectedCommuneIndex = selectCommune.selectedIndex;
  const communeOption = selectCommune.options[selectedCommuneIndex].value;
  const communeText = selectCommune.options[selectedCommuneIndex].text;

  const detailAddress = document.getElementById("DetailAddress").value;

  if (!detailAddress) {
    showNotification("Vui lòng nhập địa chỉ.");
    return;
  }

  if (!communeOption) {
    communeOption = "";
  }
  if (!communeText) {
    communeText = "";
  }

  const userAddress = {
    ProvinceID: provinceOption,
    ProvinceName: provinceText,
    DistrictID: districtOption,
    DistrictName: districtText,
    CommuneID: communeOption,
    CommuneName: communeText,
    DetailAddress: detailAddress,
    Status: getCheckboxValue(),
  };
  console.log(userAddress);

  // if (provinceOption && districtOption && communeOption && detailAddress) {
  //   const userAddress = {
  //     ProvinceID: provinceOption,
  //     ProvinceName: provinceText,
  //     DistrictID: districtOption,
  //     DistrictName: districtText,
  //     CommuneID: communeOption,
  //     CommuneName: communeText,
  //     DetailAddress: detailAddress,
  //     Status: getCheckboxValue(),
  //   };

  //   const userID = customerID;

  //   console.log(userAddress);
  //   console.log(userID);

  //   fetch(`http://localhost:5192/api/User/Address/add/${userID}`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(userAddress),
  //   }).then((data) => {
  //     $("#addAddressModal").modal("hide");
  //     location.reload();
  //   });
  // } else {
  //   showNotification("Vui lòng nhập đầy đủ thông tin địa chỉ.");
  //   return;
  // }
});
