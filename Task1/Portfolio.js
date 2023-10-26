const linkToSignupPage = "../Task2/Task2.html";
const linkToEditPage = "../Task3/Task3.html";

const loginButton = document.getElementById("loginButton");
loginButton.addEventListener("click", function() {
  window.location.href = linkToSignupPage;
});

const editButton = document.getElementById("editButton");
editButton.addEventListener("click", function() {
  window.location.href = linkToEditPage;
})
