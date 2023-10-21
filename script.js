const displayHistory = document.querySelector(".display-history");
const displayInput = document.querySelector(".display-input");
const tempResult = document.querySelector(".temp-result");
const allClear = document.querySelector(".all-clear");
const lastClear = document.querySelector(".last-entity-clear");
const operators = document.querySelectorAll(".operator");
const numbers = document.querySelectorAll(".number");
const equal = document.querySelector(".equal");

let dis1num = "";
let dis2num = "";
let result = null;
let lastOpration = "";
let haveDot = false;

numbers.forEach((number) => {
    number.addEventListener("click", (e) => {
        if (e.target.innerText === "." && !haveDot) {
            haveDot = true;
        } else if (e.target.innerText === "." && haveDot) {
            return;
        }
        dis2num += e.target.innerText;
        displayInput.innerText = dis2num
    })
});

operators.forEach((operator) => {
    operator.addEventListener("click", (e) => {
        const oprationName = e.target.innerText
        lastOpration = oprationName;
        haveDot = false;
        if (!dis2num) return;
        if (dis1num && dis2num && lastOpration) {
            mathOperation();
        } else {
            result = parseFloat(dis2num);
        }
        clearVar(oprationName);
    })
})

function mathOperation() {
    if (lastOpration === "x") {
        result = parseFloat(result) * parseFloat(dis2num);
    } else if (lastOpration === "/") {
        result = parseFloat(result) / parseFloat(dis2num);
    } else if (lastOpration === "+") {
        result = parseFloat(result) + parseFloat(dis2num);
    } else if (lastOpration === "-") {
        result = parseFloat(result) - parseFloat(dis2num);
    } else if (lastOpration === "%") {
        result = parseFloat(result) % parseFloat(dis2num);
    }
} 

function clearVar(name = "") {
    dis1num += dis2num + " " + name + " ";
    displayHistory.innerText = dis1num;
    displayInput.innerText = ""
    dis2num = "";
    tempResult.innerText = result;
}

equal.addEventListener("click", (e) => {
    if (!dis1num || !dis2num) return;
        mathOperation();
        clearVar();
        displayInput.innerText = result;
        tempResult.innerText = "";
        dis1num = "";
        dis2num = result;
});

allClear.addEventListener("click", (e) => {
    displayHistory.innerText = "0"
    displayInput.innerText = "0"
    tempResult.innerText = "0";
    lastOpration = "";
    result = "";
    dis1num = "";
    dis2num = "";
});

lastClear.addEventListener("click", (e) => {
    displayInput.innerText = "0";
    dis2num = "";
})

window.addEventListener("keydown", (e) => {
    console.log(e.key)
    if (
        e.key ==="0" ||
        e.key ==="1" ||
        e.key ==="2" ||
        e.key ==="3" ||
        e.key ==="4" ||
        e.key ==="5" ||
        e.key ==="6" ||
        e.key ==="7" ||
        e.key ==="8" ||
        e.key ==="9" 
    ) {
        clickButton(e.key);
    } else if (
        e.key === "/" ||
        e.key === "+" ||
        e.key === "-"
    ) {
        clickOperation(e.key);
    } else if (e.key === "x") {
        clickOperation("*")
    } else if (e.key === "Enter" || e.key === "=") {
        clickEqual();
    } else if (e.key === "Backspace") {
        clickEntitiy()
    } else if (e.key === "\\") {
        clickAllClear()
    }    
})

function clickButton(key) {
    numbers.forEach((button) => {
        if (button.innerText === key) {
            button.click()
        }
    })
}

function clickOperation(key) {
    operators.forEach((operator) => {
        if (operator.innerText === key) {
            operator.click()
        }
    })
}

function clickEqual() {
    equal.click()
}

function clickEntitiy() {
    lastClear.click()
}

function clickAllClear() {
    allClear.click()
}