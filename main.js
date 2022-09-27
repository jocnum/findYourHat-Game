const prompt = require("prompt-sync")({ sigint: true });

const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";

class Field {
    constructor(field) {
        this.field = field;
    }
    print() {
        for (let i = 0; i < this.field.length; i++) {
            console.log(this.field[i].join(" "));
        }
    }
}

const myField = new Field([
    ["*", "░", "░"],
    ["░", "O", "░"],
    ["░", "^", "░"],
]);

let foundHat = false;
let row = 0;
let place = 0;
let fieldWidth = myField.field[0].length - 1;

while (!foundHat) {
    myField.print();
    let move = prompt("Where do you want to move?: ");
    // Update last position to display as field
    myField.field[row][place] = fieldCharacter;
    // Movement IF's
    if (move === "s") {
        row++;
    } else if (move === "w") {
        row--;
    } else if (move === "a") {
        place--;
    } else if (move === "d") {
        place++;
    }
    // Evaluate win or lose via position, or if player leaves the field

    if (
        myField.field[row] === undefined ||
        myField.field[row][place] === hole ||
        place < 0 ||
        place > fieldWidth
    ) {
        console.log("You lost this game! Sorry!");
        foundHat = true;
    } else if (myField.field[row][place] === hat) {
        console.log("YOU WON! Well done!");
        foundHat = true;
    } else {
        // move character
        myField.field[row][place] = pathCharacter;
    }
}
