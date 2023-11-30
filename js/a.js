const selectProvince = document.getElementById("Province");
const optionProvince = selectProvince.value;
const selectDistrict = document.getElementById("District");
const optionDistrict = selectDistrict.value;
const selectCommune = document.getElementById("Commune");
const token = "123510a7-56b9-11ee-b394-8ac29577e80e";
var serviceID;

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
    });

  selectDistrict.addEventListener("change", function () {
    districtOption = selectDistrict.value;
    selectCommune.innerHTML = "";
    GetCommuneWithDistrict(districtOption);
  });
}

function GetCommuneWithDistrict(districtOption) {
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

      var districtNow = selectDistrict.value;
      fetch(
        `https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/available-services?shop_id=4556959&from_district=3303&to_district=${districtNow}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Token: "123510a7-56b9-11ee-b394-8ac29577e80e",
            ShopId: "4556959",
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          serviceID = data.data[0].service_id;

          var districtNow1 = selectDistrict.value;
          var communeNow1 = selectCommune.value;

          var tongTien = formatPriceToInt(
            document.getElementById("total").innerText
          );

          var tienGiamGiaCuaHoaDon = formatPriceToInt(
            document.getElementById("tienGiamGia").innerText
          );

          fetch(
            `https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee?service_id=${serviceID}&insurance_value=${tongTien}&coupon=&from_district_id=3303&to_district_id=${districtNow1}&to_ward_code=${communeNow1}&height=15&length=15&weight=1000&width=15`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Token: "123510a7-56b9-11ee-b394-8ac29577e80e",
                ShopId: "4556959",
              },
            }
          )
            .then((response) => response.json())
            .then((data) => {
              const formatPhiGiaoHang = new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(data.data.service_fee);
              const phiGiaoHangWithVND = formatPhiGiaoHang.replace("₫", "VND");
              document.getElementById("phiGiaoHang").innerText =
                phiGiaoHangWithVND;

              const formatTongDonHang = new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(
                data.data.service_fee + tongTien - tienGiamGiaCuaHoaDon
              );
              const tongDonHangWithVND = formatTongDonHang.replace("₫", "VND");
              document.getElementById("total2").innerText = tongDonHangWithVND;

              const formatPhiGiamGia = new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(tienGiamGiaCuaHoaDon);
              const tienGiamGiaCuaHoaDonWithVND = formatPhiGiamGia.replace(
                "₫",
                "VND"
              );
              document.getElementById("tienGiamGia").innerText =
                tienGiamGiaCuaHoaDonWithVND;
            });

          fetch(
            `http://localhost:5192/api/Voucher/getVoucherActivity/${tongTien}`
          )
            .then((response) => response.json())
            .then((vouchers) => {
              vouchers.forEach(function (voucher) {
                var row = document.createElement("tr");
                row.innerHTML = `
                  <td>${voucher.code}</td>
                  <td>${voucher.name}</td>
                  <td>${voucher.value}</td>
                  <td>${voucher.type == 0 ? "VND" : "%"}</td>
                  <td>${
                    voucher.maximumValue !== null ? voucher.maximumValue : ""
                  }</td>
                  <td>
                   <button id="chonVoucher" class="btn btn-success">Áp Dụng</button>
                  </td>
                `;
                tbody.appendChild(row);
              });
            });
        });
    });
}

document.addEventListener("DOMContentLoaded", function () {
  const table = document.getElementById("data-table");

  table.addEventListener("click", function (event) {
    if (event.target.id === "chonVoucher") {
      const clickedRow = event.target.closest("tr");
      const maVoucher = clickedRow.querySelector("td:nth-child(1)").textContent;
      const tenVoucher =
        clickedRow.querySelector("td:nth-child(2)").textContent;
      document.getElementById(
        "VoucherId"
      ).value = `${maVoucher} - ${tenVoucher}`;

      const loaiVoucher =
        clickedRow.querySelector("td:nth-child(4)").textContent;

      if (loaiVoucher === "VND") {
        const thanhTien = formatPriceToInt(
          document.getElementById("total").innerText
        );

        const phiGiaoHang = formatPriceToInt(
          document.getElementById("phiGiaoHang").innerText
        );

        const tienGiamGia = parseInt(
          clickedRow.querySelector("td:nth-child(3)").textContent
        );

        document.getElementById("tienGiamGia").innerText =
          formatIntToVND(tienGiamGia);

        document.getElementById("total2").innerText = formatIntToVND(
          thanhTien + phiGiaoHang - tienGiamGia
        );
        $("#VoucherModal").modal("hide");
      } else {
        const thanhTien = formatPriceToInt(
          document.getElementById("total").innerText
        );

        const phiGiaoHang = formatPriceToInt(
          document.getElementById("phiGiaoHang").innerText
        );

        const giaTriGiam = parseInt(
          clickedRow.querySelector("td:nth-child(3)").textContent
        );

        const giaTriToiDa = parseInt(
          clickedRow.querySelector("td:nth-child(5)").textContent
        );

        const soTienDuocGiam = (thanhTien / 100) * giaTriGiam;

        if (soTienDuocGiam > giaTriToiDa) {
          document.getElementById("tienGiamGia").innerText =
            formatIntToVND(giaTriToiDa);
          document.getElementById("total2").innerText = formatIntToVND(
            thanhTien - giaTriToiDa + phiGiaoHang
          );
        } else {
          document.getElementById("tienGiamGia").innerText =
            formatIntToVND(soTienDuocGiam);
          document.getElementById("total2").innerText = formatIntToVND(
            thanhTien - soTienDuocGiam + phiGiaoHang
          );
        }
      }
    }
  });
});
