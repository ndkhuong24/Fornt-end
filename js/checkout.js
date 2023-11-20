(function () {
  "use strict";

  var isMobile = {
    Android: function () {
      return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
      return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
      return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
      return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
      return (
        isMobile.Android() ||
        isMobile.BlackBerry() ||
        isMobile.iOS() ||
        isMobile.Opera() ||
        isMobile.Windows()
      );
    },
  };

  var mobileMenuOutsideClick = function () {
    $(document).click(function (e) {
      var container = $("#colorlib-offcanvas, .js-colorlib-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($("body").hasClass("offcanvas")) {
          $("body").removeClass("offcanvas");
          $(".js-colorlib-nav-toggle").removeClass("active");
        }
      }
    });
  };

  var offcanvasMenu = function () {
    $("#page").prepend('<div id="colorlib-offcanvas" />');
    $("#page").prepend(
      '<a href="#" class="js-colorlib-nav-toggle colorlib-nav-toggle colorlib-nav-white"><i></i></a>'
    );
    var clone1 = $(".menu-1 > ul").clone();
    $("#colorlib-offcanvas").append(clone1);
    var clone2 = $(".menu-2 > ul").clone();
    $("#colorlib-offcanvas").append(clone2);

    $("#colorlib-offcanvas .has-dropdown").addClass("offcanvas-has-dropdown");
    $("#colorlib-offcanvas").find("li").removeClass("has-dropdown");

    // Hover dropdown menu on mobile
    $(".offcanvas-has-dropdown")
      .mouseenter(function () {
        var $this = $(this);

        $this.addClass("active").find("ul").slideDown(500, "easeOutExpo");
      })
      .mouseleave(function () {
        var $this = $(this);
        $this.removeClass("active").find("ul").slideUp(500, "easeOutExpo");
      });

    $(window).resize(function () {
      if ($("body").hasClass("offcanvas")) {
        $("body").removeClass("offcanvas");
        $(".js-colorlib-nav-toggle").removeClass("active");
      }
    });
  };

  var burgerMenu = function () {
    $("body").on("click", ".js-colorlib-nav-toggle", function (event) {
      var $this = $(this);

      if ($("body").hasClass("overflow offcanvas")) {
        $("body").removeClass("overflow offcanvas");
      } else {
        $("body").addClass("overflow offcanvas");
      }
      $this.toggleClass("active");
      event.preventDefault();
    });
  };

  var contentWayPoint = function () {
    var i = 0;
    $(".animate-box").waypoint(
      function (direction) {
        if (
          direction === "down" &&
          !$(this.element).hasClass("animated-fast")
        ) {
          i++;

          $(this.element).addClass("item-animate");
          setTimeout(function () {
            $("body .animate-box.item-animate").each(function (k) {
              var el = $(this);
              setTimeout(
                function () {
                  var effect = el.data("animate-effect");
                  if (effect === "fadeIn") {
                    el.addClass("fadeIn animated-fast");
                  } else if (effect === "fadeInLeft") {
                    el.addClass("fadeInLeft animated-fast");
                  } else if (effect === "fadeInRight") {
                    el.addClass("fadeInRight animated-fast");
                  } else {
                    el.addClass("fadeInUp animated-fast");
                  }

                  el.removeClass("item-animate");
                },
                k * 200,
                "easeInOutExpo"
              );
            });
          }, 100);
        }
      },
      { offset: "85%" }
    );
  };

  var dropdown = function () {
    $(".has-dropdown")
      .mouseenter(function () {
        var $this = $(this);
        $this
          .find(".dropdown")
          .css("display", "block")
          .addClass("animated-fast fadeInUpMenu");
      })
      .mouseleave(function () {
        var $this = $(this);

        $this
          .find(".dropdown")
          .css("display", "none")
          .removeClass("animated-fast fadeInUpMenu");
      });
  };

  var goToTop = function () {
    $(".js-gotop").on("click", function (event) {
      event.preventDefault();

      $("html, body").animate(
        {
          scrollTop: $("html").offset().top,
        },
        500,
        "easeInOutExpo"
      );

      return false;
    });

    $(window).scroll(function () {
      var $win = $(window);
      if ($win.scrollTop() > 200) {
        $(".js-top").addClass("active");
      } else {
        $(".js-top").removeClass("active");
      }
    });
  };

  var loaderPage = function () {
    $(".colorlib-loader").fadeOut("slow");
  };

  var sliderMain = function () {
    $("#colorlib-hero .flexslider").flexslider({
      animation: "fade",
      slideshowSpeed: 5000,
      directionNav: true,
      start: function () {
        setTimeout(function () {
          $(".slider-text").removeClass("animated fadeInUp");
          $(".flex-active-slide")
            .find(".slider-text")
            .addClass("animated fadeInUp");
        }, 500);
      },
      before: function () {
        setTimeout(function () {
          $(".slider-text").removeClass("animated fadeInUp");
          $(".flex-active-slide")
            .find(".slider-text")
            .addClass("animated fadeInUp");
        }, 500);
      },
    });
  };

  var owlCrouselFeatureSlide = function () {
    var owl = $(".owl-carousel");
    owl.owlCarousel({
      animateOut: "fadeOut",
      animateIn: "fadeIn",
      autoplay: false,
      autoplayHoverPause: true,
      loop: true,
      margin: 0,
      nav: false,
      dots: true,
      autoHeight: false,
      items: 1,
      navText: [
        "<i class='icon-chevron-left owl-direction'></i>",
        "<i class='icon-chevron-right owl-direction'></i>",
      ],
    });

    var owl2 = $(".owl-carousel2");
    owl2.owlCarousel({
      animateOut: "fadeOut",
      animateIn: "fadeIn",
      autoplay: true,
      autoplayHoverPause: true,
      loop: true,
      margin: 0,
      nav: false,
      dots: false,
      autoHeight: true,
      items: 1,
      navText: [
        "<i class='icon-chevron-left owl-direction'></i>",
        "<i class='icon-chevron-right owl-direction'></i>",
      ],
    });
  };

  var parallax = function () {
    if (!isMobile.any()) {
      $(window).stellar({
        horizontalScrolling: false,
        hideDistantElements: false,
        responsive: true,
      });
    }
  };

  var datePicker = function () {
    jQuery(".date").datepicker({
      format: "m/d/yyyy",
      autoclose: true,
    });
  };

  $(function () {
    mobileMenuOutsideClick();
    offcanvasMenu();
    burgerMenu();
    contentWayPoint();
    sliderMain();
    dropdown();
    goToTop();
    loaderPage();
    owlCrouselFeatureSlide();
    parallax();
    datePicker();
  });
})();

const routes = "/nike.html";

function updateContent() {
  const path = window.location.pathname;
  const contentDiv = document.getElementById("content");

  if (routes[path]) {
    contentDiv.textContent = routes[path];
  } else {
  }
}

window.addEventListener("popstate", updateContent);

updateContent();

const cart = {
  items: [],
  add(id) {
    const item = this.items.find((item) => item.id == id);
    if (item) {
      if (item.qty == item.quantity) {
        alert("sỐ LƯỢNG SẢN PHẨM TRONG KHO KHÔNG ĐỦ");
      } else {
        item.qty++;
        this.saveToLocalStorage();
        this.updateCountAndAmount();
      }
    } else {
      fetch(`https://192.168.109.128/api/ProductDetail/getById/${id}`)
        .then((response) => response.json())
        .then((data) => {
          data.qty = 1;
          this.items.push(data);
          this.saveToLocalStorage();
          this.updateCountAndAmount();
        });
    }
  },
  updateCountAndAmount() {
    const countElement = document.getElementById("cart-count");
    countElement.textContent = this.count;
  },
  remove: function (id) {
    var index = this.items.findIndex(function (item) {
      return item.id == id;
    });
    this.items.splice(index, 1);
    this.saveToLocalStorage();
    this.renderCartItems();
    this.loadFromLocalStorage();
  },
  clear: function () {
    this.items = [];
    this.saveToLocalStorage();
    this.renderCartItems();
    location.reload();
  },
  amt_of(item) {
    return item.qty * item.price;
  },
  get count() {
    return this.items.reduce((total, item) => total + item.qty, 0);
  },
  get amount() {
    return this.items.reduce((total, item) => total + item.qty * item.price, 0);
  },
  saveToLocalStorage() {
    const json = JSON.stringify(this.items);
    localStorage.setItem("cart", json);
  },
  loadFromLocalStorage() {
    const json = localStorage.getItem("cart");
    this.items = json ? JSON.parse(json) : [];
    const countElement = document.getElementById("cart-count");

    const totalElement = document.getElementById("total");
    // const totalElement2 = document.getElementById("total2");

    const formattedPrice = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(this.amount);
    const priceWithVND = formattedPrice.replace("₫", "VND");

    totalElement.textContent = priceWithVND;
    // totalElement2.textContent = priceWithVND;
    countElement.textContent = this.count;
  },

  renderCartItems: function () {
    var tbody = document.getElementById("cart-items");
    tbody.innerHTML = "";
    this.items.forEach(function (item) {
      var row = document.createElement("tr");

      const formattedPrice = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(item.price);
      const priceWithVND = formattedPrice.replace("₫", "VND");

      const formattedPrice1 = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(item.qty * item.price);
      const priceWithVND1 = formattedPrice1.replace("₫", "VND");

      row.innerHTML = `
        <td><img src="https://192.168.109.128${item.path}" class="img-fluid" alt="" style="width: 100px;"></td>
        <td style="font-weight: 600;text-decoration: underline;color: dodgerblue;">${item.name}</td>
        <td>${priceWithVND}</td>
        <td>
            <input id="quantity" onchange="updateQuantity(${item.id}, this.value)" style="width:80px;text-align:center"
                type="number" min="1" value="${item.qty}">
        </td>
        <td>${priceWithVND1} </td>
        <td>
            <btn style="font-size: larger;font-weight: 500;margin-top:-4px;text-decoration: underline;color:red;" class="btn"
              onclick="cart.remove(${item.id})">Xóa
            </btn>
        </td>
      `;
      tbody.appendChild(row);
    });
  },
};

function updateQuantity(itemId, newQuantity) {
  var item = cart.items.find(function (item) {
    return item.id === itemId;
  });

  var availableQuantity = item.quantity;
  if (parseInt(newQuantity) > availableQuantity) {
    showNotification("Số lượng hàm trong kho không đủ");
    item.qty = parseInt(availableQuantity);
    cart.saveToLocalStorage();
    cart.renderCartItems();
    cart.loadFromLocalStorage();
    return;
  } else if (newQuantity <= 0) {
    showNotification("Số lượng hàm trong kho không đủ");
    item.qty = 1;
    cart.saveToLocalStorage();
    cart.renderCartItems();
    cart.loadFromLocalStorage();
    return;
  } else {
    item.qty = parseInt(newQuantity);
    cart.saveToLocalStorage();
    cart.renderCartItems();
    cart.loadFromLocalStorage();
  }
}
function showNotification(message) {
  notificationText.textContent = message;
  notification.style.display = "block";
  setTimeout(function () {
    notification.style.display = "none";
  }, 3000);
}

document.addEventListener("DOMContentLoaded", function () {
  cart.loadFromLocalStorage();
  cart.renderCartItems();
});

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

          var tongTienCuaSanPham = document.getElementById("total");
          var originalString = tongTienCuaSanPham.innerText;
          var removedDots = originalString.replace(/\./g, "");
          var removedVND = removedDots.replace("VND", "");
          var finalResult = removedVND.trim();
          var tongTien = parseInt(finalResult);

          var tienGiam = document.getElementById("tienGiamGia");
          var original = tienGiam.innerText;
          var removedDot = original.replace(/\./g, "");
          var removedvnd = removedDot.replace("VND", "");
          var final = removedvnd.trim();
          var tienGiamGiaCuaHoaDon = parseInt(final);

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
            `https://192.168.109.128/api/Voucher/getVoucherActivity/${tongTien}`
          )
            .then((response) => response.json())
            .then((voucherData) => {
              var voucherElement = document.getElementById("VoucherId");
              voucherData.forEach((option) => {
                const optionElement = document.createElement("option");
                optionElement.value = option.id;
                optionElement.text = `${option.name} - ${option.code}`;
                voucherElement.appendChild(optionElement);
              });
            });

          const myButton = document.getElementById("submitVoucher");

          myButton.addEventListener("click", function () {
            var valueVoucher = document.getElementById("VoucherId");
            if (valueVoucher.value === "") {
              showNotification("Vui lòng chọn một Voucher");
            } else {
              fetch(
                `http://localhost:8080/api/Voucher/id/${valueVoucher.value}`
              )
                .then((response) => response.json())
                .then((dataVoucher) => {
                  if (dataVoucher.type === 0) {
                    tienGiam.innerText = dataVoucher.value;
                  } else {
                    console.log(originalString * dataVoucher.value);
                  }
                });
            }
          });
        });
    });
}
