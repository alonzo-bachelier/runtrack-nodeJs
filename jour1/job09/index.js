const fs = require("fs");

fs.writeFile(
    "./data.txt",
    "Je manipule les fichiers avec un module node !",
    function (err) {
        if (err) throw err;
        console.log("File is up to date!");
        const result = fs.readFileSync("./data.txt", {
            encoding: "utf8",
            flag: "r",
        });
        console.log("Nouveau contenu du fichier data.txt : " + result);
    }
);
