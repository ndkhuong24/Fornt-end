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
const addressID = localStorage.getItem("AddressID");

async function fetchUserData(customerID) {
  const response = await fetch(
    `http://localhost:5192/api/Users/getById/${customerID}`
  );

  const userData = await response.json();

  document.getElementById("fullTenCustomer").value = userData.fullName;
  document.getElementById("gmailCustomer").value = userData.email;
  document.getElementById("soDienThoaiCustomer").value = userData.phoneNumber;

  var genderValue = userData.gender;

  if (genderValue === 1) {
    document.getElementById("MaleCustomer").checked = true;
  } else {
    document.getElementById("FemaleCustomer").checked = true;
  }
}

async function fetchUserAddresses(customerID) {
  const response = await fetch(
    `http://localhost:5192/api/User/Address/${customerID}`
  );

  const addressData = await response.json();

  if (addressData.status === 404) {
    showTableAddressTrong();
  } else {
    renderTable(addressData);
    addresses = addressData;
  }
}

function showTableAddressTrong() {
  var table = document.getElementById("data-table");
  var tbody = table.querySelector("tbody");
  var row = document.createElement("tr");

  row.innerHTML = `
    <td style="padding-top:20px;padding-bottom:20px;text-align:center;color:blue" colspan="3">Không có dữ liệu</td>
  `;

  tbody.appendChild(row);
}

document.addEventListener("DOMContentLoaded", function () {
  fetchUserData(customerID);
  fetchUserAddresses(customerID);
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

async function updateTrangThai(value) {
  try {
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

    fetchUserAddresses(customerID);

    showNotification("Cập nhật địa chỉ thành công");
  } catch (error) {
    console.error(error);
  }
}

function openDeleteModal(addressID) {
  document.getElementById("addressID").value = addressID;

  var deleteModal = new bootstrap.Modal(
    document.getElementById("deleteAddress")
  );

  deleteModal.show();
}

async function deleteAddress(userID, addressID) {
  try {
    const response = await fetch(
      `http://localhost:5192/api/User/Address/delete/${userID}/${addressID}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      showNotification("Đã xảy ra lỗi xóa không thành công");
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  } catch (error) {
    console.error("Delete address error:", error);
    showNotification("Đã xảy ra lỗi xóa không thành công");
    throw error;
  }
}

function confirmDelete() {
  var AddressIdToDelete = document.getElementById("addressID").value;

  deleteAddress(customerID, AddressIdToDelete).then(() => {
    $("#deleteAddress").modal("hide");

    fetch(`http://localhost:5192/api/User/Address/${customerID}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 404) {
          showTableAddressTrong();
        } else {
          fetchUserAddresses(customerID);
        }
      });

    showNotification("Đã xóa địa chỉ thành công");
  });
}

function showTableAddressTrong() {
  var table = document.getElementById("data-table");

  var tbody = table.querySelector("tbody");
  tbody.innerHTML = "";

  var row = document.createElement("tr");
  row.innerHTML = `
    <td style="padding-top:20px;padding-bottom:20px;text-align:center;color:blue" colspan="3">Không có dữ liệu</td>
  `;
  tbody.appendChild(row);
}

const token = "123510a7-56b9-11ee-b394-8ac29577e80e";
const shopID = "4556959";

const DetailProvince = document.getElementById("DetailProvince");
const DetailDistrict = document.getElementById("DetailDistrict");
const DetailCommune = document.getElementById("DetailCommune");
const DetailAddress_Update = document.getElementById("DetailAddress_Update");

const Province = document.getElementById("Province");
const District = document.getElementById("District");
const Commune = document.getElementById("Commune");
const DetailAddress = document.getElementById("DetailAddress");

document.addEventListener("DOMContentLoaded", function () {
  fetch(`http://localhost:5192/api/User/Address/${customerID}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.status === 404) {
        var checkbox = document.getElementById("statusCheckbox");
        checkbox.disabled = true;
        checkbox.checked = true;
      }
    });
});

document.addEventListener("DOMContentLoaded", function () {
  Province.innerHTML = "";
  District.innerHTML = "";
  Commune.innerHTML = "";

  District.disabled = true;
  Commune.disabled = true;

  fetch("https://online-gateway.ghn.vn/shiip/public-api/master-data/province", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Token: token,
      ShopId: shopID,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      Province.append(new Option("Vui lòng chọn một thành phố", ""));

      data.data.forEach((item) => {
        var options = document.createElement("option");
        options.value = item.ProvinceID;
        options.text = item.ProvinceName;
        Province.appendChild(options);
      });
    });

  Province.addEventListener("change", function () {
    var provinceOptionValue = Province.value;

    if (provinceOptionValue.trim() !== "") {
      District.innerHTML = "";
      District.disabled = false;

      Commune.innerHTML = "";
      Commune.disabled = true;

      fetch(
        `https://online-gateway.ghn.vn/shiip/public-api/master-data/district?province_id=${provinceOptionValue}`,
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
          District.append(new Option("Vui lòng chọn một quận huyện", ""));

          data.data.forEach((item) => {
            var option = document.createElement("option");
            option.value = item.DistrictID;
            option.text = item.DistrictName;
            District.appendChild(option);
          });
        });
    } else {
      District.innerHTML = "";
      Commune.innerHTML = "";

      District.disabled = true;
      Commune.disabled = true;
    }
  });

  District.addEventListener("change", function () {
    var districtOptionValue = District.value;

    if (districtOptionValue.trim() !== "") {
      Commune.innerHTML = "";
      Commune.disabled = false;

      fetch(
        `https://online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id=${districtOptionValue}`,
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
              Commune.appendChild(option);
            });
          }
        });
    } else {
      Commune.innerHTML = "";
      Commune.disabled = true;
    }
  });
});

async function getStatusValue() {
  try {
    const response = await fetch(
      `http://localhost:5192/api/User/Address/${customerID}`
    );
    const data = await response.json();
    var checkbox = document.getElementById("statusCheckbox");

    if (data.status === 404 || (checkbox && checkbox.checked)) {
      return 1;
    } else {
      return 0;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

document
  .getElementById("saveAddress")
  .addEventListener("click", async function () {
    var ProvinceIndex = Province.selectedIndex;
    var ProvinceOptionValue = Province.options[ProvinceIndex].value;
    var ProvinceOptionText = Province.options[ProvinceIndex].text;

    var DistrictIndex = District.selectedIndex;
    var DistrictOptionValue = District.options[DistrictIndex].value;
    var DistrictOptionText = District.options[DistrictIndex].text;

    var CommuneIndex = Commune.selectedIndex;

    if (!ProvinceOptionValue || !ProvinceOptionText) {
      showNotification("Vui lòng chọn một thành phố");
      return;
    }

    if (!DistrictOptionValue || !DistrictOptionText) {
      showNotification("Vui lòng chọn một quận huyện");
      return;
    }

    if (CommuneIndex === -1) {
      var CommuneOptionValue = "";
      var CommuneOptionText = "";
    } else {
      var CommuneOptionValue = Commune.options[CommuneIndex].value;
      var CommuneOptionText = Commune.options[CommuneIndex].text;
    }

    var DetailAddress = document.getElementById("DetailAddress").value;
    if (!DetailAddress) {
      showNotification("Vui lòng nhập địa chỉ chi tiết");
      return;
    }

    var CheckboxStatus = await getStatusValue();

    const UserAddressAdd = {
      ProvinceID: ProvinceOptionValue,
      ProvinceName: ProvinceOptionText,
      DistrictID: DistrictOptionValue,
      DistrictName: DistrictOptionText,
      CommuneID: CommuneOptionValue,
      CommuneName: CommuneOptionText,
      DetailAddress: DetailAddress,
      Status: CheckboxStatus,
    };

    const UserAddressAddLowerCase = {
      ProvinceID: ProvinceOptionValue.toLowerCase(),
      DistrictID: DistrictOptionValue.toLowerCase(),
      CommuneID: CommuneOptionValue.toLowerCase(),
      DetailAddress: DetailAddress.toLowerCase(),
    };

    fetch(`http://localhost:5192/api/User/Address/${customerID}`)
      .then((response) => response.json())
      .then((datas) => {
        if (datas.status === 404) {
          addAddress(UserAddressAdd, customerID);
        } else {
          const isDuplicate = datas.some((data) => {
            return (
              data.provinceID.toLowerCase() ===
                UserAddressAddLowerCase.ProvinceID &&
              data.districtID.toLowerCase() ===
                UserAddressAddLowerCase.DistrictID &&
              data.communeID.toLowerCase() ===
                UserAddressAddLowerCase.CommuneID &&
              data.detailAddress.toLowerCase() ===
                UserAddressAddLowerCase.DetailAddress
            );
          });

          if (isDuplicate) {
            showNotification(
              "Đã tồn tại địa chỉ tương tự. Vui lòng chọn một địa chỉ khác."
            );
            return;
          } else {
            addAddress(UserAddressAdd, customerID);
          }
        }
      });
  });

function addAddress(UserAddressAdd, customerID) {
  fetch(`http://localhost:5192/api/User/Address/add/${customerID}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(UserAddressAdd),
  })
    .then((data) => {
      // Assuming data is the response from the server
      $("#addAddressModal").modal("hide");
      fetchUserAddresses(customerID);
      clearAddressForm();
      showNotification("Đã thêm thành công");
    })
    .catch((error) => {
      console.error("Error adding address:", error);
      showNotification("Thêm không thành công. Vui lòng thử lại sau.");
    });
}

function clearAddressForm() {
  document.getElementById("Province").selectedIndex = 0;
  document.getElementById("District").innerHTML = "";
  document.getElementById("Commune").innerHTML = "";
  document.getElementById("DetailAddress").value = "";
  document.getElementById("statusCheckbox").checked = false;
}

document.addEventListener("DOMContentLoaded", function () {
  var update_button = document.getElementById("update_button");

  update_button.addEventListener("click", function () {
    var Id = localStorage.getItem("id");
    var FullName = document.getElementById("fullTenCustomer").value;
    var Email = document.getElementById("gmailCustomer").value;
    var gioiTinh = document.getElementsByName("gioiTinh");
    var PhoneNumber = document.getElementById("soDienThoaiCustomer").value;
    var Gender;
    for (var i = 0; i < gioiTinh.length; i++) {
      if (gioiTinh[i].checked) {
        Gender = gioiTinh[i].value;
      }
    }

    const dataUpdate = {
      id: parseInt(Id),
      fullName: FullName,
      email: Email,
      gender: parseInt(Gender),
      phoneNumber: PhoneNumber,
    };

    const apiUrl = `http://localhost:5192/api/Users/getById/${Id}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        const isDataEqual = JSON.stringify(data) === JSON.stringify(dataUpdate);

        if (isDataEqual) {
          showNotification("Vui thay đổi dữ liệu trước khi cập nhật");
        } else {
          fetch(`http://localhost:5192/api/Users/update`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(dataUpdate),
          })
            .then((data) => {
              showNotification("Cập nhật thành công");
              fetchUserData(customerID);
            })
            .catch((error) => {
              showNotification("Cập nhật thất bại");
              console.error("Error:", error);
            });
        }
      })
      .catch((error) => {
        showNotification("Cập nhật thất bại");
        console.error("Error fetching data:", error);
      });
  });
});

function openUpdateModal(AddressID) {
  document.getElementById("addressID_update").value = AddressID;

  fetch(`http://localhost:5192/api/Address/${AddressID}`)
    .then((response) => response.json())
    .then((data) => {
      DetailAddress_Update.value = data.detailAddress;

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
            ShopId: shopID,
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
            ShopId: shopID,
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
  DetailDistrict.innerHTML = "";

  DetailCommune.innerHTML = "";
  DetailCommune.disabled = true;

  var DetailProvinceOption = DetailProvince.value;

  fetch(
    `https://online-gateway.ghn.vn/shiip/public-api/master-data/district?province_id=${DetailProvinceOption}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Token: token,
        ShopId: shopID,
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
  DetailCommune.innerHTML = "";
  DetailCommune.disabled = false;

  var DetailCommuneOption = DetailDistrict.value;

  fetch(
    `https://online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id=${DetailCommuneOption}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Token: token,
        ShopId: shopID,
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

function UpdateAddress() {
  var DetailProvinceValue = DetailProvince.value;
  var DetailProvinceText =
    DetailProvince.options[DetailProvince.selectedIndex].text;

  var DetailDistrictValue = DetailDistrict.value;
  var DetailDistrictText =
    DetailDistrict.options[DetailDistrict.selectedIndex].text;

  var DetailCommuneValue = DetailCommune.value;
  var DetailCommuneText =
    DetailCommune.options[DetailCommune.selectedIndex].text;

  var DetailAddress_UpdateValue = DetailAddress_Update.value;

  if (
    !DetailProvinceValue ||
    !DetailDistrictValue ||
    !DetailCommuneValue ||
    !DetailAddress_UpdateValue
  ) {
    showNotification("Vui lòng điền đầy đủ thông tin các trường!");
    return;
  } else {
    var detail_address_id = document.getElementById("addressID_update").value;

    const DataToUpdate = {
      AddressID: detail_address_id,
      ProvinceID: DetailProvinceValue,
      ProvinceName: DetailProvinceText,
      DistrictID: DetailDistrictValue,
      DistrictName: DetailDistrictText,
      CommuneID: DetailCommuneValue,
      CommuneName: DetailCommuneText,
      DetailAddress: DetailAddress_UpdateValue,
    };

    fetch(`http://localhost:5192/api/Address`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(DataToUpdate),
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
