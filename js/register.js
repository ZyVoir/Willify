// handles password visibility
var isPasswordVisible = false;
const eyePassword = document.getElementById("password-eye");
const formPassword = document.getElementById("form-password");

eyePassword.addEventListener("click", function () {
	if (isPasswordVisible) {
		eyePassword.src = "../asset/eye-slash-regular.svg";
		formPassword.type = "password";
	} else {
		eyePassword.src = "../asset/eye-regular.svg";
		formPassword.type = "text";
	}
	isPasswordVisible = !isPasswordVisible;
});

//handles slider age text
const textAge = document.getElementById("age-value");
const sliderAge = document.getElementById("slider-age");
//initial value
sliderAge.value = 1;
textAge.innerText = sliderAge.value;
sliderAge.addEventListener("input", function () {
	textAge.innerText = sliderAge.value;
});

//handles input text and password onchange error
// name

function isSpecialCharExist(str, isName) {
	var specialCharacters = "!@#$%^&*()-_=+[{]}\\|;:'\",<.>/?";

	if (!isName) {
		// email validation -> . and @ removed
		specialCharacters = specialCharacters.replace("@", "");
		specialCharacters = specialCharacters.replace(".", "");
	}
	for (let i = 0; i < str.length; i++) {
		if (specialCharacters.includes(str[i])) return true;
	}
	return false;
}

const inputName = document.querySelector(".register-textfield.name");
inputName.querySelector("input").addEventListener("input", function (e) {
	const errorMsg = inputName.querySelector("div.error");
	if (this.value.length === 0 || this.value.length > 8) {
		errorMsg.innerText = "";
		this.classList.remove("error");
	} else if (isSpecialCharExist(this.value.toString(), true)) {
		this.classList.add("error");
		errorMsg.innerText = "Must not have any special characters";
	} else if (this.value.length <= 8) {
		this.classList.add("error");
		errorMsg.innerText = "Must be more than 8 characters";
	}
});

// email
function isValidEmail(email) {
	const atIndex = email.indexOf("@");
	if (isSpecialCharExist(email, false) || atIndex === -1 || atIndex === 0) {
		return false;
	}
	const dotIndex = email.lastIndexOf(".");
	if (dotIndex <= atIndex + 1 || dotIndex === email.length - 1) {
		return false;
	}

	return true;
}

const inputEmail = document.querySelector(".register-textfield.email");
inputEmail.querySelector("input").addEventListener("input", function (e) {
	const errorMsg = inputEmail.querySelector("div.error");
	if (this.value.length === 0) {
		errorMsg.innerText = "";
		this.classList.remove("error");
	} else if (!isValidEmail(this.value.toString())) {
		errorMsg.innerText = "Must be valid!";
		this.classList.add("error");
	} else {
		errorMsg.innerText = "";
		this.classList.remove("error");
	}
});

const inputPassword = document.querySelector(".register-textfield .password");
inputPassword.querySelector("input").addEventListener("input", function (e) {
	const errorMsg = inputPassword.parentElement.querySelector("div.error");
	if (this.value.length === 0 || this.value.length > 8) {
		errorMsg.innerText = "";
		this.classList.remove("error");
	} else if (this.value.length <= 8) {
		errorMsg.innerText = "Must be more than 8 characters";
		this.classList.add("error");
	}
});

// handles submission validation
const form = document.getElementsByClassName("register")[0];
form.addEventListener("submit", function (e) {
	e.preventDefault();
	if (validateInput()) {
		// TODO : Post-Validation Process
	}
});

function validateInput() {
	const validateName = form[0].value;
	const validateEmail = form[1].value;
	const validatePassword = form[2].value;
	const validateAge = form[3].value;
	const validateGender = document.querySelector("input[name=Gender]:checked");
	const validateCheck = form[6].checked;

	// all input has been filled and checked
	if (
		validateName == "" ||
		validateEmail == "" ||
		validatePassword == "" ||
		validateAge == "" ||
		!validateGender ||
		!validateCheck
	) {
		alert("All field be filled and checked!");
		return false;
	}
	//all input is valid (checking if one or more input has a .error class)
	const notValidInput = document.querySelectorAll(
		".register-textfield input.error"
	);
	if (notValidInput.length != 0) {
		alert("Input must be valid!");
		return false;
	}

	//check if older than 18
	if (validateAge < 18) {
		alert("Must be 18 or older");
		return false;
	}

	return true;
}
