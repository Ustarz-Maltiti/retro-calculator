const display = document.getElementById('result');

let currentInput = '0';
let previousInput = '';
let operator = null;
let shouldResetDisplay = false;

function updateDisplay(value) {
  display.textContent = value;
}

function handleNumber(num) {
  if (shouldResetDisplay) {
    currentInput = num;
    shouldResetDisplay = false;
  } else {
    currentInput = currentInput === '0' ? num : currentInput + num;
  }
  updateDisplay(currentInput);
}

function handleDecimal() {
  if (shouldResetDisplay) {
    currentInput = '0.';
    shouldResetDisplay = false;
  } else if (!currentInput.includes('.')) {
    currentInput += '.';
  }
  updateDisplay(currentInput);
}

function handleOperator(op) {
  previousInput = currentInput;
  operator = op;
  shouldResetDisplay = true;
}

function calculate() {
  if (!operator || !previousInput) return;
  const a = parseFloat(previousInput);
  const b = parseFloat(currentInput);
  let result;

  if (operator === '÷') result = a / b;
  else if (operator === '×') result = a * b;
  else if (operator === '−') result = a - b;
  else if (operator === '+') result = a + b;

  currentInput = String(parseFloat(result.toFixed(8)));
  operator = null;
  previousInput = '';
  shouldResetDisplay = true;
  updateDisplay(currentInput);
}

function handleSpecial(action) {
  if (action === 'C') {
    currentInput = '0';
    previousInput = '';
    operator = null;
    shouldResetDisplay = false;
    updateDisplay('0');
  } else if (action === '+/-') {
    currentInput = String(parseFloat(currentInput) * -1);
    updateDisplay(currentInput);
  } else if (action === '%') {
    currentInput = String(parseFloat(currentInput) / 100);
    updateDisplay(currentInput);
    } else if (action === '⌫') {
    if (currentInput.length > 1) {
      currentInput = currentInput.slice(0, -1);
    } else {
      currentInput = '0';
    }
    updateDisplay(currentInput);
  }
  }


document.querySelectorAll('.btn').forEach(button => {
  button.addEventListener('click', () => {
    const text = button.textContent.trim();

    if (!isNaN(text)) {
      handleNumber(text);
    } else if (text === '.') {
      handleDecimal();
    } else if (['÷', '×', '−', '+'].includes(text)) {
      handleOperator(text);
    } else if (text === '=') {
      calculate();
    } else {
      handleSpecial(text);
    }
  });
});