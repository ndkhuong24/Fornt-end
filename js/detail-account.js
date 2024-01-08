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
let addresses;

document.addEventListener("DOMContentLoaded", function () {
  // Fetch thông tin người dùng
  fetch(`http://localhost:5192/api/Users/getById/${customerID}`)
    .then((response) => response.json())
    .then((userData) => {
      // Đổ dữ liệu người dùng vào các trường input
      document.getElementById("fullTenCustomer").value = userData.fullName;
      document.getElementById("gmailCustomer").value = userData.email;
      document.getElementById("soDienThoaiCustomer").value =
        userData.phoneNumber;

      // Xác định giới tính
      var genderValue = userData.gender;
      if (genderValue === 1) {
        document.getElementById("MaleCustomer").checked = true;
      } else {
        document.getElementById("FemaleCustomer").checked = true;
      }
    });

  // Fetch địa chỉ người dùng
  fetch(`http://localhost:5192/api/User/Address/${customerID}`)
    .then((response) => response.json())
    .then((addressData) => {
      // Kiểm tra xem có dữ liệu hay không
      if (addressData.status === 404) {
        var table = document.getElementById("data-table");
        var tbody = table.querySelector("tbody");
        var row = document.createElement("tr");
        row.innerHTML = `
          <td style="padding-top:20px;padding-bottom:20px;text-align:center;color:blue" colspan="3">Không có dữ liệu</td>
        `;
        tbody.appendChild(row);
      } else {
        renderTable(addressData);
        addresses = addressData;
      }
    });
});

// Hàm để render bảng dữ liệu địa chỉ
function renderTable(data) {
  var table = document.getElementById("data-table");
  var tbody = table.querySelector("tbody");
  tbody.innerHTML = ""; // Xóa nội dung cũ trong tbody trước khi thêm dữ liệu mới

  data.forEach((address) => {
    var row = document.createElement("tr");
    row.innerHTML = `
      <td>${address.ProvinceName}</td>
      <td>${address.DistrictName}</td>
      <td>${address.CommuneName}</td>
      <td>${address.DetailAddress}</td>
    `;
    tbody.appendChild(row);
  });
}

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
          <p class="inline-p" style="margin-right: 5px;"><a style="text-decoration: none; color: blue;" onclick="openUpdateModal('${
            item.addressID
          }')">Cập nhật</a></p>
          <p class="inline-p" style="margin-left: 5px;"><a style="text-decoration: none; color: blue;" onclick="openDeleteModal('${
            item.addressID
          }')">Xóa</a></p>
          <br>
          <button class="default-button" ${
            item.status === 1 ? "disabled" : ""
          } onclick="updateTrangThai('${item.addressID}')">Mặc địch</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

function openDeleteModal(addressID) {
  document.getElementById("addressID").value = addressID;

  var deleteModal = new bootstrap.Modal(
    document.getElementById("deleteAddress")
  );
  deleteModal.show();
}

function confirmDelete() {
  var addressIDToDelete = document.getElementById("addressID").value;
  var userIDToDelete = localStorage.getItem("id");

  fetch(
    `http://localhost:5192/api/User/Address/delete/${userIDToDelete}/${addressIDToDelete}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.text();
    })
    .then((data) => {
      console.log(data);
      $("#deleteAddress").modal("hide");
      location.reload();
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });
}

async function updateTrangThai(value) {
  try {
    const customerID = localStorage.getItem("id");

    const response = await fetch(
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
    );

    if (!response.ok) {
      showNotification("Không thành công. Đã xảy ra lỗi");

      const errorMessage = await response.text();
      throw new Error(`Error: ${errorMessage}`);
    }

    localStorage.setItem("AddressID", value);
    location.reload();
  } catch (error) {
    console.error(error);
  }
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
          if (data.data != null) {
            data.data.forEach((item) => {
              var option = document.createElement("option");
              option.value = item.WardCode;
              option.text = item.WardName;
              selectCommune.appendChild(option);
            });
          }
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

async function getCheckboxValue() {
  try {
    var statusValue;
    const response = await fetch(
      `http://localhost:5192/api/User/Address/${customerID}`
    );
    const data = await response.json();

    if (data.status == 404) {
      statusValue = 1;
    } else {
      statusValue = checkboxValue;
    }

    return parseInt(statusValue);
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Propagate the error
  }
}

document
  .getElementById("saveAddress")
  .addEventListener("click", async function () {
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

    const detailAddress = document.getElementById("DetailAddress").value;

    if (!detailAddress) {
      showNotification("Vui lòng nhập địa chỉ.");
      return;
    }

    const selectedCommuneIndex = selectCommune.selectedIndex;
    let communeOption;
    let communeText;

    if (selectedCommuneIndex === -1) {
      communeOption = "";
      communeText = "";
    } else {
      communeOption = selectCommune.options[selectedCommuneIndex].value;
      communeText = selectCommune.options[selectedCommuneIndex].text;
    }

    const userID = customerID;
    const statusValue = await getCheckboxValue();

    const userAddress = {
      ProvinceID: provinceOption,
      ProvinceName: provinceText,
      DistrictID: districtOption,
      DistrictName: districtText,
      CommuneID: communeOption,
      CommuneName: communeText,
      DetailAddress: detailAddress,
      Status: statusValue,
    };

    const userAddressLowerCase = {
      ProvinceID: provinceOption.toLowerCase(),
      DistrictID: districtOption.toLowerCase(),
      CommuneID: communeOption.toLowerCase(),
      DetailAddress: detailAddress.toLowerCase(),
    };

    if (!addresses) {
      addAddress(userAddress, userID);
    } else {
      const isDuplicate = addresses.some(
        (address) =>
          address.provinceID.toLowerCase() ===
            userAddressLowerCase.ProvinceID &&
          address.districtID.toLowerCase() ===
            userAddressLowerCase.DistrictID &&
          address.communeID.toLowerCase() === userAddressLowerCase.CommuneID &&
          address.detailAddress.toLowerCase() ===
            userAddressLowerCase.DetailAddress
      );

      if (isDuplicate) {
        showNotification(
          "Đã tồn tại địa chỉ giống với địa chỉ này. Vui lòng đặt địa chỉ khác"
        );
      } else {
        addAddress(userAddress, userID);
      }
    }
  });

function addAddress(userAddress, userID) {
  fetch(`http://localhost:5192/api/User/Address/add/${userID}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userAddress),
  })
    .then((response) => response.text())
    .then((data) => {
      $("#addAddressModal").modal("hide");
      location.reload();
    })
    .catch((error) => {
      console.error("Error adding address:", error);
      showNotification("Failed to add address. Please try again.");
    });
}

document.addEventListener("DOMContentLoaded", async function () {
  try {
    const response = await fetch(
      `http://localhost:5192/api/User/Address/${customerID}`
    );
    const data = await response.json();

    if (data.status === 404) {
      const statusCheckbox = document.getElementById("statusCheckbox");
      statusCheckbox.checked = true;
      statusCheckbox.disabled = true;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});

const DetailProvince = document.getElementById("DetailProvince");
const OptionDetailProvince = DetailProvince.value;
const DetailDistrict = document.getElementById("DetailDistrict");
const OptionDetailDistrict = DetailDistrict.value;
const DetailCommune = document.getElementById("DetailCommune");
const OptionDetailCommune = DetailCommune.value;
const DetailAddressUpdate = document.getElementById("DetailAddress_Update");

function openUpdateModal(addressID) {
  document.getElementById("addressID_update").value = addressID;

  fetch(`http://localhost:5192/api/Address/${addressID}`)
    .then((response) => response.json())
    .then((data) => {
      DetailAddressUpdate.value = data.detailAddress;

      var province_id = data.provinceID;
      var district_id = data.districtID;
      var commune_id = data.communeID;

      fetch(
        "https://online-gateway.ghn.vn/shiip/public-api/master-data/province",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Token: token,
            ShopId: "4556959",
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          data.data.forEach((item) => {
            var option = document.createElement("option");
            option.value = item.ProvinceID;
            option.text = item.ProvinceName;
            DetailProvince.appendChild(option);
          });
          DetailProvince.value = province_id;
        });

      fetch(
        `https://online-gateway.ghn.vn/shiip/public-api/master-data/district?province_id=${province_id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Token: token,
            ShopId: "4556959",
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          data.data.forEach((item) => {
            var option = document.createElement("option");
            option.value = item.DistrictID;
            option.text = item.DistrictName;
            DetailDistrict.appendChild(option);
          });
          DetailDistrict.value = district_id;
        });

      fetch(
        `https://online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id=${district_id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Token: token,
            ShopId: "4556959",
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          data.data.forEach((item) => {
            var option = document.createElement("option");
            option.value = item.WardCode;
            option.text = item.WardName;
            DetailCommune.appendChild(option);
          });
          DetailCommune.value = commune_id;
        });
    });

  var detailAddress = new bootstrap.Modal(
    document.getElementById("detailAddress")
  );
  detailAddress.show();
}

DetailProvince.addEventListener("change", function () {
  var selectDetailDistrict = document.getElementById("DetailDistrict");
  selectDetailDistrict.innerHTML = "";

  var selectCommune = document.getElementById("DetailCommune");
  selectCommune.innerHTML = "";
  selectCommune.disabled = true;

  var OptionDetailProvince = document.getElementById("DetailProvince").value;

  fetch(
    `https://online-gateway.ghn.vn/shiip/public-api/master-data/district?province_id=${OptionDetailProvince}`,
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
        DetailDistrict.appendChild(option);
      });
    });
});

DetailDistrict.addEventListener("change", function () {
  var selectCommune = document.getElementById("DetailCommune");
  selectCommune.innerHTML = "";
  selectCommune.disabled = false;

  var OptionDetailCommune = document.getElementById("DetailDistrict").value;

  fetch(
    `https://online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id=${OptionDetailCommune}`,
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
        DetailCommune.appendChild(option);
      });
    });
});

function capNhatDiaChi() {
  var selectProvinceDetail = document.getElementById("DetailProvince");
  var selectDistrictDetail = document.getElementById("DetailDistrict");
  var selectCommuneDetail = document.getElementById("DetailCommune");
  var DetailAddress_Update = document.getElementById(
    "DetailAddress_Update"
  ).value;

  var selectedProvinceValue = selectProvinceDetail.value;
  var selectedProvinceText =
    selectProvinceDetail.options[selectProvinceDetail.selectedIndex].text;

  var selectedDistrictValue = selectDistrictDetail.value;
  var selectedDistrictText =
    selectDistrictDetail.options[selectDistrictDetail.selectedIndex].text;

  var selectedCommuneValue = selectCommuneDetail.value;
  var selectedCommuneText =
    selectCommuneDetail.options[selectCommuneDetail.selectedIndex].text;

  if (
    !selectedProvinceValue ||
    !selectedDistrictValue ||
    !selectedCommuneValue ||
    !DetailAddress_Update
  ) {
    showNotification("Vui lòng điền đầy đủ thông tin cho các trường!");
    return;
  } else {
    var detail_address_id = document.getElementById("addressID_update").value;

    const dataToUpdate = {
      AddressID: detail_address_id,
      ProvinceID: selectedProvinceValue,
      ProvinceName: selectedProvinceText,
      DistrictID: selectedDistrictValue,
      DistrictName: selectedDistrictText,
      CommuneID: selectedCommuneValue,
      CommuneName: selectedCommuneText,
      DetailAddress: DetailAddress_Update,
    };

    fetch(`http://localhost:5192/api/Address`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToUpdate),
    })
      .then((response) => response.text())
      .then((data) => {
        $("#addAddressModal").modal("hide");
        location.reload();
      })
      .catch((error) => {
        console.error("Error adding address:", error);
        showNotification("Failed to add address. Please try again.");
      });
  }
}
