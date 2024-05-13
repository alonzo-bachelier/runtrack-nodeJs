const fs = require("fs").promises;

async function readFiles() {
    try {
        const data = await fs.readFile("./data.txt", "utf8");
        console.log("Contenu du fichier data.txt : " + data);
    } catch (err) {
        console.error(err);
    }
}

readFiles();
