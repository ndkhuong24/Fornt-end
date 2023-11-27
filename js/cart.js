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

  // var increment = function(){

  // };

  // Loading page
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

  // Owl Carousel
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
    // jQuery('#time').timepicker();
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

// Tạo một đối tượng đại diện cho các route và nội dung tương ứng.
const routes = "/nike.html";

// Hàm để cập nhật nội dung trang dựa trên URL hiện tại.
function updateContent() {
  const path = window.location.pathname;
  const contentDiv = document.getElementById("content");

  if (routes[path]) {
    contentDiv.textContent = routes[path];
  } else {
    //  contentDiv.textContent = 'Page not found.';
  }
}

// Sử dụng sự kiện "popstate" để theo dõi sự thay đổi URL.
window.addEventListener("popstate", updateContent);

// Ban đầu, gọi hàm updateContent để hiển thị nội dung cho URL ban đầu.
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
      fetch(`http://localhost:5192/api/ProductDetail/getById/${id}`)
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
    // Calculate the total amount of items in the cart
    return this.items.reduce((total, item) => total + item.qty * item.price, 0);
  },
  saveToLocalStorage() {
    // Save the cart to local storage
    const json = JSON.stringify(this.items);
    localStorage.setItem("cart", json);
  },
  loadFromLocalStorage() {
    // Load the cart from local storage
    const json = localStorage.getItem("cart");
    this.items = json ? JSON.parse(json) : [];
    const countElement = document.getElementById("cart-count");

    const totalElement = document.getElementById("total");
    const totalElement2 = document.getElementById("total2");

    const formattedPrice = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(this.amount);
    const priceWithVND = formattedPrice.replace("₫", "VND");

    totalElement.textContent = priceWithVND;
    totalElement2.textContent = priceWithVND;

    countElement.textContent = this.count;
  },

  renderCartItems: function () {
    var tbody = document.getElementById("cart-items");
    tbody.innerHTML = "";
    this.items.forEach(function (item) {
      var row = document.createElement("tr");

      // Format currency and replace currency symbol
      const formattedPrice = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(item.price);
      const priceWithVND = formattedPrice.replace("₫", "VND");

      // Format currency and replace currency symbol
      const formattedPrice1 = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(item.qty * item.price);
      const priceWithVND1 = formattedPrice1.replace("₫", "VND");

      row.innerHTML = `
                    <td><img  src="http://localhost:5192${item.path}" class="img-fluid" alt="" style="width: 100px;"></td>
                    <td  style="font-weight: 600;text-decoration: none;color: dodgerblue;">${item.name}</td>
                    <td>${priceWithVND}</td>
                   <td>
                      <input id="quantity" onchange="updateQuantity(${item.id}, this.value)" style="width:80px;text-align:center" type="number" min="1" value="${item.qty}">
                    </td>
                    <td>${priceWithVND1} </td>
                    <td>
                        <btn style="font-size: larger;font-weight: 500;margin-top:-4px;text-decoration: none;color:red;" class="btn" onclick="cart.remove(${item.id})">Xóa
                        </btn>
                        
                    </td>
             `;
      tbody.appendChild(row);
    });
  },
};

function updateQuantity(itemId, newQuantity) {
  // Find the item in the cart
  var item = cart.items.find(function (item) {
    return item.id === itemId;
  });

  // Update the quantity
  var availableQuantity = item.quantity; // Assuming the available quantity is stored in the 'quantity' property of the item
  console.log(availableQuantity);
  if (parseInt(newQuantity) > availableQuantity) {
    showNotification("sỐ LƯỢNG SẢN PHẨM TRONG KHO KHÔNG ĐỦ ");
    item.qty = parseInt(availableQuantity);
    cart.saveToLocalStorage();
    cart.renderCartItems();
    cart.loadFromLocalStorage();
    return;
  } else if (newQuantity <= 0) {
    showNotification("SỐ LƯỢNG SẢN PHẨM KO ĐƯỢC NHỎ HƠN 0");
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
  console.log(message);
  notificationText.textContent = message;
  notification.style.display = "block";
  setTimeout(function () {
    notification.style.display = "none";
  }, 3000);
}
// Attach event listeners and initialize the cart
document.addEventListener("DOMContentLoaded", function () {
  cart.loadFromLocalStorage();
  cart.renderCartItems();
});
