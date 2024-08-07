import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import {
  getDatabase,
  ref,
  get,
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

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const database = getDatabase();

// ==================================================================================================================================================

let btnLogin = document.getElementById("btn-login");

document.addEventListener("headerLoaded", () => {
  btnLogin = document.getElementById("btn-login");
});

auth.onAuthStateChanged((user) => {
  if (user) {
    const userRef = ref(database, "users/" + user.uid);
    get(userRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const currentPath = window.location.pathname;

          if (
            !currentPath.includes("Dashboard.html") &&
            !currentPath.includes("AICS.html") &&
            !currentPath.includes("PWD.html") &&
            !currentPath.includes("Solo-Parent.html")
          ) {
            btnLogin.textContent = "Logout";

            btnLogin.addEventListener("click", () => {
              auth
                .signOut()
                .then(() => {
                  if (currentPath.includes("/html/")) {
                    window.location.href = "./../index.html";
                  } else {
                    window.location.href = "./index.html";
                  }
                })
                .catch((error) => {
                  console.error("Error signing out:", error);
                });
            });
          }
        }
      })
      .catch((error) => {
        console.error("Error getting additional user information:", error);
      });
  } else {
    const currentPath = window.location.pathname;

    if (
      currentPath.includes("Dashboard.html") ||
      currentPath.includes("AICS.html") ||
      currentPath.includes("PWD.html") ||
      currentPath.includes("Solo-Parent.html")
    ) {
      window.location.href = "./../index.html";
    } else {
      if (
        !currentPath.includes("Dashboard.html") &&
        !currentPath.includes("AICS.html") &&
        !currentPath.includes("PWD.html") &&
        !currentPath.includes("Solo-Parent.html")
      ) {
        btnLogin.textContent = "Login/Sign Up";

        btnLogin.addEventListener("click", () => {
          if (currentPath.includes("/html/")) {
            window.location.href = "./Login.html";
          } else {
            window.location.href = "./html/Login.html";
          }
        });
      }
    }
  }
});
