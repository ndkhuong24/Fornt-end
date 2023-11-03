var selectProvince = document.getElementById('Province');
var provinceOption = selectProvince.value;

var selectDistrict = document.getElementById('District');
var districtOption = selectDistrict.value;

var selectCommune = document.getElementById('Commune');
var communeOption = selectCommune.value;

var serviceID;

document.addEventListener('DOMContentLoaded', function () {
    var token = "123510a7-56b9-11ee-b394-8ac29577e80e"; // Thay thế với mã thông báo của bạn

    // Load provinces when the page loads
    fetch('https://online-gateway.ghn.vn/shiip/public-api/master-data/province', {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Token": token,
            "ShopId": "4556959"
        }
    })
        .then(response => response.json())
        .then(data => {
            data.data.forEach(item => {
                var option = document.createElement('option');
                option.value = item.ProvinceID;
                option.text = item.ProvinceName;
                selectProvince.appendChild(option);
            }); 4556959

            // Call GetDistrictByProvince with the selected province
            provinceOption = selectProvince.value;
            GetDistrictByProvince(provinceOption);
        })
        .catch(error => {
            console.error("Error: " + error);
        });

    // Add an event listener to detect changes in the Province select element
    selectProvince.addEventListener('change', function () {
        provinceOption = selectProvince.value;
        selectDistrict.innerHTML = ''; // Clear the options
        GetDistrictByProvince(provinceOption);

        districtOption = selectDistrict.value;
        selectCommune.innerHTML = ''; // Clear the options
        GetCommuneWithDistrict(districtOption);
    });
});

function GetDistrictByProvince(provinceOption) {
    var token = "123510a7-56b9-11ee-b394-8ac29577e80e"; // Replace with your token

    fetch('https://online-gateway.ghn.vn/shiip/public-api/master-data/district?province_id=' + provinceOption, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Token": token
        }
    })
        .then(response => response.json())
        .then(data => {
            data.data.forEach(item => {
                var option = document.createElement('option');
                option.value = item.DistrictID;
                option.text = item.DistrictName;
                selectDistrict.appendChild(option);
            });

            districtOption = selectDistrict.value;
            GetCommuneWithDistrict(districtOption);

        })
        .catch(error => {
            console.error("Error: " + error);
        });

    // Add an event listener to detect changes in the District select element
    selectDistrict.addEventListener('change', function () {
        districtOption = selectDistrict.value;
        // Clear existing options in the Commune select element
        selectCommune.innerHTML = ''; // Clear the options
        GetCommuneWithDistrict(districtOption);
    });

}

function GetCommuneWithDistrict(districtOption) {
    var token = "123510a7-56b9-11ee-b394-8ac29577e80e"; // Thay thế với mã thông báo của bạn

    fetch('https://online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id=' + districtOption, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Token": token
        }
    })
        .then(response => response.json())
        .then(data => {
            data.data.forEach(item => {
                var option = document.createElement('option');
                option.value = item.WardCode;
                option.text = item.WardName;
                selectCommune.appendChild(option);
            });
        })
        .catch(error => {
            console.error("Error: " + error);
        });
}

document.getElementById("submit").addEventListener("click", function () {
    var giaTienInput = document.getElementById("giaTien");
    var tienShipLabel = document.getElementById("tienShip");

    var giaTien = giaTienInput.value.trim(); // Sử dụng trim để loại bỏ dấu cách thừa

    if (giaTien === "") {
        alert("lòng nhập giá tiền sản phẩm");
    } else {
        var districtNow = selectDistrict.value;
        fetch(`https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/available-services?shop_id=4556959&from_district=3303&to_district=${districtNow}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Token": "123510a7-56b9-11ee-b394-8ac29577e80e",
                    "ShopId": "4556959"
                }
            })
            .then(response => response.json())
            .then(data => {
                serviceID = data.data[0].service_id;
                console.log("Service ID :" + serviceID)
                var districtNow1 = selectDistrict.value;
                var communeNow = selectCommune.value;

                fetch(`https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee?service_id=${serviceID}&insurance_value=${giaTien}&coupon=&from_district_id=3303&to_district_id=${districtNow1}&to_ward_code=${communeNow}&height=15&length=15&weight=1000&width=15`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "Token": "123510a7-56b9-11ee-b394-8ac29577e80e",
                            "ShopId": "4556959"
                        }
                    })
                    .then(response => response.json())
                    .then(data => {
                        console.log("Tiền ship :" + data.data.service_fee)
                        tienShip.innerHTML = data.data.service_fee;

                    })
            })
            .catch(error => {
                console.log("Lỗi: " + error.message);
            });
    }
});