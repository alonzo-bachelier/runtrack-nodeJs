const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();

const uri = "mongodb://localhost:27017/LaPlateforme";

mongoose
    .connect(uri)
    .then(() => console.log("MongoDB connecté"))
    .catch(err => {
        console.error("Erreur de connexion à MongoDB : ", err.message);
        process.exit(1);
    });

app.use(bodyParser.json());

const studentSchema = new mongoose.Schema({
    lastname: { type: String, required: true },
    firstname: { type: String, required: true },
    students_number: { type: Number, required: true, unique: true },
    year: [
        {
            year_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Year",
                required: true,
            },
            yearCursus: {
                type: String,
                required: true,
            },
        },
    ],
});
const Student = mongoose.model("students", studentSchema);

app.get("/", (req, res) => {
    res.status(200);
    res.end("Hello World! http://localhost:80/student");
});

app.get("/student", async (req, res) => {
    try {
        const student = await Student.find({});
        res.status(200).send(student);
    } catch (error) {
        res.status(500).send({ error });
    }
});
app.get("/student/:id", async (req, res) => {
    try {
        const student = await Student.findOne({ _id: req.params.id });
        res.status(200).send(student);
    } catch (error) {
        res.status(500).send({ error });
    }
});
app.post("/student", async (req, res) => {
    const student = await Student(req.body);
    try {
        await student.save();
        res.status(200).send(student);
    } catch (error) {
        res.status(500).send({ error });
    }
});
app.delete("/student/:id", async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete({ _id: req.params.id });
        if (!student) {
            return res.status(404).send("Item wasn't found");
        }
        res.status(200).send();
    } catch (error) {
        res.status(500).send({ error });
    }
});

app.use(function (req, res, next) {
    res.status(404).end("error 404");
});

app.listen(3000, () => {
    console.log("Serveur : http://localhost:3000");
});
