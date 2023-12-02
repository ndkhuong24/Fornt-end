const cookie = getCookie("token-user");

const customerID = localStorage.getItem("id");

const customerFullName = localStorage.getItem("fullname");
if (customerFullName) {
  document.getElementById("fullname").innerText = customerFullName;
}

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

document.getElementById("logoutButton").addEventListener("click", function () {
  if (cookie) {
    fetch("http://localhost:8081/api/auth/logout", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${cookie}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "You've been signed out!") {
          clearAllCookies();

          var cookieNow = getCookie("cookie");
          if (cookieNow === undefined) {
            window.location.href = "/login.html";
          }

          localStorage.removeItem("userData-customer");
          localStorage.removeItem("data-customer");
        } else {
          console.error("Lỗi khi đăng xuất:");
        }
      })
      .catch((error) => {
        console.log(error);
        console.error("Đăng xuất thất bại");
      });
  }
});

function clearAllCookies() {
  const cookies = document.cookie.split(";");
  for (const cookie of cookies) {
    const eqPos = cookie.indexOf("=");
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }
}

if (cookie != null && cookie != "") {
  document.getElementById("dangKiOption").classList.add("hidden");
  document.getElementById("dividerDangNhapOption").classList.add("hidden");
  document.getElementById("dangNhapOption").classList.add("hidden");

  document.getElementById("thongTinOption").classList.remove("hidden");
  document.getElementById("dividerThongTinOption").classList.remove("hidden");
  document.getElementById("dangXuatOption").classList.remove("hidden");
}