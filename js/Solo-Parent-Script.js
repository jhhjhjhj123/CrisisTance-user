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

const category = form.elements["inp-category"];
const singleParent = form.elements["single-parent"];
const marriedRadio = form.elements["married-radio"];
const marriedYears = form.elements["married-years"];
const widowYears = form.elements["widow-years"];
const annulledYears = form.elements["annulled-years"];
const spouseYears = form.elements["spouse-years"];
const relationship = form.elements["relationship"];
const inpName = form.elements["inp-name"];
const age = form.elements["inp-age"];
const sex = form.elements["inp-sex"];
const civilStatus = form.elements["inp-civil-status"];
const dob = form.elements["inp-dob"];
const pob = form.elements["inp-pob"];
const citizenship = form.elements["inp-citizenship"];
const religion = form.elements["inp-religion"];
const skills = form.elements["inp-skills"];
const address = form.elements["inp-address"];
const landline = form.elements["inp-landline"];
const mobileNumber = form.elements["inp-mobile-number"];
const email = form.elements["inp-email"];
const elementary = form.elements["inp-elementary"];
const highSchool = form.elements["inp-high-school"];
const college = form.elements["inp-college"];
const job = form.elements["inp-job"];
const monthlyIncome = form.elements["inp-monthly-income"];
const additionalIncome = form.elements["inp-additional-income"];
const childSupport = form.elements["inp-child-support"];
const printedName = form.elements["printed-name"];

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
              category: category.value,
              singleParent: singleParent.value,
              marriedRadio: marriedRadio.value,
              marriedYears: marriedYears.value,
              widowYears: widowYears.value,
              annulledYears: annulledYears.value,
              spouseYears: spouseYears.value,
              relationship: relationship.value,
              name: inpName.value,
              age: age.value,
              sex: sex.value,
              civilStatus: civilStatus.value,
              dob: dob.value,
              pob: pob.value,
              citizenship: citizenship.value,
              religion: religion.value,
              skills: skills.value,
              address: address.value,
              landline: landline.value,
              mobileNumber: mobileNumber.value,
              email: email.value,
              elementary: elementary.value,
              highSchool: highSchool.value,
              college: college.value,
              job: job.value,
              monthlyIncome: monthlyIncome.value,
              additionalIncome: additionalIncome.value,
              childSupport: childSupport.value,
              printedName: printedName.value,
              familyMembersList: familyMembersData,

              userID: user.uid,
              userName: snapshotData.name,
              approved: false,
              dateSubmitted: formatDateToISO(),
              typeOfAssistance: "Solo Parent",
              month: new Date().toLocaleString("default", { month: "long" }),
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

const marriedContainer = document.getElementById("married-container");

form.elements["single-parent"].forEach((radio) => {
  radio.addEventListener("change", () => {
    if (radio.value === "MARRIED, w/ child/ren but Separated (solo parent)") {
      marriedContainer.style.display = "block";

      marriedRadio.forEach((rad) => {
        rad.required = true;
      });
      marriedYears.required = true;
    } else {
      marriedRadio.forEach((rad) => {
        rad.required = false;
      });
      marriedYears.required = false;

      marriedContainer.style.display = "none";
    }

    if (radio.value === "WIDOW / ER") {
      widowYears.required = true;
    } else {
      widowYears.required = false;
    }

    if (radio.value === "ANNULLED") {
      annulledYears.required = true;
    } else {
      annulledYears.required = false;
    }

    if (radio.value === "Spouse abroad") {
      spouseYears.required = true;
    } else {
      spouseYears.required = false;
    }
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
  if (familyMemberCount >= 5) {
    return;
  }

  const familyMemberItem = document.createElement("div");
  familyMemberItem.classList.add("family-members-item");

  const fields = [
    {
      name: "family-member-name",
      type: "text",
      placeholder: "First, Middle and Last Name",
    },
    { name: "family-member-age", type: "number", placeholder: "Age" },
    { name: "family-member-dob", type: "date" },
    {
      name: "family-member-pob",
      type: "text",
      placeholder: "Place of birth",
    },
    {
      name: "family-member-relationship",
      type: "text",
      placeholder: "Relationship",
    },
    {
      name: "family-member-grade-level",
      type: "text",
      placeholder: "Grade Level",
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

  if (familyMemberCount != 0) {
    familyMemberItem.appendChild(btnRemove);
  }

  familyMembersList.appendChild(familyMemberItem);

  familyMembersData.push(memberData);
  familyMemberCount++;
}

addMemberButton.addEventListener("click", addFamilyMemberFields);

addFamilyMemberFields();
