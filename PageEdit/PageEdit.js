const LINK_TO_PORTFOLIOPAGE = "../Portfolio/Portfolio.html";

function redirectToPortfolioPage() {
  window.location.href = LINK_TO_PORTFOLIOPAGE;
}

const addExperienceButton = document.getElementById("addExperienceButton");
const experienceForm = document.getElementById("experienceForm");
const saveExperienceButton = document.getElementById("saveExperienceButton");
const experienceEntries = document.getElementById("experienceEntries");

let experienceData = JSON.parse(localStorage.getItem("experienceData")) || [];

function saveToLocalStorage() {
  localStorage.setItem("experienceData", JSON.stringify(experienceData));
}

function displayExperienceData() {
  experienceEntries.innerHTML = '';
  experienceData.forEach((experience, index) => {
    const experienceEntry = document.createElement("div");
    experienceEntry.innerHTML = `
      <div><strong>${experience.companyName}</strong></div>
      <div><strong>${experience.startDate} - ${experience.endDate}</strong></div>
      <div>${experience.description}</div>
      <div>
        <button class="delete-button" data-index="${index}">Delete</button>
        <button class="edit-button" data-index="${index}">Edit</button>
      </div>
    `;
    experienceEntries.appendChild(experienceEntry);

    const deleteButton = experienceEntry.querySelector(".delete-button");
    deleteButton.addEventListener("click", () => deleteExperience(index));

    const editButton = experienceEntry.querySelector(".edit-button");
    editButton.addEventListener("click", () => showEditForm(index));
  });
}

function deleteExperience(index) {
  experienceData.splice(index, 1);
  saveToLocalStorage();
  displayExperienceData();
}

function showEditForm(index) {
  const experienceEntry = experienceData[index];
  document.getElementById("companyName").value = experienceEntry.companyName;
  document.getElementById("startDate").value = experienceEntry.startDate;
  document.getElementById("endDate").value = experienceEntry.endDate;
  document.getElementById("description").value = experienceEntry.description;

  saveExperienceButton.removeEventListener("click", saveNewExperience);
  saveExperienceButton.addEventListener("click", () => saveEditedExperience(index));

  experienceForm.style.display = "flex";
}

function saveEditedExperience(index) {
  const companyName = document.getElementById("companyName").value;
  const startDate = document.getElementById("startDate").value;
  const endDate = document.getElementById("endDate").value;
  const description = document.getElementById("description").value;

  if (
    companyName === "" ||
    startDate === "" ||
    endDate === "" ||
    description === ""
  ) {
    alert("Please fill in all fields.");
    return;
  }

  const experienceEntry = {
    companyName,
    startDate,
    endDate,
    description,
  };

  experienceData[index] = experienceEntry;
  saveToLocalStorage();
  experienceForm.style.display = "none";
  displayExperienceData();
}

addExperienceButton.addEventListener("click", () => {
  experienceForm.reset();
  saveExperienceButton.removeEventListener("click", saveEditedExperience);
  saveExperienceButton.addEventListener("click", saveNewExperience);
  experienceForm.style.display = "flex";
});

function saveNewExperience() {
  const companyName = document.getElementById("companyName").value;
  const startDate = document.getElementById("startDate").value;
  const endDate = document.getElementById("endDate").value;
  const description = document.getElementById("description").value;

  if (
    companyName === "" ||
    startDate === "" ||
    endDate === "" ||
    description === ""
  ) {
    alert("Please fill in all fields.");
    return;
  }

  const experienceEntry = {
    companyName,
    startDate,
    endDate,
    description,
  };

  experienceData.push(experienceEntry);
  saveToLocalStorage();

  experienceForm.reset();
  experienceForm.style.display = "none";
  displayExperienceData();
}

displayExperienceData();

