const LinkToPortfolioPage = "../Portfolio/Portfolio.html";

function redirectToPortfolioPage() {
  window.location.href = LinkToPortfolioPage;
}

  const addExperienceButton = document.getElementById("addExperienceButton");
  const experienceForm = document.getElementById("experienceForm");
  const saveExperienceButton = document.getElementById("saveExperienceButton");
  const experienceEntries = document.getElementById("experienceEntries");

  addExperienceButton.addEventListener("click", () => {
    experienceForm.style.display = "flex";
  });

  saveExperienceButton.addEventListener("click", () => {
    const companyName = document.getElementById("companyName").value;
    const startDate = document.getElementById("startDate").value;
    const endDate = document.getElementById("endDate").value;
    const description = document.getElementById("description").value;

    const experienceEntry = document.createElement("div");
    experienceEntry.classList.add("experience-entry");
    experienceEntry.style.margin = "10px 0px";
    experienceEntry.innerHTML = `
      <div><strong> ${companyName}</strong></div>

      <div><strong>${startDate} - ${endDate}</strong> </div>
      <div> ${description}</div>
    `;
    experienceEntries.appendChild(experienceEntry);

    experienceForm.reset();
    experienceForm.style.display = "none";
  });

