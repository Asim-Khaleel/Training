const LINK_TO_SIGNUPPAGE = "../Signup/Signup.html";
const LINK_TO_EDITPAGE = "../PageEdit/PageEdit.html";

function redirectToSignupPage() {
  window.location.href = LINK_TO_SIGNUPPAGE;
}

function redirectToEditPage() {
  window.location.href = LINK_TO_EDITPAGE;
}

document.addEventListener("DOMContentLoaded", function () {

  const experienceData = JSON.parse(localStorage.getItem("experienceData"));

  if (experienceData && experienceData.length > 0) {
    const experienceElement = document.querySelector(".experience");


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
