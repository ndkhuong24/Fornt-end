const table = document.getElementById("data-table");
const tbody = table.querySelector("tbody");

function showNotification(message) {
  var notification = document.getElementById("notification");
  var notificationText = document.getElementById("notification-text");

  notificationText.textContent = message;
  notification.style.display = "block";

  setTimeout(function () {
    notification.style.display = "none";
  }, 3000);
}

function updateContent() {
  var routes = "/nike.html";

  const path = window.location.pathname;
  const contentDiv = document.getElementById("content");

  if (routes[path]) {
    contentDiv.textContent = routes[path];
  } else {
  }
}

window.addEventListener("popstate", updateContent);

updateContent();

function formatPriceToInt(tien) {
  var removedDots = tien.replace(/\./g, "");
  var removedVND = removedDots.replace("VND", "");
  var finalResult = removedVND.trim();
  var int = parseInt(finalResult);
  return int;
}

function formatIntToVND(int) {
  const formatPrice = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(int);
  const formatVND = formatPrice.replace("₫", "VND");
  return formatVND;
}

function tinhTongTien(tienSanPham, tienDuocGiam, tienGiaoHang) {
  const tienTong = parseInt(tienSanPham);
  const tienGiam = parseInt(tienDuocGiam);
  const tienShip = parseInt(tienGiaoHang);
  return tienTong - tienGiam + tienShip;
}

document
  .getElementById("checkoutButton")
  .addEventListener("click", function (event) {
    event.preventDefault();

    const cookie = getCookie("token-user");

    if (cookie === undefined || cookie === "") {
      showNotification("Vui lòng đăng nhập để tiếp tục");
    } else {
      window.location.href = "order-complete.html";
    }
  });

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

document.addEventListener("DOMContentLoaded", function () {
  const thisTotalElement = formatPriceToInt(
    document.getElementById("total").innerText
  );

  const thisTienGiamGia = formatPriceToInt(
    document.getElementById("tienGiamGia").innerText
  );

  const thisTienShip = formatPriceToInt(
    document.getElementById("phiGiaoHang").innerText
  );

  document.getElementById("total2").innerText = formatIntToVND(
    tinhTongTien(thisTotalElement, thisTienGiamGia, thisTienShip)
  );
});

const selectProvince = document.getElementById("Province");
const selectDistrict = document.getElementById("District");
const selectCommune = document.getElementById("Commune");
const token = "123510a7-56b9-11ee-b394-8ac29577e80e";
const ShopId = "4556959";
let serviceID;

document.addEventListener("DOMContentLoaded", function () {
  fetch("https://online-gateway.ghn.vn/shiip/public-api/master-data/province", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Token: token,
      ShopId: ShopId,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      data.data.forEach((item) => {
        selectProvince.innerHTML += `<option value="${item.ProvinceID}">${item.ProvinceName}</option>`;
      });

      selectDistrict.disabled = true;
      selectCommune.disabled = true;
    });
});

selectProvince.addEventListener("change", function () {
  var provinceOption = selectProvince.value;

  if (provinceOption === "") {
    selectDistrict.innerHTML = "";
    const option = new Option("Vui lòng chọn một quận / huyện", "");
    selectDistrict.appendChild(option);
    selectDistrict.disabled = true;

    selectCommune.innerHTML = "";
    const optionCommune = new Option("Vui lòng chọn một xã / phường", "");
    selectCommune.appendChild(optionCommune);
    selectCommune.disabled = true;
  } else {
    selectCommune.innerHTML = "";
    const optionCommune = new Option("Vui lòng chọn một xã / phường", "");
    selectCommune.appendChild(optionCommune);
    selectCommune.disabled = true;

    selectDistrict.disabled = false;
    selectDistrict.innerHTML = "";
    selectDistrict.add(new Option("Vui lòng chọn một quận / huyện", ""));
    var provinceOptionNow = selectProvince.value;
    GetDistrict(provinceOptionNow);
  }
});

function GetDistrict(value) {
  fetch(
    `https://online-gateway.ghn.vn/shiip/public-api/master-data/district?province_id=${value}`,
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
        selectDistrict.innerHTML += `<option value="${item.DistrictID}">${item.DistrictName}</option>`;
      });
    });
}

selectDistrict.addEventListener("change", function () {
  var districtOption = selectDistrict.value;

  if (districtOption === "") {
    selectCommune.innerHTML = "";
    const optionCommune = new Option("Vui lòng chọn một xã / phường", "");
    selectCommune.appendChild(optionCommune);
    selectCommune.disabled = true;
  } else {
    selectCommune.disabled = false;

    selectCommune.innerHTML = "";
    const optionCommune = new Option("Vui lòng chọn một xã / phường", "");
    selectCommune.appendChild(optionCommune);

    var districtOptionNow = selectDistrict.value;
    GetCommune(districtOptionNow);
  }
});

function GetCommune(value) {
  fetch(
    `https://online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id=${value}`,
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
        selectCommune.innerHTML += `<option value="${item.WardCode}">${item.WardName}</option>`;
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
        });
    });
}

selectCommune.addEventListener("change", function () {
  var communeNow = selectCommune.value;

  if (communeNow) {
    var tongTienSanPham = formatPriceToInt(
      document.getElementById("total").innerText
    );
    var tienGiamGia = formatPriceToInt(
      document.getElementById("tienGiamGia").innerText
    );

    var districtNow = selectDistrict.value;

    fetch(
      `https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee?service_id=${serviceID}&insurance_value=${tongTienSanPham}&coupon=&from_district_id=3303&to_district_id=${districtNow}&to_ward_code=${communeNow}&height=15&length=15&weight=1000&width=15`,
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
        var phiGiaoHang = data.data.service_fee;
        document.getElementById("phiGiaoHang").innerText =
          formatIntToVND(phiGiaoHang);

        document.getElementById("total2").innerText = formatIntToVND(
          tongTienSanPham - tienGiamGia + phiGiaoHang
        );

        console.log(
          formatPriceToInt(document.getElementById("total2").innerText)
        );
      });
  }
});

// (function () {
//   "use strict";

//   var isMobile = {
//     Android: function () {
//       return navigator.userAgent.match(/Android/i);
//     },
//     BlackBerry: function () {
//       return navigator.userAgent.match(/BlackBerry/i);
//     },
//     iOS: function () {
//       return navigator.userAgent.match(/iPhone|iPad|iPod/i);
//     },
//     Opera: function () {
//       return navigator.userAgent.match(/Opera Mini/i);
//     },
//     Windows: function () {
//       return navigator.userAgent.match(/IEMobile/i);
//     },
//     any: function () {
//       return (
//         isMobile.Android() ||
//         isMobile.BlackBerry() ||
//         isMobile.iOS() ||
//         isMobile.Opera() ||
//         isMobile.Windows()
//       );
//     },
//   };

//   var mobileMenuOutsideClick = function () {
//     $(document).click(function (e) {
//       var container = $("#colorlib-offcanvas, .js-colorlib-nav-toggle");
//       if (!container.is(e.target) && container.has(e.target).length === 0) {
//         if ($("body").hasClass("offcanvas")) {
//           $("body").removeClass("offcanvas");
//           $(".js-colorlib-nav-toggle").removeClass("active");
//         }
//       }
//     });
//   };

//   var offcanvasMenu = function () {
//     $("#page").prepend('<div id="colorlib-offcanvas" />');
//     $("#page").prepend(
//       '<a href="#" class="js-colorlib-nav-toggle colorlib-nav-toggle colorlib-nav-white"><i></i></a>'
//     );
//     var clone1 = $(".menu-1 > ul").clone();
//     $("#colorlib-offcanvas").append(clone1);
//     var clone2 = $(".menu-2 > ul").clone();
//     $("#colorlib-offcanvas").append(clone2);

//     $("#colorlib-offcanvas .has-dropdown").addClass("offcanvas-has-dropdown");
//     $("#colorlib-offcanvas").find("li").removeClass("has-dropdown");

//     // Hover dropdown menu on mobile
//     $(".offcanvas-has-dropdown")
//       .mouseenter(function () {
//         var $this = $(this);

//         $this.addClass("active").find("ul").slideDown(500, "easeOutExpo");
//       })
//       .mouseleave(function () {
//         var $this = $(this);
//         $this.removeClass("active").find("ul").slideUp(500, "easeOutExpo");
//       });

//     $(window).resize(function () {
//       if ($("body").hasClass("offcanvas")) {
//         $("body").removeClass("offcanvas");
//         $(".js-colorlib-nav-toggle").removeClass("active");
//       }
//     });
//   };

//   var burgerMenu = function () {
//     $("body").on("click", ".js-colorlib-nav-toggle", function (event) {
//       var $this = $(this);

//       if ($("body").hasClass("overflow offcanvas")) {
//         $("body").removeClass("overflow offcanvas");
//       } else {
//         $("body").addClass("overflow offcanvas");
//       }
//       $this.toggleClass("active");
//       event.preventDefault();
//     });
//   };

//   var contentWayPoint = function () {
//     var i = 0;
//     $(".animate-box").waypoint(
//       function (direction) {
//         if (
//           direction === "down" &&
//           !$(this.element).hasClass("animated-fast")
//         ) {
//           i++;

//           $(this.element).addClass("item-animate");
//           setTimeout(function () {
//             $("body .animate-box.item-animate").each(function (k) {
//               var el = $(this);
//               setTimeout(
//                 function () {
//                   var effect = el.data("animate-effect");
//                   if (effect === "fadeIn") {
//                     el.addClass("fadeIn animated-fast");
//                   } else if (effect === "fadeInLeft") {
//                     el.addClass("fadeInLeft animated-fast");
//                   } else if (effect === "fadeInRight") {
//                     el.addClass("fadeInRight animated-fast");
//                   } else {
//                     el.addClass("fadeInUp animated-fast");
//                   }

//                   el.removeClass("item-animate");
//                 },
//                 k * 200,
//                 "easeInOutExpo"
//               );
//             });
//           }, 100);
//         }
//       },
//       { offset: "85%" }
//     );
//   };

//   var dropdown = function () {
//     $(".has-dropdown")
//       .mouseenter(function () {
//         var $this = $(this);
//         $this
//           .find(".dropdown")
//           .css("display", "block")
//           .addClass("animated-fast fadeInUpMenu");
//       })
//       .mouseleave(function () {
//         var $this = $(this);

//         $this
//           .find(".dropdown")
//           .css("display", "none")
//           .removeClass("animated-fast fadeInUpMenu");
//       });
//   };

//   var goToTop = function () {
//     $(".js-gotop").on("click", function (event) {
//       event.preventDefault();

//       $("html, body").animate(
//         {
//           scrollTop: $("html").offset().top,
//         },
//         500,
//         "easeInOutExpo"
//       );

//       return false;
//     });

//     $(window).scroll(function () {
//       var $win = $(window);
//       if ($win.scrollTop() > 200) {
//         $(".js-top").addClass("active");
//       } else {
//         $(".js-top").removeClass("active");
//       }
//     });
//   };

//   var loaderPage = function () {
//     $(".colorlib-loader").fadeOut("slow");
//   };

//   var sliderMain = function () {
//     $("#colorlib-hero .flexslider").flexslider({
//       animation: "fade",
//       slideshowSpeed: 5000,
//       directionNav: true,
//       start: function () {
//         setTimeout(function () {
//           $(".slider-text").removeClass("animated fadeInUp");
//           $(".flex-active-slide")
//             .find(".slider-text")
//             .addClass("animated fadeInUp");
//         }, 500);
//       },
//       before: function () {
//         setTimeout(function () {
//           $(".slider-text").removeClass("animated fadeInUp");
//           $(".flex-active-slide")
//             .find(".slider-text")
//             .addClass("animated fadeInUp");
//         }, 500);
//       },
//     });
//   };

//   var owlCrouselFeatureSlide = function () {
//     var owl = $(".owl-carousel");
//     owl.owlCarousel({
//       animateOut: "fadeOut",
//       animateIn: "fadeIn",
//       autoplay: false,
//       autoplayHoverPause: true,
//       loop: true,
//       margin: 0,
//       nav: false,
//       dots: true,
//       autoHeight: false,
//       items: 1,
//       navText: [
//         "<i class='icon-chevron-left owl-direction'></i>",
//         "<i class='icon-chevron-right owl-direction'></i>",
//       ],
//     });

//     var owl2 = $(".owl-carousel2");
//     owl2.owlCarousel({
//       animateOut: "fadeOut",
//       animateIn: "fadeIn",
//       autoplay: true,
//       autoplayHoverPause: true,
//       loop: true,
//       margin: 0,
//       nav: false,
//       dots: false,
//       autoHeight: true,
//       items: 1,
//       navText: [
//         "<i class='icon-chevron-left owl-direction'></i>",
//         "<i class='icon-chevron-right owl-direction'></i>",
//       ],
//     });
//   };

//   var parallax = function () {
//     if (!isMobile.any()) {
//       $(window).stellar({
//         horizontalScrolling: false,
//         hideDistantElements: false,
//         responsive: true,
//       });
//     }
//   };

//   var datePicker = function () {
//     jQuery(".date").datepicker({
//       format: "m/d/yyyy",
//       autoclose: true,
//     });
//   };
// })();

// const cart = {
//   items: [],
//   add(id) {
//     const item = this.items.find((item) => item.id == id);
//     if (item) {
//       if (item.qty == item.quantity) {
//         alert("sỐ LƯỢNG SẢN PHẨM TRONG KHO KHÔNG ĐỦ");
//       } else {
//         item.qty++;
//         this.saveToLocalStorage();
//         this.updateCountAndAmount();
//       }
//     } else {
//       fetch(`http://localhost:5192/api/ProductDetail/getById/${id}`)
//         .then((response) => response.json())
//         .then((data) => {
//           data.qty = 1;
//           this.items.push(data);
//           this.saveToLocalStorage();
//           this.updateCountAndAmount();
//         });
//     }
//   },
//   updateCountAndAmount() {
//     const countElement = document.getElementById("cart-count");
//     countElement.textContent = this.count;
//   },
//   remove: function (id) {
//     var index = this.items.findIndex(function (item) {
//       return item.id == id;
//     });
//     this.items.splice(index, 1);
//     this.saveToLocalStorage();
//     this.renderCartItems();
//     this.loadFromLocalStorage();
//   },
//   clear: function () {
//     this.items = [];
//     this.saveToLocalStorage();
//     this.renderCartItems();
//     location.reload();
//   },
//   amt_of(item) {
//     return item.qty * item.price;
//   },
//   get count() {
//     return this.items.reduce((total, item) => total + item.qty, 0);
//   },
//   get amount() {
//     return this.items.reduce((total, item) => total + item.qty * item.price, 0);
//   },
//   saveToLocalStorage() {
//     const json = JSON.stringify(this.items);
//     localStorage.setItem("cart", json);
//   },
//   loadFromLocalStorage() {
//     const json = localStorage.getItem("cart");
//     this.items = json ? JSON.parse(json) : [];
//     const countElement = document.getElementById("cart-count");
//     const totalElement = document.getElementById("total");
//     const priceWithVND = formatIntToVND(this.amount);
//     totalElement.textContent = priceWithVND;
//     countElement.textContent = this.count;
//   },

//   renderCartItems: function () {
//     var tbody = document.getElementById("cart-items");
//     tbody.innerHTML = "";
//     this.items.forEach(function (item) {
//       var row = document.createElement("tr");

//       const formatGiaTien = formatIntToVND(item.price);
//       const formatTongTien = formatIntToVND(item.qty * item.price);

//       row.innerHTML = `
//         <td><img src="http://localhost:5192${item.path}" class="img-fluid" alt="" style="width: 100px;"></td>
//         <td style="font-weight: 600;text-decoration: none;color: dodgerblue;">${item.name}</td>
//         <td>${formatGiaTien}</td>
//         <td>
//             <input id="quantity" onchange="updateQuantity(${item.id}, this.value)" style="width:80px;text-align:center"
//                 type="number" min="1" value="${item.qty}">
//         </td>
//         <td>${formatTongTien} </td>
//         <td>
//             <btn style="font-size: larger;font-weight: 500;margin-top:-4px;text-decoration: none;color:red;" class="btn"
//               onclick="cart.remove(${item.id})">Xóa
//             </btn>
//         </td>
//       `;
//       tbody.appendChild(row);
//     });
//   },
// };

// function updateQuantity(itemId, newQuantity) {
//   var item = cart.items.find(function (item) {
//     return item.id === itemId;
//   });

//   var availableQuantity = item.quantity;
//   if (parseInt(newQuantity) > availableQuantity) {
//     showNotification("Số lượng hàm trong kho không đủ");
//     item.qty = parseInt(availableQuantity);
//     cart.saveToLocalStorage();
//     cart.renderCartItems();
//     cart.loadFromLocalStorage();
//     return;
//   } else if (newQuantity <= 0) {
//     showNotification("Số lượng hàm trong kho không đủ");
//     item.qty = 1;
//     cart.saveToLocalStorage();
//     cart.renderCartItems();
//     cart.loadFromLocalStorage();
//     return;
//   } else {
//     item.qty = parseInt(newQuantity);
//     cart.saveToLocalStorage();
//     cart.renderCartItems();
//     cart.loadFromLocalStorage();
//   }

//   const tien1 = formatPriceToInt(document.getElementById("total").innerText);
//   const tien2 = formatPriceToInt(
//     document.getElementById("tienGiamGia").innerText
//   );
//   const tien3 = formatPriceToInt(
//     document.getElementById("phiGiaoHang").innerText
//   );
//   document.getElementById("total2").innerText = formatIntToVND(
//     tien1 - tien2 + tien3
//   );
// }

// document.addEventListener("DOMContentLoaded", function () {
//   cart.loadFromLocalStorage();
//   cart.renderCartItems();
// });
