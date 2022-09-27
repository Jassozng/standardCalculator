window.onload = () => {
    keyboardMapping();
    virtualPadMapping();
};


const keyboardMapping = () => {
    const results = document.getElementById("results");
    const operationBox = document.getElementById("operations");
    document.getElementById("body").addEventListener("keydown", (event) => {
        switch(event.keyCode){
            case 8: 
                operationBox.value = operationBox.value.slice(0, -1);
                break;
            case 13: 
                const strOperation = results.value + " " + operationBox.value + " =";
                operationBox.value = solveOperation(strOperation);
                results.value = strOperation;
                break;
            case 46:
            case 106:
            case 107:
            case 109:
            case 111:
                const appendingValues = operationKeyDownEvent(results.value, operationBox.value, event.key);
                results.value = appendingValues[0];
                operationBox.value = appendingValues[1];
                break;
            default:
                const values = numberKeyDownEvent(results.value, operationBox.value, event.key);
                results.value = values[0];
                operationBox.value = values[1];
                break;
        };
    });
};

const virtualPadMapping = () => {
    const results = document.getElementById("results");
    const operationBox = document.getElementById("operations");
    const numberButtons = document.querySelectorAll("#number");
    const operationButtons = document.querySelectorAll("#operator");
    numberButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const appendingValues = numberKeyDownEvent(results.value, operationBox.value, button.value);
            results.value = appendingValues[0];
            operationBox.value = appendingValues[1];
        });
    });
    operationButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const appendingValues = operationKeyDownEvent(results.value, operationBox.value, button.value);
            results.value = appendingValues[0];
            operationBox.value = appendingValues[1];
        });
    });
};

const operationKeyDownEvent = (results, operationBox, key) => {
    switch(key){
        case "CE":
        case "Delete":
            results = "";
            operationBox = "";
            break;
        case "C":
            operationBox = "";
            break;
        case "←": 
            operationBox = operationBox.slice(0, -1);
            break;
        case "±": 
            operationBox = -operationBox;
            break;
        case "⅟": 
            operationBox = 1/(operationBox);
            break;
        case "√x": 
            operationBox = Math.sqrt(operationBox);
            break;
        case ".": 
            operationBox.match(/[.]/) == null ? operationBox += "." : null;
            break;
        default:
            if(results.match(/[-+*⅟×±÷]/) != null){
                const strOperation = results + " " + operationBox + " =";
                const solution = solveOperation(strOperation);
                results = solution + " " + key;
                operationBox = "";
            }else{
                results = operationBox + " " + key;
                operationBox = "";
            };
    }
    return [results, operationBox];
};

const numberKeyDownEvent = (results, operationBox, key) => {
    const regex = /\d/;
    const found = key.match(regex);
    if(found != null && operationBox.length < 16){
        results.charAt(results.length - 1) == "=" ? (operationBox = key, results = "") : operationBox += key;
    }
    return [results, operationBox];
};

const solveOperation = (strOperation) => {
    const splitOperation = strOperation.split(" ");
    const x = Number(splitOperation[0]);
    const y = Number(splitOperation[2]);
    const operation = splitOperation[1];
    const solverObj = {"+": x+y, "-": x-y, "*": x*y, "×": x*y, "/": x/y, "%": x%y, "÷": x/y };
    return solverObj[operation];
}