const fs = require("fs");

const data = fs.readFileSync("./data.txt", { encoding: "utf8", flag: "r" });
function splitLetters(letters) {
    return letters
        .split("")
        .filter((letter, index) => index % 2 === 0)
        .join("");
}
const result = splitLetters(data);
console.log("Contenu du fichier data.txt : " + result);
