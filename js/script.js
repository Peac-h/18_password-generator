// selectors
const form = document.getElementById("form");
const characterRange = document.getElementById("characterRange");
const characterNumber = document.getElementById("characterNumber");
const includelowercase = document.getElementById("includelowercase");
const includeUppercase = document.getElementById("includeUppercase");
const includeNumber = document.getElementById("includeNumber");
const includeSymbol = document.getElementById("includeSymbol");
const passwordElement = document.getElementById("password");
const copyEl = document.getElementById("copy");

// linking together range & number inputs
characterRange.addEventListener("input", linkInputs);
characterNumber.addEventListener("input", linkInputs);
function linkInputs(e) {
  const value = e.target.value;
  characterRange.value = value;
  characterNumber.value = value;
}

// form submit
form.addEventListener("submit", function (e) {
  e.preventDefault();
  passwordElement.textContent = generatePassword();

  // errors for UI
  if (passwordElement.textContent != "Please, choose a character type") {
    copyEl.classList.add("display");
    passwordElement.style.removeProperty("color", "red");
  }
  if (passwordElement.textContent == "Please, choose a character type")
    passwordElement.style.setProperty("color", "red");
});

// password generating function
function generatePassword() {
  // ASCII CharCodes
  const lowercaseCharCode = function () {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
  };
  const uppercaseCharCode = function () {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
  };
  const numberCharCode = function () {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
  };
  const symbolCharCode = function () {
    const allSymbolcharCodes = [
      Math.floor(Math.random() * 15) + 33,
      Math.floor(Math.random() * 7) + 58,
      Math.floor(Math.random() * 6) + 91,
      Math.floor(Math.random() * 4) + 123,
    ];
    const singleSymbolcharCode =
      allSymbolcharCodes[Math.floor(Math.random() * 4)];
    return String.fromCharCode(singleSymbolcharCode);
  };

  // password array and the length
  let password = [];
  const length = characterNumber.value;

  // checking for the inputs
  const lowercase = includelowercase.checked;
  const uppercase = includeUppercase.checked;
  const number = includeNumber.checked;
  const symbol = includeSymbol.checked;

  if (!lowercase && !uppercase && !number && !symbol) {
    copyEl.classList.remove("display");
    return "Please, choose a character type";
  }

  // adding checked input character(s) to the password array
  for (let i = 1; i <= length; i++) {
    if (lowercase) password.push(lowercaseCharCode());
    if (uppercase) password.push(uppercaseCharCode());
    if (number) password.push(numberCharCode());
    if (symbol) password.push(symbolCharCode());
  }

  // slicing the password array to the selected length, shuffling and converting to a string
  password = password
    .slice(0, length)
    .sort(() => Math.random() - 0.5)
    .join("");

  // returning the password
  return password;
}

// light & dark mode
const mode = document.getElementById("mode");

mode.addEventListener("click", function () {
  if (mode.checked) {
    document.body.classList.add("dark-mode");
  }

  if (!mode.checked) {
    document.body.classList.remove("dark-mode");
  }
});

// copy to clipboard
copyEl.addEventListener("click", function () {
  navigator.clipboard.writeText(passwordElement.textContent);
  copyEl.classList.add("active");

  setTimeout(function () {
    copyEl.classList.remove("active");
  }, 1000);
});

//
