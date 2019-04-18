let submit = document.querySelector("#button");
let email = document.querySelector("#email");
let number = document.querySelector("#number");
let errorCode = document.querySelector("#error");
let carrier = document.querySelector("#carrier");
const emailKey = "bvd5889-email";
const numKey = "bvd5889-number";
const carrierKey = "bvd5889-carrier";

errorCode.innerHTML = "";
submit.addEventListener("click", storeValues);
number.addEventListener("click", resetCode);
email.addEventListener("click", resetCode);

let info = document.querySelector("#infoButt");
let landing = document.querySelector("#landing");
let savehtml = landing.innerHTML;
let toggle = true;

getValues();

document.addEventListener("keydown", function (e)
{
  if(e.which == 13)
  {
    storeValues();
  }
});

function getValues()
{
  let theNum = localStorage.getItem(numKey);
  let theEmail = localStorage.getItem(emailKey);
  let theCarrier = localStorage.getItem(carrierKey);

  if(theNum && theEmail && theCarrier)
  {
    email.value = theEmail;
    number.value = theNum;
    carrier.value = theCarrier;
  }
  else
  {
    return;
  }
}

function storeValues() {
  let userNum = getNum(number.value);
  let userEm = email.value;
  let userCarrier = carrier.value;
  if (!inputCheck(userEm, userNum)) {
    return;
  }

  localStorage.setItem(emailKey, userEm);
  localStorage.setItem(numKey, userNum);
  localStorage.setItem(carrierKey, userCarrier);

  location.href = "myself.html";
    console.log("Executed!");
}

function inputCheck(emailAdd, phoneNumber) {
  let goodInput = false;

  if (phoneNumber == null && !checkEmail(emailAdd)) {
    errorCode.innerHTML = "please enter a valid email address and phone number.";
    return;
  }
  if (phoneNumber == null) {
    errorCode.innerHTML = "please enter a valid phone number, with only number values (area code 2).";
    return;
  }
  if (!checkEmail(emailAdd)) {
    errorCode.innerHTML = "please enter a valid email address.";
    return;
  }

  goodInput = true;
  return goodInput;
}

function resetCode() {
  errorCode.innerHTML = "";
}

function checkEmail(emString) {
  let isEmail = false;

  for (let i = 0; i < emString.length; i++) {
    let currentLetter = emString.substr(i, 1);

    if (currentLetter == "@") {
      isEmail = true;
      break;
    }
  }

  return isEmail;
}

function getNum(numString) {
  let finalNum = "";

  for (let i = 0; i < numString.length; i++) {
    let currentLetter = numString.substr(i, 1);

    if (!isNaN(parseInt(currentLetter, 10))) {
      finalNum += numString.substr(i, 1);
    }
  }

  if (finalNum.length != 10) {
    return null;
  } else {
    return finalNum;
  }
}

info.onclick = (e) =>
{
  if(toggle)
  {
    landing.innerHTML = "<h1><u>about</u></h1><p id='info'><u>if a tree falls on u</u> is a story about a family told through prose, poetry, emails, texts, links, videos, imagery, sound, and other forms of media.<br><br>your email and phone number will only be saved on your personal machine, only accessable by these pages. you will not be spammed, the only communication will be when you directly interact with the application.<br><br><3<br><br><a class='txtbutt' href='https://github.com/Dcruzships/if-a-tree-falls-on-u' target='_blank'>more info here</a><br><br><a class='txtbutt' href='https://dcruzships.github.io/' target='_blank'>about me</a></p>";

    info.innerHTML = "back";
  }
  else
  {
    landing.innerHTML = savehtml;
    info.innerHTML = "info";

    submit = document.querySelector("#button");
    email = document.querySelector("#email");
    number = document.querySelector("#number");
    errorCode = document.querySelector("#error");
    carrier = document.querySelector("#carrier");

    errorCode.innerHTML = "";
    submit.addEventListener("click", storeValues);
    number.addEventListener("click", resetCode);
    email.addEventListener("click", resetCode);

    info = document.querySelector("#infoButt");
    landing = document.querySelector("#landing");
  }

  toggle = !toggle;
}
