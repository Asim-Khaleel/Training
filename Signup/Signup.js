const LINK_TO_PORTFOLIOPAGE = '../Portfolio/Portfolio.html';
const nameErrorMessage = "Name is required.";
const emailErrorMessage = "Email is required and must contain '@'.";
const passwordErrorMessage = "Password must have at least 8 characters.";
const registrationSuccessMessage = "Registration successful \u{1F603}";

function redirectToPortfolioPage() {
  window.location.href = LINK_TO_PORTFOLIOPAGE;
}

function validateForm() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const nameError = document.getElementById("nameError");
  const emailError = document.getElementById("emailError");
  const passwordError = document.getElementById("passwordError");
  const successMessage = document.getElementById("successMessage");

  nameError.textContent = "";
  emailError.textContent = "";
  passwordError.textContent = "";
  successMessage.textContent = "";

  let isValid = true;

  if (name.trim() === "") {
    nameError.textContent = nameErrorMessage;
    document.getElementById("name").style.borderColor = "red";
    isValid = false;
  } else {
    document.getElementById("name").style.borderColor = "";
  }

  if (email.trim() === "" || !email.includes("@")) {
    emailError.textContent = emailErrorMessage;
    document.getElementById("email").style.borderColor = "red";
    isValid = false;
  } else {
    document.getElementById("email").style.borderColor = "";
  }

  if (password.length < 8) {
    passwordError.textContent = passwordErrorMessage;
    document.getElementById("password").style.borderColor = "red";
    isValid = false;
  } else {
    document.getElementById("password").style.borderColor = "";
  }

  if (isValid) {
    successMessage.textContent = registrationSuccessMessage;
    successMessage.style.color = "green";
  }
}
