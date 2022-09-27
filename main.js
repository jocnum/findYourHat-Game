const prompt = require("prompt-sync")({ sigint: true });

const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";

class Field {
    constructor() {
        this.field = this.constructor.generateField(10, 4);
    }
    print() {
        for (let i = 0; i < this.field.length; i++) {
            console.log(this.field[i].join(" "));
        }
    }

    static generateField(height, width) {
        // Create playing field
        let newField = [];
        const options = [fieldCharacter, hole, fieldCharacter];
        for (let i = 0; i < height; i++) {
            const result = [];
            for (let j = 0; j < width; j++) {
                result.push(options[Math.floor(Math.random() * 3)]);
            }
            newField.push(result);
        }
        // Place hat at random place
        const randomRow = Math.floor(Math.random() * height);
        const randomCol = Math.floor(Math.random() * width);
        newField[randomRow][randomCol] = hat;
        //set starting pos
        newField[0][0] = pathCharacter;
        return newField;
    }
}

const myField = new Field();

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
