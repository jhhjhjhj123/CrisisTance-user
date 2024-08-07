import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence,
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import {
  getDatabase,
  ref,
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

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const database = getDatabase();

// ==================================================================================================================================================

const form = document.forms["login-form"];

const inpEmail = form.elements["inp-email"];
const inpPassword = form.elements["inp-password"];

form.addEventListener("submit", (e) => {
  e.preventDefault();

  setPersistence(auth, browserSessionPersistence).then(() => {
    signInWithEmailAndPassword(auth, inpEmail.value, inpPassword.value)
      .then(async (userCredential) => {
        const user = userCredential.user;
        if (user.emailVerified) {
          const userRef = ref(database, `users/${user.uid}`);
          const userSnapshot = await get(child(userRef, "restricted"));
          const userData = userSnapshot.val();

          if (!userData) {
            sessionStorage.setItem("isLoggedIn", true);
            window.location.href = "./../index.html";
          } else {
            alert("Your account has been restricted.");
          }
        } else {
          alert("Please verify your email before logging in.");
        }
      })
      .catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage);
      });
  });
});

auth.onAuthStateChanged((user) => {
  if (user) {
    const userRef = ref(database, "users/" + user.uid);
    get(userRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          window.location.href = "./../index.html";
        }
      })
      .catch((error) => {
        console.error("Error getting additional user information:", error);
      });
  }
});
