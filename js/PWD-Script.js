import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import {
  getDatabase,
  ref,
  set,
  get,
  push,
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-database.js";
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-storage.js";

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
const storage = getStorage(firebaseApp);

const frontSection = document.querySelector(".front-container");
const form = document.forms["fill-up-form"];

const prepareSection = document.querySelector(".prepare-section");
const successfulSection = document.querySelector(".successful-section");

const imgFile = form.elements["inp-img"];
const imgContainer = document.getElementById("img-container");
const category = form.elements["inp-category"];
const date = form.elements["inp-date"];
const PWDNo = form.elements["inp-pwd-no"];
const name = form.elements["inp-name"];
const dob = form.elements["inp-dob"];
const sex = form.elements["inp-sex"];
const civilStatus = form.elements["inp-civil-status"];
const disability = form.elements["inp-disability"];
const cause = form.elements["inp-cause"];
const address = form.elements["inp-address"];
const landline = form.elements["inp-landline"];
const mobile = form.elements["inp-mobile"];
const email = form.elements["inp-email"];
const educationalAttainment = form.elements["educational-attainment"];
const occupation = form.elements["occupation"];
const occupationOthers = form.elements["occupation-others"];
const statusOfEmployment = form.elements["status-of-employment"];
const typesOfEmployment = form.elements["types-of-employment"];
const categoryOfEmployment = form.elements["category-of-employment"];
const affiliate = form.elements["inp-affiliate"];
const contactPerson = form.elements["inp-contact-person"];
const officeAddress = form.elements["inp-office-address"];
const telNo = form.elements["inp-tel-no"];
const sss = form.elements["inp-sss"];
const gsis = form.elements["inp-gsis"];
const pagIbig = form.elements["inp-pag-ibig"];
const psn = form.elements["inp-psn"];
const philhealth = form.elements["inp-philhealth"];

const fatherLastName = form.elements["father-last-name"];
const fatherFirstName = form.elements["father-first-name"];
const fatherMiddleName = form.elements["father-middle-name"];

const motherLastName = form.elements["mother-last-name"];
const motherFirstName = form.elements["mother-first-name"];
const motherMiddleName = form.elements["mother-middle-name"];

const guardianLastName = form.elements["guardian-last-name"];
const guardianFirstName = form.elements["guardian-first-name"];
const guardianMiddleName = form.elements["guardian-middle-name"];

const accomplishedBy = form.elements["accomplished-by"];
const accomplishedLastName = form.elements["accomplished-last-name"];
const accomplishedFirstName = form.elements["accomplished-first-name"];
const accomplishedMiddleName = form.elements["accomplished-middle-name"];

form.addEventListener("submit", (event) => {
  event.preventDefault();
  form.style.display = "none";
  prepareSection.style.display = "grid";

  document
    .getElementById("btn-prepare-ok")
    .addEventListener("click", async () => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          const userRef = ref(database, "users/" + user.uid);
          get(userRef).then(async (snapshot) => {
            if (snapshot.exists()) {
              const snapshotData = snapshot.val();
              const formRef = push(ref(database, "form"));
              const formID = formRef.key;

              const file = imgFile.files[0];

              const fileFolderRef = storageRef(
                storage,
                `formImg/${formID}/${file.name}`
              );
              await uploadBytes(fileFolderRef, file);

              function formatDateToISO() {
                const dateObj = new Date();
                return dateObj.toISOString();
              }

              const formData = {
                category: category.value,
                date: date.value,
                PWDNo: PWDNo.value,
                name: name.value,
                dob: dob.value,
                sex: sex.value,
                civilStatus: civilStatus.value,
                disability: disability.value,
                cause: cause.value,
                address: address.value,
                landline: landline.value,
                mobile: mobile.value,
                email: email.value,
                educationalAttainment: educationalAttainment.value,
                occupation: occupation.value,
                occupationOthers: occupationOthers.value,
                statusOfEmployment: statusOfEmployment.value,
                typesOfEmployment: typesOfEmployment.value,
                categoryOfEmployment: categoryOfEmployment.value,
                affiliate: affiliate.value,
                contactPerson: contactPerson.value,
                officeAddress: officeAddress.value,
                telNo: telNo.value,
                sss: sss.value,
                gsis: gsis.value,
                pagIbig: pagIbig.value,
                psn: psn.value,
                philhealth: philhealth.value,
                fatherLastName: fatherLastName.value,
                fatherFirstName: fatherFirstName.value,
                fatherMiddleName: fatherMiddleName.value,
                motherLastName: motherLastName.value,
                motherFirstName: motherFirstName.value,
                motherMiddleName: motherMiddleName.value,
                guardianLastName: guardianLastName.value,
                guardianFirstName: guardianFirstName.value,
                guardianMiddleName: guardianMiddleName.value,
                accomplishedBy: accomplishedBy.value,
                accomplishedLastName: accomplishedLastName.value,
                accomplishedFirstName: accomplishedFirstName.value,
                accomplishedMiddleName: accomplishedMiddleName.value,

                imgUrl: await getDownloadURL(fileFolderRef),
                userID: user.uid,
                userName: snapshotData.name,
                approved: false,
                dateSubmitted: formatDateToISO(),
                typeOfAssistance: "PWD",
                month: new Date().toLocaleString("default", { month: "long" }),
              };

              set(ref(database, `form/${formID}`), formData).then(() => {
                prepareSection.style.display = "none";
                successfulSection.style.display = "grid";
              });
            }
          });
        }
      });
    });
});

imgFile.addEventListener("change", (e) => {
  const file = e.target.files[0];

  const reader = new FileReader();

  reader.onload = (event) => {
    imgContainer.setAttribute("src", event.target.result);
  };

  reader.readAsDataURL(file);
});

// =================================================================================================================================================

document.getElementById("btn-prepare-back").addEventListener("click", () => {
  form.style.display = "block";
  prepareSection.style.display = "none";
});

document.getElementById("successful-check").addEventListener("click", () => {
  window.location.href = "./Dashboard.html";
});

document.getElementById("btn-back").addEventListener("click", () => {
  if (frontSection.style.display === "flex") {
    window.location.href = "./Dashboard.html";
  } else {
    frontSection.style.display = "flex";
    form.style.display = "none";
    prepareSection.style.display = "none";
    successfulSection.style.display = "none";
  }
});

document.getElementById("btn-front-next").addEventListener("click", () => {
  frontSection.style.display = "none";
  form.style.display = "block";
});

const userName = form.elements["inp-name"].value;
