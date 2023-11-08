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

// Add the following code after your existing code
const companyFilterInput = document.getElementById("companyFilter");
companyFilterInput.addEventListener("input", filterExperienceData);

function filterExperienceData() {
  const filterText = companyFilterInput.value.toLowerCase();
  const filteredData = experienceData.filter((experience) => {
    return experience.companyName.toLowerCase().includes(filterText);
  });
  displayExperienceData(filteredData);
}

// Modify the displayExperienceData function to accept a filteredData parameter
function displayExperienceData(filteredData) {
  experienceEntries.innerHTML = "";

  const dataToDisplay = filteredData || experienceData; // Use the filtered data if available

  dataToDisplay.map((experience, index) => {
    const experienceEntry = document.createElement("div");
    experienceEntry.innerHTML = `
      <button class="edit-button" data-index="${index}">Edit</button>
      <button class="delete-button" data-index="${index}">Delete</button>
      <div><strong>${experience.companyName}</strong></div>
      <div><strong>${experience.startDate} - ${experience.endDate}</strong></div>
      <div>${experience.description}</div>
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
  const editForm = document.createElement("form");
  editForm.innerHTML = `
    <div class="addDetails">
      <div class="companyNameAndDates">
        <input type="text" id="editCompanyName" value="${experienceEntry.companyName}" placeholder="Company"/>
        <input type="date" id="editStartDate" value="${experienceEntry.startDate}" placeholder="Start date"/>
        <input type="date" id="editEndDate" value="${experienceEntry.endDate}" placeholder="End date"/>
      </div>
      <div class="descriptionAndButton">
        <textarea id="editDescription" rows="4" style="width: 85%">${experienceEntry.description}</textarea>
        <button id="saveEditButton">Update</button>
      </div>
    </div>
  `;

  const saveEditButton = editForm.querySelector("#saveEditButton");
  saveEditButton.addEventListener("click", () => saveEditedExperience(index));

  experienceEntries.replaceChild(editForm, experienceEntries.childNodes[index]);
}

function saveEditedExperience(index) {
  const companyName = document.getElementById("editCompanyName").value;
  const startDate = document.getElementById("editStartDate").value;
  const endDate = document.getElementById("editEndDate").value;
  const description = document.getElementById("editDescription").value;

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
  displayExperienceData();
}

addExperienceButton.addEventListener("click", () => {
  experienceForm.reset();
  experienceForm.style.display = "flex";
  saveExperienceButton.removeEventListener("click", saveEditedExperience);
  saveExperienceButton.addEventListener("click", saveNewExperience);
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
