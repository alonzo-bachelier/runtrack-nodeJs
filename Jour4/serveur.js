const { default: mongoose } = require("mongoose");
const {
    addStudents,
    addYear,
    assignYearsToStudents,
    getAllStudents,
} = require("./index");
const http = require("http");

const host = "localhost";
const port = 8888;

const newStudents = [
    {
        lastname: "LeBricoleur",
        firstname: "Bob",
        students_number: 123,
        year: null,
    },
    {
        lastname: "Doe",
        firstname: "John",
        students_number: 124,
        year: null,
    },
    {
        lastname: "DuPont",
        firstname: "Marine",
        students_number: 125,
        year: null,
    },
];
const newYear = [
    { year: "Bachelor 1" },
    { year: "Bachelor 2" },
    { year: "Bachelor 3" },
];

const requestListener = async (req, res) => {
    try {
        const addedYears = await addYear(newYear);
        const updatedStudents = assignYearsToStudents(newStudents, addedYears);
        await addStudents(updatedStudents);
        const students = await getAllStudents();
        console.log("Liste des étudiants :", students);
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("Étudiants ajoutés !");
    } catch (error) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Erreur serveur");
        console.error("Erreur 500 :", error.message);
    }
};

const startServer = () => {
    const server = http.createServer(requestListener);
    server.listen(port, host, () => {
        console.log(`Server is running on http://${host}:${port}`);
    });
};

startServer();
