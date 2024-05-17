const express = require("express");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.status(200).sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/about", (req, res) => {
    res.status(200).sendFile(path.join(__dirname, "views", "about.html"));
});

app.use(function (req, res, next) {
    res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});
app.listen(80, () => {
    console.log("Serveur : http://localhost:80");
});
