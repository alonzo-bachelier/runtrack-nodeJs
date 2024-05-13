const path = require("path");
const fileName =
    "C:/Users/alonz/OneDrive/Desktop/NODE/runtrack-nodeJs/jour1/job05/index.js";
const file = path.basename(fileName);
const extension = path.extname(fileName);

console.log("Nom du fichier : " + file);
console.log("Extension du fichier : " + extension);
console.log("Repertoire parent du fichier : " + fileName);
