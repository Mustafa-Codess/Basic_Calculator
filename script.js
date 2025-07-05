const display = document.getElementById("display");
const modeToggle = document.getElementById("modeToggle");

function append(value) {
  const current = display.value;

  // Prevent multiple leading zeros like 00 or 000
  if (current === "0" && value !== "." && !isOperator(value)) {
    display.value = value; // Replace 0 with the new digit
    return;
  }

  // Prevent entering '0' as the first digit
  if (current === "" && value === "0") {
    return; // Don't allow 0 as first digit
  }

  display.value += value;
}

function isOperator(char) {
  return ["+", "-", "*", "/"].includes(char);
}

function clearDisplay() {
  display.value = "";
}

function deleteLast() {
  display.value = display.value.slice(0, -1);
}

function calculate() {
  try {
    const exp = display.value;

    // Handle percent logic like: 100 - 10%
    const match = exp.match(/([\d.]+)\s*([\+\-\*\/])\s*([\d.]+)%$/);

    if (match) {
      const base = parseFloat(match[1]);
      const operator = match[2];
      const percentValue = parseFloat(match[3]);

      const percent = (base * percentValue) / 100;
      const result = eval(`${base} ${operator} ${percent}`);
      display.value = result;
    } else {
      display.value = eval(exp);
    }

  } catch {
    display.value = "Error";
  }
}

function percent() {
  if (!display.value.endsWith('%')) {
    display.value += '%';
  }
}

modeToggle.addEventListener("change", function () {
  document.body.classList.toggle("dark");
});
