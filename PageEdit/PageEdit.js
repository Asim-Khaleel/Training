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
  experienceEntries.innerHTML = "";
  experienceData.forEach((experience) => {
    const experienceEntry = document.createElement("div");
    experienceEntry.innerHTML = `
      <div><strong>${experience.companyName}</strong></div>
      <div><strong>${experience.startDate} - ${experience.endDate}</strong></div>
      <div>${experience.description}</div>
    `;
    experienceEntries.appendChild(experienceEntry);
  });
}

addExperienceButton.addEventListener("click", () => {
  experienceForm.style.display = "flex";
});

saveExperienceButton.addEventListener("click", () => {
  const companyName = document.getElementById("companyName").value;
  const startDate = document.getElementById("startDate").value;
  const endDate = document.getElementById("endDate").value;
  const description = document.getElementById("description").value;

  if (companyName === "" || startDate === "" || endDate === "" || description === "") {
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

  displayExperienceData();

  experienceForm.reset();
  experienceForm.style.display = "none";
});

displayExperienceData();
