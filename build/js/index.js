window.onload = () => {
    const calculatorContainer = document.getElementById("body");
    const operationBox = document.getElementById("operations");
    mapping(calculatorContainer, operationBox);
};


const mapping = (eventTarget, containerTarget) => {
    let results = document.getElementById("results");
    eventTarget.addEventListener("keydown", (event) => {
        switch(event.keyCode){
            case 8: 
                containerTarget.value = containerTarget.value.slice(0, -1);
                break;
            case 13: 
                const strOperation = results.value + " " + containerTarget.value + " =";
                containerTarget.value = solveOperation(strOperation);
                results.value = strOperation;
                break;
            case 106:
            case 107:
            case 109:
            case 111:
                if(results.value != ""){
                    const strOperation = results.value + " " + containerTarget.value + " =";
                    const solution = solveOperation(strOperation);
                    results.value = solution + " " + event.key;
                    containerTarget.value = "";
                }else{
                    results.value = containerTarget.value + " " + event.key;
                    containerTarget.value = "";
                }
                break;
            default:
                if(event.shiftKey != true){
                    const regex = /\d/;
                    const found = event.key.match(regex);
                    if(found != null && containerTarget.value.length < 16){
                        results.value.charAt(results.value.length - 1) == "=" ? (containerTarget.value = event.key, results.value = "") : containerTarget.value += event.key;
                    }
                    break;
                }else{

                }
        };
    });
};

const solveOperation = (strOperation) => {
    const splitOperation = strOperation.split(" ");
    const x = Number(splitOperation[0]);
    const y = Number(splitOperation[2]);
    const operation = splitOperation[1];
    const solverObj = {"+": x+y, "-": x-y, "*": x*y, "/": x/y};
    return solverObj[operation];
}