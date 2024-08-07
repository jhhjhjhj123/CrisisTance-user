const headerContainer = document.getElementById("header-container");

loadHeader();

function loadHeader() {
  const currentPath = window.location.pathname;
  let headerPath;

  if (currentPath.includes("/html/")) {
    headerPath = "./Header.html";
  } else {
    headerPath = "./html/Header.html";
  }

  fetch(headerPath)
    .then((response) => response.text())
    .then((data) => {
      headerContainer.innerHTML = data;
      document.dispatchEvent(new Event("headerLoaded"));
    })
    .catch((error) => {
      console.log("Error:", error);
    });
}
