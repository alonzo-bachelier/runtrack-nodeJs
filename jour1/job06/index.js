const fs = require("fs");

const data = fs.readFileSync("./data.txt", { encoding: "utf8", flag: "r" });

console.log("Contenu du fichier data.txt : " + data);
