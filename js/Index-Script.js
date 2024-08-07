import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  setPersistence,
  browserSessionPersistence,
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import {
  getDatabase,
  ref,
  set,
  get,
  child,
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-database.js";

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
const database = getDatabase();

// var logo = document.getElementById("logo");
// var logoOverlay = document.getElementById("logo-overlay");
// var transitionElements = [logo, logoOverlay];
// var transitionsCompleted = 0;

// var logo = document.getElementById("logo");
// var logoOverlay = document.getElementById("logo-overlay");
// var transitionElements = [logo, logoOverlay];
// var transitionsCompleted = 0;

// function hideElementWithTransition(element, callback) {
//   element.classList.add("active");

//   element.addEventListener(
//     "transitionend",
//     function () {
//       element.style.display = "none";
//       transitionsCompleted++;

//       if (transitionsCompleted === transitionElements.length) {
//         callback();
//       }
//     },
//     { once: true }
//   );
// }

// function redirectAfterTransition() {
//   window.location.href = "./html/Dashboard.html";
// }

// logo.addEventListener("click", function () {
//   transitionElements.forEach(function (element) {
//     hideElementWithTransition(element, redirectAfterTransition);
//   });
// });
