const fs = require("fs");
const tasksJson = JSON.parse(fs.readFileSync("./tasks.json"));
function handleRequest(req, res) {
    if (req.url === "/tasks" && req.method === "GET") {
        getAllTasks(req, res);
    } else if (req.url === "/tasks" && req.method === "POST") {
        postTask(req, res);
    } else if (req.url === "/tasks" && req.method === "DELETE") {
        deleteTask(req, res);
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

function postTask(req, res) {
    let body = "";

    req.on("data", chunk => {
        body += chunk.toString();
    });

    req.on("end", () => {
        try {
            const newTask = JSON.parse(body);
            const tasks = JSON.parse(fs.readFileSync("./tasks.json"));

            newTask.id = tasks.tasks.length
                ? tasks.tasks[tasks.tasks.length - 1].id + 1
                : 1;

            tasks.tasks.push(newTask);

            fs.writeFileSync("./tasks.json", JSON.stringify(tasks, null, 2));

            res.writeHead(201, { "Content-Type": "application/json" });
            res.end(JSON.stringify(newTask));
        } catch (error) {
            res.writeHead(400, { "Content-Type": "text/plain" });
            res.end("Invalid JSON");
            console.error(error);
        }
    });
}
function deleteTask(req, res) {}
function defaultResponse(req, res) {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Hello world !");
}

module.exports = {
    handleRequest,
};
