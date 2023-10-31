const LinkToSignupPage = "../Signup/Signup.html";
const LinkToEditPage = "../PageEdit/PageEdit.html";

function redirectToSignupPage() {
  window.location.href = LinkToSignupPage;
}

function redirectToEditPage() {
  window.location.href = LinkToEditPage;
}

document.addEventListener("DOMContentLoaded", function () {
  // Retrieve experience data from local storage
  const experienceData = JSON.parse(localStorage.getItem("experienceData"));

  // Check if there's data and display it
  if (experienceData && experienceData.length > 0) {
    const experienceElement = document.querySelector(".experience");

    // Create and append new experience entries
    experienceData.map((experience) => {
      const experienceEntry = document.createElement("div");
      experienceEntry.style.margin = "10px";
      experienceEntry.innerHTML = `
      <div><strong>${experience.companyName}</strong></div>
      <div><strong>${experience.startDate} - ${experience.endDate}</strong></div>
      <div>${experience.description}</div>
    `;
      experienceElement.appendChild(experienceEntry);
    });
  }
});
