const fs = require("fs");

function handleRequest(req, res) {
    if (req.url === "/tasks" && req.method === "GET") {
        getAllTasks(req, res);
    } else {
        defaultResponse(req, res);
    }
}

function getAllTasks(req, res) {
    try {
        const readAllTasks = JSON.parse(fs.readFileSync("./tasks.json"));
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(readAllTasks));
    } catch (error) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Internal Server Error");
        console.error(error);
    }
}

function defaultResponse(req, res) {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Hello world !");
}

module.exports = {
    handleRequest,
};
