// DOM Elements
const laptopsElement = document.getElementById("laptops")
const descriptionElement = document.getElementById("description")
const featureElement = document.getElementById("features")
const imgElement = document.getElementById("img")
const titleElement = document.getElementById("laptopTitle")
const currencyElement = document.getElementById("DKK")
const workBtnElement = document.querySelector('.workBtn')
const bankBtnElement = document.querySelector('.bankBtn')
const loanBtnElement = document.querySelector('.loanBtn')
const transferLoanBtn = document.querySelector('.transferLoanBtn')
const paybackLoanBtn = document.querySelector('.paybackLoanBtn')
const buyNowBtn = document.querySelector('.buyBtn')
const showTransferSalaryToBank = document.querySelector('.bankBalance')
const showLoanBalance = document.querySelector('.showLoanBalance')

let showLoan = document.querySelector('.showLoan')
let workSalaryElement = document.querySelector('.workSalary')

let laptops = [];
let laptopPrice = 0;
let salary = 0;
let bank = 0;
let loan = 0;

fetch("https://hickory-quilled-actress.glitch.me/computers")
  .then(response => response.json())
  .then(data => laptops = data)
  .then(laptops => addLaptopsToMenu(laptops))

const addLaptopsToMenu = (laptops) => {
  laptops.forEach(x => addLaptopToMenu(x));
}

const addLaptopToMenu = (laptop) => {
  const dropDownElement = document.createElement("option");
  dropDownElement.value = laptop.id;
  dropDownElement.appendChild(document.createTextNode(laptop.title));
  laptopsElement.appendChild(dropDownElement);
}

// adds the price for each laptop to the menu when selected
const addCurrencyToMenu = e => {
  const selectedLaptop = laptops[e.target.selectedIndex];
  currencyElement.innerText = selectedLaptop.price;
  price = selectedLaptop.price;
}
laptopsElement.addEventListener("change", addCurrencyToMenu)

// adds the title of each laptop to the menu when selected
const addTitleToMenu = e => {
  const selectedLaptop = laptops[e.target.selectedIndex];
  titleElement.innerText = selectedLaptop.title;
}
laptopsElement.addEventListener("change", addTitleToMenu)

//adds the image of each laptop when selected
const addImgToMenu = e => {
  const selectedLaptop = laptops[e.target.selectedIndex];
  imgElement.src = selectedLaptop.image;
}
laptopsElement.addEventListener("change", addImgToMenu)

// adds the description of each laptop when selected
const addDescriptionToMenu = e => {
  const selectedLaptop = laptops[e.target.selectedIndex];
  descriptionElement.innerText = selectedLaptop.description;
}
laptopsElement.addEventListener("change", addDescriptionToMenu)

// adds the features of each laptop when selected
const addFeatureToMenu = e => {
  const selectedLaptop = laptops[e.target.selectedIndex];
  featureElement.innerText = selectedLaptop.specs;
}
laptopsElement.addEventListener("change", addFeatureToMenu)


// buttons
workBtnElement.addEventListener("click", function () {
  salary += 100;
  workSalaryElement.innerText = `${salary} kr.`;
});

bankBtnElement.addEventListener("click", function () {
  bank += salary;
  salary = 0;
  workSalaryElement.innerText = salary + ' kr.';
  showTransferSalaryToBank.innerText = `${bank} kr.`;
});

loanBtnElement.addEventListener("click", function () {
  if (loan > 0) {
    alert("You can't have more that one loan")
  }
  else {
    var loanAmount = prompt("How much do you want to loan?", "Amount")
    loan = loanAmount;
    showLoan.innerText = loan + ' kr.';
  }
});

transferLoanBtn.addEventListener("click", function () {
  bank = +bank + +loan;
  showTransferSalaryToBank.innerText = `${bank} kr.`;
  showLoanBalance.innerText = loan;
  showLoan.innerText = loan + ' kr.';
  paybackLoanBtn.removeAttribute("hidden")

});

paybackLoanBtn.addEventListener("click", function () {
  var paybackAmount = prompt("How much do you want to payback?", "Amount")
  bank = +bank - +paybackAmount;
  showLoanBalance.innerText = +showLoanBalance.innerText - +paybackAmount;
  showTransferSalaryToBank.innerText = `${bank} kr.`;
  loan = +loan - +paybackAmount;
  showLoan.innerText = loan;
});

buyNowBtn.addEventListener("click", function () {
  bank = +bank - +price;
  showTransferSalaryToBank.innerText = `${bank} kr.`;
});
