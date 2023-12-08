const LINK_TO_SIGNUPPAGE = "../Signup/Signup.html";
const LINK_TO_EDITPAGE = "../PageEdit/PageEdit.html";
const LINK_TO_DATAVIEWPAGE = "../DataView/DataView.html";
const API_URL = "http://localhost:5000/api/portfolio/experience";

function redirectToSignupPage() {
  window.location.href = LINK_TO_SIGNUPPAGE;
}

function redirectToEditPage() {
  window.location.href = LINK_TO_EDITPAGE;
}

function redirectToGetDataPage() {
  window.location.href = LINK_TO_DATAVIEWPAGE;
}

function formatDate(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

document.addEventListener("DOMContentLoaded", async function () {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`Failed to fetch data. Status: ${response.status}`);
    }

    const experienceData = await response.json();

    if (experienceData && experienceData.length > 0) {
      const experienceElement = document.querySelector(".experience");

      experienceData.forEach((experience) => {
        const experienceEntry = document.createElement("div");
        experienceEntry.style.margin = "10px";
        experienceEntry.innerHTML = `
          <div><strong>${experience.company}</strong></div>
          <div><strong>${formatDate(experience.startDate)} - ${formatDate(
          experience.endDate
        )}</strong></div>
          <div>${experience.description}</div>
        `;
        experienceElement.appendChild(experienceEntry);
      });
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});
