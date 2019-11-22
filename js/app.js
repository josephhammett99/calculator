const calc = {
    val: '0',  //Allows the value to be displayed on the CSS screen
    operator: null,
    operand1: null,
    operand2: false,
};

function digit(digit) {
    const { val, operand2 } = calc;
    if (operand2 === true) {
        calc.val = digit;
        calc.operand2 = false;
    } else {
        calc.val = val === '0' ? digit : val + digit;
    }
}

function handleOperator(nextOp) {
    const { operand1, val, operator } = calc
    const inputValue = parseFloat(val);
    if (operator && calc.operand2) {
        calc.operator = nextOp;
        return;
    }
    if (operand1 == null) {
        calc.operand1 = inputValue;
    } else if (operator) {
        const currentValue = operand1 || 0;
        const result = performCalculation[operator](currentValue, inputValue);
        calc.val = String(result);
        calc.operand1 = result;
    }
    calc.operand2 = true;
    calc.operator = nextOp;
}
const performCalculation = {
    '/': (operand1, newOp) => operand1 / newOp,

    '*': (operand1, newOp) => operand1 * newOp,

    '+': (operand1, newOp) => operand1 + newOp,

    '-': (operand1, newOp) => operand1 - newOp,

    '=': (_operand1, newOp) => newOp
};

function decimal(dot) {
    if (calc.operand2 === true) return;

    if (!calc.val.includes(dot)) {
        calc.val += dot;
    }
}

function updateDisplay() {
    const display = document.querySelector('.screen');
    display.value = calc.val;
}

updateDisplay();

const keys = document.querySelector('.keys');
keys.addEventListener('click', (event) => {
    const { target } = event;
    if (!target.matches('button')) {
        return;
    }
    if (target.classList.contains('operator')) {
        handleOperator(target.value);
        updateDisplay();
        return;
    }
    if (target.classList.contains('decimal')) {
        decimal(target.value);
        updateDisplay();
        return;
    }
    digit(target.value);
    updateDisplay();
});