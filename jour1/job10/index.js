const urlModule = require("url");

const myUrl = new URL("https://www.google.com?search=nodejs");

console.log("Le protocole est : " + myUrl.protocol);
console.log("Le nom de l'hôte est : " + myUrl.hostname);
console.log("Les paramètres de recherche sont : " + myUrl.searchParams);

myUrl.hostname = "www.laplateforme.io";
console.log("url entier : " + myUrl);

myUrl.pathname = "";
myUrl.search = "lang=fr";
console.log("Nouvelle url : " + myUrl);
