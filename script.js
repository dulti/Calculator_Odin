let buffer = "";
let last_operator = "";
let new_number = true;

function operate(operator, num1, num2) {
    if (operator == '+') {
        return num1 + num2;
    } else if (operator == '-') {
        return num1 - num2;
    } else if (operator == '*') {
        return num1 * num2;
    } else if (operator == '/') {
        if (num2 == 0) {
            return "ERR: Div by 0";
        } else {
            return num1 / num2;
        }
    }
};

function truncateValue(num) {
    if (typeof num == "string") {
        return num;
    }
    // allow 9 digits max
    if (num >= 1000000000) {
        return "Too large!"
    } else {
        return +num.toFixed(9);
    }
};

// add shadow on click
const buttons = document.querySelectorAll(".button");
buttons.forEach((button) => {
    button.addEventListener('mousedown', (e) => {
        // add style .pressed
        e.target.classList.add("pressed");
    });
    button.addEventListener('mouseup', (e) => {
        // add style .pressed
        e.target.classList.remove("pressed");
    });
});

// input numbers
const numbers = document.querySelectorAll(".numbers");
numbers.forEach((number) => {
    number.addEventListener('mousedown', (e) => {
        // show number on display
        const display = document.querySelector(".display");
        // if flag new_number is true, delete old content and start anew,
        // otherwise concatenate
        // if total length == 9, stop concatenating
        if (new_number) {
            display.textContent = e.target.textContent;
            new_number = false;
        } else if (display.textContent.length < 9) {
            display.textContent += e.target.textContent;
        }        
    })
})

// input period
const period = document.querySelector("#period");
period.addEventListener('mousedown', (e) => {
    const display = document.querySelector(".display");
    if (!display.textContent.includes(".")) {
        display.textContent += ".";
    };
});

// operators
const operators = document.querySelectorAll(".operators");
operators.forEach((operator) => {
    operator.addEventListener('mousedown', (e) => {
        const display = document.querySelector(".display");
        // if buffer is full, evaluate
        if (buffer.length > 0) {
            let result = operate(last_operator, parseInt(buffer), parseInt(display.textContent));
            display.textContent = truncateValue(result);
        }
        // copy display to buffer
        buffer = display.textContent;
        // copy operator
        last_operator = e.target.textContent;
        // toggle flag
        new_number = true;
        
    });
});

// equals
const equals = document.querySelector("#equals");
equals.addEventListener("mousedown", (e) => {
    if (buffer.length > 0 && last_operator.length > 0) {
        const display = document.querySelector(".display");
        let result = operate(last_operator, parseInt(buffer), parseInt(display.textContent));
        display.textContent = truncateValue(result);
        new_number = true;
        last_operator = "";
        buffer = "";
    }
});

// cls
const cls = document.querySelector("#cls");
cls.addEventListener("mousedown", (e) => {
    const display = document.querySelector(".display");
    display.textContent = "0";
    new_number = true;
    buffer = "";
    last_operator = "";
});

// bsp
const bsp = document.querySelector("#bsp");
bsp.addEventListener("mousedown", (e) => {
    const display = document.querySelector(".display");
    if (display.textContent.length > 1) {
        display.textContent = display.textContent.slice(0, display.textContent.length - 1);
    } else {
        display.textContent = "0";
    }
})