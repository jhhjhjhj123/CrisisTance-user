import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAGaBLqJWekqWUeCvUIhVjDl4w8Qu1dMFU",
  authDomain: "crisistance-157ef.firebaseapp.com",
  databaseURL: "https://crisistance-157ef-default-rtdb.firebaseio.com",
  projectId: "crisistance-157ef",
  storageBucket: "crisistance-157ef.appspot.com",
  messagingSenderId: "159519194778",
  appId: "1:159519194778:web:e4838dd17b008b4c9ce923",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

var btnAICS = document.getElementById("btn-AICS");
var btnPWD = document.getElementById("btn-PWD");
var btnSoloParent = document.getElementById("btn-solo-parent");
// var btnSeniorCitizen = document.getElementById("btn-senior-citizen");
var outerContainer = document.querySelector(".outer-container");
var innerContainer = document.querySelector(".inner-container");

function hideElementWithTransition(callback) {
  outerContainer.classList.remove("active");

  outerContainer.addEventListener(
    "transitionend",
    function () {
      innerContainer.style.display = "none";
      callback();
    },
    { once: true }
  );
}

btnAICS.addEventListener("click", function () {
  hideElementWithTransition(() => (window.location.href = "./AICS.html"));
});

btnPWD.addEventListener("click", function () {
  hideElementWithTransition(() => (window.location.href = "./PWD.html"));
});

btnSoloParent.addEventListener("click", function () {
  hideElementWithTransition(
    () => (window.location.href = "./Solo-Parent.html")
  );
});

// btnSeniorCitizen.addEventListener("click", function () {
//   hideElementWithTransition(
//     () => (window.location.href = "./Senior-Citizen.html")
//   );
// });

document.addEventListener("DOMContentLoaded", () => {
  outerContainer.classList.add("active");
});
