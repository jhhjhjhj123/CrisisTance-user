import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import {
  getDatabase,
  ref,
  set,
  get,
  push,
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

const frontSection = document.querySelector(".front-section");
const form = document.forms["fill-up-form"];

const prepareSection = document.querySelector(".prepare-section");
const successfulSection = document.querySelector(".successful-section");

const date = form.elements["inp-date"];
const inpName = form.elements["inp-name"];
const age = form.elements["inp-age"];
const dob = form.elements["inp-dob"];
const civilStatus = form.elements["inp-civil-status"];
const pob = form.elements["inp-pob"];
const sex = form.elements["inp-sex"];
const address = form.elements["inp-address"];
const religion = form.elements["inp-religion"];
const education = form.elements["inp-education"];
const occupation = form.elements["inp-occupation"];
const monthlyIncome = form.elements["inp-monthly-income"];
const assistance = form.elements["inp-assistance"];
const residence = form.elements["radio-residence"];
const materials = form.elements["radio-materials"];
const lupa = form.elements["radio-lupa"];
const problema = form.elements["inp-problema"];
const mswdo = form.elements["inp-mswdo"];
const hakbang = form.elements["inp-hakbang"];

let familyMembersData = [];

form.addEventListener("submit", (event) => {
  event.preventDefault();
  form.style.display = "none";
  prepareSection.style.display = "grid";

  document.getElementById("btn-prepare-ok").addEventListener("click", () => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        const userRef = ref(database, "users/" + user.uid);
        get(userRef).then((snapshot) => {
          if (snapshot.exists()) {
            const snapshotData = snapshot.val();

            function formatDateToISO() {
              const dateObj = new Date();
              return dateObj.toISOString();
            }

            const formData = {
              date: date.value,
              name: inpName.value,
              age: age.value,
              dob: dob.value,
              civilStatus: civilStatus.value,
              pob: pob.value,
              sex: sex.value,
              address: address.value,
              religion: religion.value,
              education: education.value,
              occupation: occupation.value,
              monthlyIncome: monthlyIncome.value,
              assistance: assistance.value,
              residence: residence.value,
              materials: materials.value,
              problema: problema.value,
              mswdo: mswdo.value,
              hakbang: hakbang.value,
              familyMembersList: familyMembersData,

              userID: user.uid,
              userName: snapshotData.name,
              approved: false,
              dateSubmitted: formatDateToISO(),
              typeOfAssistance: "AICS",
              month: new Date().toLocaleString('default', { month: 'long' }),
            };

            set(push(ref(database, "form")), formData).then(() => {
              prepareSection.style.display = "none";
              successfulSection.style.display = "grid";
            });
          }
        });
      }
    });
  });
});

document.getElementById("btn-prepare-back").addEventListener("click", () => {
  form.style.display = "block";
  prepareSection.style.display = "none";
});

document.getElementById("successful-check").addEventListener("click", () => {
  window.location.href = "./Dashboard.html";
});

document.getElementById("btn-back").addEventListener("click", () => {
  if (frontSection.style.display === "block") {
    window.location.href = "./Dashboard.html";
  } else {
    frontSection.style.display = "block";
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

// ===================================================================================================================================================

const familyMembersList = document.getElementById("family-members-list");
const addMemberButton = document.getElementById("btn-add-member");

let familyMemberCount = 0;

function addFamilyMemberFields() {
  if (familyMemberCount >= 8) {
    return;
  }

  const familyMemberItem = document.createElement("div");
  familyMemberItem.classList.add("family-members-item");

  const fields = [
    { name: "family-member-name", type: "text", placeholder: "Name" },
    {
      name: "family-member-relationship",
      type: "text",
      placeholder: "Relationship",
    },
    { name: "family-member-age", type: "number", placeholder: "Age" },
    { name: "family-member-dob", type: "date", placeholder: "Date of Birth" },
    {
      name: "family-member-civil-status",
      type: "text",
      placeholder: "Civil Status",
    },
    {
      name: "family-member-education",
      type: "text",
      placeholder: "Educational Attainment",
    },
    {
      name: "family-member-occupation",
      type: "text",
      placeholder: "Occupation",
    },
    {
      name: "family-member-income",
      type: "number",
      placeholder: "Monthly Income",
    },
  ];

  let memberData = {};
  fields.forEach((field) => {
    const input = document.createElement("input");
    input.required = true;
    input.type = field.type;
    input.name = field.name;
    input.placeholder = field.placeholder;
    familyMemberItem.appendChild(input);

    memberData[field.name] = "";
    input.addEventListener("input", (e) => {
      memberData[field.name] = e.target.value;
    });
  });

  const btnRemove = document.createElement("button");
  btnRemove.textContent = "X";
  btnRemove.type = "button";
  btnRemove.addEventListener("click", () => {
    familyMembersList.removeChild(familyMemberItem);
    familyMembersData = familyMembersData.filter((data) => data !== memberData);
    familyMemberCount--;
  });

  familyMemberItem.appendChild(btnRemove);
  familyMembersList.appendChild(familyMemberItem);

  familyMembersData.push(memberData);
  familyMemberCount++;
}

addMemberButton.addEventListener("click", addFamilyMemberFields);

// Add an initial family member field set
addFamilyMemberFields();
