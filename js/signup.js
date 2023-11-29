function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

const cookie = getCookie("token-user");

if ((cookie != null && cookie != "")) {
  window.location.href = "/index.html";
}
