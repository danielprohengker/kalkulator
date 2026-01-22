const display = document.querySelector(".display");
const buttons = document.querySelectorAll(".btn");

let expression = "";

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.innerText;

    if (value === "AC") {
      hapusSemua();
    } else if (value === "=") {
      hitungHasil();
    } else if (value === "+/-") {
      ubahTanda();
    } else if (value === "%") {
      persen();
    } else {
      tambahKarakter(value);
    }
  });
});

function tambahKarakter(char) {
  if (expression === "Error" || expression === "Infinity") {
    expression = "";
  }

  const lastChar = expression.slice(-1);
  const operators = ["÷", "×", "−", "+"];

  if (operators.includes(char) && operators.includes(lastChar)) {
    expression = expression.slice(0, -1) + char;
  } else {
    expression += char;
  }

  updateDisplay();
}

function hapusSemua() {
  expression = "";
  updateDisplay();
}

function hitungHasil() {
  try {
    let rumusSiapHitung = expression
      .replaceAll("×", "*")
      .replaceAll("÷", "/")
      .replaceAll("−", "-");

    let hasil = eval(rumusSiapHitung);

    expression = hasil.toString();
  } catch (error) {
    expression = "Error";
  }
  updateDisplay();
}

function ubahTanda() {
  const regex = /(-?\d+(\.\d+)?)$/;
  const match = expression.match(regex);

  if (match) {
    const lastNumber = match[0];
    const invertedNumber = (parseFloat(lastNumber) * -1).toString();

    expression = expression.replace(regex, invertedNumber);
    updateDisplay();
  }
}

function persen() {
  const regex = /(\d+(\.\d+)?)$/;
  const match = expression.match(regex);

  if (match) {
    const lastNumber = match[0];
    const percentValue = (parseFloat(lastNumber) / 100).toString();

    expression = expression.replace(regex, percentValue);
    updateDisplay();
  }
}

function updateDisplay() {
  display.innerText = expression === "" ? "0" : expression;
}
