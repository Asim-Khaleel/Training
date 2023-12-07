const API_URL = "http://localhost:5000/api/portfolio/experience";
const addExperienceButton = document.getElementById("addExperienceButton");
const experienceForm = document.getElementById("experienceForm");
const saveExperienceButton = document.getElementById("saveExperienceButton");
const experienceEntries = document.getElementById("experienceEntries");
const LINK_TO_PORTFOLIOPAGE = "../Portfolio/Portfolio.html";

function redirectToPortfolioPage() {
  window.location.href = LINK_TO_PORTFOLIOPAGE;
}

function formatDate(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

async function fetchExperienceData() {
  try {
    showLoader();
    const response = await fetch(API_URL);
    const data = await response.json();
    experienceData = data || [];
    displayExperienceData();
    hideLoader();
  } catch (error) {
    hideLoader();
    console.error("Error fetching data:", error);
    showFetchErrorMessage();
  }

  if (experienceData.length === 0) {
    showNoDataMessage();
  } else {
    hideNoDataMessage();
  }
}

function showFetchErrorMessage() {
  const errorMessageContainer = document.getElementById("fetchErrorMessage");
  if (errorMessageContainer) {
    errorMessageContainer.style.display = "block";
  }
}

function showLoader() {
  document.getElementById("loader").style.display = "block";
}

function hideLoader() {
  document.getElementById("loader").style.display = "none";
}

function showNoDataMessage() {
  document.getElementById("noDataMessage").style.display = "block";
}

function hideNoDataMessage() {
  document.getElementById("noDataMessage").style.display = "none";
}

async function addExperienceEntry(entry) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(entry),
    });
    const data = await response.json();
    experienceData.push(data);
    displayExperienceData();
  } catch (error) {
    console.error("Error adding experience entry:", error);
  }
}

async function updateExperienceEntry(_id, entry) {
  try {
    const response = await fetch(`${API_URL}/${_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(entry),
    });
    const data = await response.json();
    const updatedIndex = experienceData.findIndex((item) => item._id === _id);
    experienceData[updatedIndex] = data;
    displayExperienceData();
  } catch (error) {
    console.error("Error updating experience entry:", error);
  }
}

async function deleteExperienceEntry(_id) {
  try {
    await fetch(`${API_URL}/${_id}`, {
      method: "DELETE",
    });

    experienceData = experienceData.filter((item) => item._id !== _id);
    const elementToRemove = experienceEntries.querySelector(
      `[data-id="${_id}"]`
    );
    if (elementToRemove) {
      elementToRemove.remove();
    }
  } catch (error) {
    console.error("Error deleting experience entry:", error);
  }
  displayExperienceData();
}

function displayExperienceData() {
  experienceEntries.innerHTML = "";
  experienceData.map((experience, _id) => {
    const experienceEntry = document.createElement("div");
    experienceEntry.setAttribute("data-id", experience._id);
    experienceEntry.innerHTML = `
  <button class="edit-button" data-id="${experience._id}">Edit</button>
  <button class="delete-button" data-id="${experience._id}">Delete</button>
  <div><strong>${experience.company}</strong></div>
  <div><strong>${formatDate(experience.startDate)} - ${formatDate(
      experience.endDate
    )}</strong></div>
  <div>${experience.description}</div>
`;

    experienceEntries.appendChild(experienceEntry);

    const deleteButton = experienceEntry.querySelector(".delete-button");
    deleteButton.addEventListener("click", () =>
      deleteExperienceEntry(experience._id)
    );

    const editButton = experienceEntry.querySelector(".edit-button");
    editButton.addEventListener("click", () => showEditForm(experience._id));
  });
}

function showEditForm(_id) {
  const experienceEntry = experienceData.find((entry) => entry._id === _id);
  const editForm = document.createElement("form");
  editForm.innerHTML = `
    <div class="addDetails">
      <div class="companyNameAndDates">
        <input type="text" id="editCompanyName" value="${
          experienceEntry.company
        }" placeholder="Company"/>
        <input type="date" id="editStartDate" value="${formatDate(
          experienceEntry.startDate
        )}" placeholder="Start date"/>
        <input type="date" id="editEndDate" value="${formatDate(
          experienceEntry.endDate
        )}" placeholder="End date"/>
      </div>
      <div class="descriptionAndButton">
        <textarea id="editDescription" rows="4" style="width: 85%">${
          experienceEntry.description
        }</textarea>
        <button id="saveEditButton">Update</button>
      </div>
    </div>
  `;

  const saveEditButton = editForm.querySelector("#saveEditButton");
  saveEditButton.addEventListener("click", () => saveEditedExperience(_id));

  const existingEntry = experienceEntries.querySelector(`[data-id="${_id}"]`);

  if (existingEntry) {
    existingEntry.innerHTML = "";
    existingEntry.appendChild(editForm);
  }
}

async function saveEditedExperience(_id) {
  const company = document.getElementById("editCompanyName").value;
  const startDate = document.getElementById("editStartDate").value;
  const endDate = document.getElementById("editEndDate").value;
  const description = document.getElementById("editDescription").value;

  if (
    company === "" ||
    startDate === "" ||
    endDate === "" ||
    description === ""
  ) {
    alert("Please fill in all fields.");
    return;
  }

  const experienceEntry = {
    company,
    startDate,
    endDate,
    description,
  };

  await updateExperienceEntry(_id, experienceEntry);

  const updatedIndex = experienceData.findIndex((item) => item._id === _id);
  experienceData[updatedIndex] = { _id, ...experienceEntry };

  displayExperienceData();
}

function saveNewExperience() {
  const company = document.getElementById("companyName").value;
  const startDate = document.getElementById("startDate").value;
  const endDate = document.getElementById("endDate").value;
  const description = document.getElementById("description").value;

  if (
    company === "" ||
    startDate === "" ||
    endDate === "" ||
    description === ""
  ) {
    alert("Please fill in all fields.");
  }

  const experienceEntry = {
    company,
    startDate,
    endDate,
    description,
  };

  addExperienceEntry(experienceEntry);

  experienceForm.reset();
  experienceForm.style.display = "none";
}

addExperienceButton.addEventListener("click", () => {
  experienceForm.reset();
  experienceForm.style.display = "flex";
  saveExperienceButton.removeEventListener("click", saveEditedExperience);
  saveExperienceButton.addEventListener("click", saveNewExperience);
});

fetchExperienceData();
