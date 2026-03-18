const form = document.getElementById("registrationForm");

const firstName = document.getElementById("firstName");
const middleName = document.getElementById("middleName");
const lastName = document.getElementById("lastName");

// Auto-format function
function formatName(input) {
  input.addEventListener("input", function () {
    let value = input.value;

    // CODE PARA HINDI MAKAPAG INPUT ANG USER NG NUMBERS
    value = value.replace(/[^a-zA-Z\s]/g, "");

    // CODE PARA MA CAPITAL YUNG FIRST LETTER NG NAME
    value = value.toLowerCase().replace(/\b\w/g, c => c.toUpperCase());

    input.value = value;
  });
}

// YUNG FORMAT NAME NA FUNCTION AY ICOCOPY PASTE SA FIRST,MIDDLE, AT LAST NAME
formatName(firstName);
formatName(middleName);
formatName(lastName);

// PASSWORD STRENGTH METER 
const password = document.getElementById("password");
const strengthFill = document.getElementById("strengthFill");
const strengthText = document.getElementById("strengthText");

password.addEventListener("input", function () {
  const value = password.value;
  let strength = 0;

  if (value.length >= 8) strength++;
  if (/[A-Z]/.test(value)) strength++;
  if (/[0-9]/.test(value)) strength++;
  if (/[@$!%*?&]/.test(value)) strength++;

  // Reset classes
  strengthFill.className = "";

  if (strength <= 1) {
    strengthFill.style.width = "25%";
    strengthFill.classList.add("weak");
    strengthText.textContent = "Weak";
  } 
  else if (strength === 2 || strength === 3) {
    strengthFill.style.width = "60%";
    strengthFill.classList.add("medium");
    strengthText.textContent = "Medium";
  } 
  else {
    strengthFill.style.width = "100%";
    strengthFill.classList.add("strong");
    strengthText.textContent = "Strong";
  }
});

form.addEventListener("submit", function(e) {
e.preventDefault();

let isValid = true;

// Inputs
const course = document.getElementById("course");
const gender = document.getElementsByName("gender");
const terms = document.getElementById("terms");

// Regex
const nameRegex = /^[A-Za-z\s]+$/;
const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

// Clear errors
document.querySelectorAll(".error").forEach(e => e.textContent = "");

// First Name
if (!nameRegex.test(firstName.value)) {
showError(firstName, "Only letters allowed"); //PARA BAWAL ANG NUMBERS SA INPUT
isValid = false;
}

// Middle Name (optional)
if (middleName.value && !nameRegex.test(middleName.value)) {
showError(middleName, "Only letters allowed"); //PARA BAWAL ANG NUMBERS SA INPUT
isValid = false;
}

// Last Name
if (!nameRegex.test(lastName.value)) {
showError(lastName, "Only letters allowed"); //PARA BAWAL ANG NUMBERS SA INPUT
isValid = false;
}

// Course
if (course.value === "") {
showError(course, "Please select a course");
isValid = false;
}

// Password
if (!passwordRegex.test(password.value)) {
showError(password, "Min 8 chars, 1 uppercase, 1 number, 1 special char");
isValid = false;
}

// Gender
let genderSelected = false;
gender.forEach(g => {
if (g.checked) genderSelected = true;
});

if (!genderSelected) {
showError(gender[0], "Select gender");
isValid = false;
}

// Terms
if (!terms.checked) {
showError(terms, "You must accept terms");
isValid = false;
}

// Success
if (isValid) {
const successMsg = document.createElement("div");
successMsg.textContent = "🎉 Registration Successful!";
successMsg.style.background = "#28a745";
successMsg.style.color = "#fff";
successMsg.style.padding = "10px";
successMsg.style.marginTop = "15px";
successMsg.style.textAlign = "center";
successMsg.style.borderRadius = "5px";

form.appendChild(successMsg);

setTimeout(() => {
  successMsg.remove();
}, 3000);
form.reset();
}
});

// Error function
function showError(input, message) {
const formGroup = input.closest(".form-group");
formGroup.querySelector(".error").textContent = message;
}