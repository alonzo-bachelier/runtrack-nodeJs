const http = require("http");
const fs = require("fs");
const url = require("url");
const host = "localhost";
const port = 8000;
let indexFile;

const requestListener = function (req, res) {
    const reqUrl = url.parse(req.url);
    res.setHeader("Content-Type", "text/html");
    res.writeHead(200);
    res.end(indexFile);

    if (reqUrl.pathname.includes("about")) {
        fs.readFile("./about.html", () => {
       
    }
};

const server = http.createServer(requestListener);

fs.readFile("./index.html", (err, contents) => {
    if (err) {
        console.error(`Could not read index.html file: ${err}`);
    } else {
        indexFile = contents;
        server.listen(port, host, () => {
            console.log(`Server is running on http://${host}:${port}`);
        });
    }
});
