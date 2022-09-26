const mapping = (eventTarget, containerTarget) => {
    eventTarget.addEventListener("keydown", (event) => {
        let pressedKey;
        switch(event.keyCode){
            case 49:
                pressedKey = 1;
            case 50:
                pressedKey = 2;
            case 51:
                pressedKey = 3;
            case 52:
                pressedKey = 4;
            case 53:
                pressedKey = 5;
            case 54:
                pressedKey = 6;
            case 55:
                pressedKey = 7;
            case 56:
                pressedKey = 8;
            case 57:
                pressedKey = 9;
        };
        containerTarget.innerHTML = pressedKey;
    });
};

export default mapping;