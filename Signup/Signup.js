const LINK_TO_PORTFOLIOPAGE = '../Portfolio/Portfolio.html';
const nameErrorMessage = "Name is required.";
const emailErrorMessage = "Email is required and must contain '@'.";
const passwordErrorMessage = "Password must have at least 8 characters.";
const registrationSuccessMessage = "Registration successful \u{1F603}";
const apiEndpoint = 'https://dummyjson.com/docs/users/#add';

function redirectToPortfolioPage() {
  window.location.href = LINK_TO_PORTFOLIOPAGE;
}

async function sendFormDataToAPI(name, email, password) {
  try {
    const response = await fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });

    if (response.ok) {
      return { success: true };
    } else {
      const data = await response.json();
      return { success: false, error: data.message };
    }
  } catch (error) {
    return { success: false, error: 'An error occurred while processing your request.' };
  }
}

async function validateForm() {
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
    const apiResponse = await sendFormDataToAPI(name, email, password);

    if (apiResponse.success) {
      successMessage.textContent = registrationSuccessMessage;
      successMessage.style.color = "green";
    } else {
      successMessage.textContent = `Error: ${apiResponse.error}`;
      successMessage.style.color = "red";
    }
  }
}
