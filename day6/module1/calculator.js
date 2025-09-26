function calculate() {
  document.getElementById("interest").innerHTML = "";
  document.getElementById("amount").innerHTML = "";
  document.getElementById("ad").innerHTML = "";

  let principal = parseFloat(document.getElementById("principal").value);
  let number = parseFloat(document.getElementById("number").value);

  if (isNaN(principal) || isNaN(number)) {
    document.getElementById("ad").innerHTML = "Enter a Valid Input.";
    return;
  }

  if (principal < 500 || principal > 10000) {
    document.getElementById("ad").innerHTML = "Enter a Principal Amount in this Range $500-$10,000.";
    return;
  }

  let rate = 0;
  if (principal <= 1000) {
    rate = 5;
  } else if (principal > 1000 && principal < 5000) {
    rate = 7;
  } else {
    rate = 10;
  }

  let bonus = false;

  if (number > 5) {
    rate += 2;
    bonus = true;
  }

  let interest = (principal * number * rate) / 100;
  let amount = principal + interest;

  let ad = "Bonus 2(%) Interest Applied : " + bonus + " <br> Applied Rate of Interest :" + rate + "(%)";

  document.getElementById("interest").innerHTML = interest;
  document.getElementById("amount").innerHTML = amount;
  document.getElementById("ad").innerHTML = ad;
}
