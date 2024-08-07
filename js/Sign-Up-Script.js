import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import {
  getDatabase,
  ref,
  set,
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

const form = document.forms["sign-up-form"];

const inpName = form.elements["inp-name"];
const inpEmail = form.elements["inp-email"];
const inpPassword = form.elements["inp-password"];
const inpCPassword = form.elements["inp-confirm-password"];

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (inpPassword.value !== inpCPassword.value) {
    alert("Passwords does not match.");
  }

  createUserWithEmailAndPassword(auth, inpEmail.value, inpPassword.value)
    .then((userCredential) => {
      sendEmailVerification(auth.currentUser)
        .then(() => {
          alert("Verification email sent. Please check your inbox.");
        })
        .catch((error) => {
          console.error("Error sending verification email:", error);
        });

      auth
        .signOut()
        .then(() => {})
        .catch((error) => {
          console.error("Error signing out:", error);
        });

      const user = userCredential.user;
      const userData = {
        name: inpName.value,
        email: inpEmail.value,
        isSignup: true,
        restricted: false,
      };

      set(ref(database, "users/" + user.uid), userData)
        .then(() => {
          alert("Sign up successful!");
          window.location.href = "./../index.html";
        })
        .catch((error) => {
          alert("Error registering user: " + error.message);
        });
    })
    .catch((error) => {
      const errorMessage = error.message;
      alert(errorMessage);
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
