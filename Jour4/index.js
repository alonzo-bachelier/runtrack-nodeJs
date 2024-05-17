const mongoose = require("mongoose");
const readline = require("readline");

const uri = "mongodb://localhost:27017/LaPlateforme";

mongoose
    .connect(uri)
    .then(() => console.log("MongoDB connecté"))
    .catch(err => {
        console.error("Erreur de connexion à MongoDB : ", err.message);
        process.exit(1);
    });

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

const Student = mongoose.model("Student", studentSchema);

const yearSchema = new mongoose.Schema({
    year: { type: String, required: true },
});

const Year = mongoose.model("Year", yearSchema);

const addStudents = async students => {
    try {
        const result = await Student.insertMany(students);
        console.log(
            "Nouveaux étudiants ajoutés avec les IDs :",
            result.map(student => student._id)
        );
    } catch (err) {
        console.error("Erreur lors de l'ajout des étudiants :", err.message);
    }
};

const addYear = async years => {
    const addedYears = [];
    try {
        for (const year of years) {
            let existingYear = await Year.findOne({ year: year.year });
            if (!existingYear) {
                existingYear = await Year.create(year);
                console.log(
                    "Nouvelle année ajoutée avec l'ID :",
                    existingYear._id
                );
            } else {
                console.log("L'année existe déjà :", existingYear._id);
            }
            addedYears.push(existingYear);
        }
    } catch (err) {
        console.error("Erreur lors de l'ajout :", err.message);
    }
    return addedYears;
};

const assignYearsToStudents = (students, years) => {
    return students.map((student, index) => {
        student.year = [
            {
                year_id: years[index % years.length]._id,
                yearCursus: years[index % years.length].year,
            },
        ];
        return student;
    });
};
const getAllStudents = async () => {
    try {
        return await Student.find();
    } catch (err) {
        console.error(
            "Erreur lors de la récupération des étudiants :",
            err.message
        );
    }
};

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.question("Studen number min : ", answer => {
    const userInput = parseInt(answer, 200);

    if (isNaN(userInput)) {
        console.log("Invalid number!");
    } else {
        console.log(`Number is : ${userInput}`);
        useNumber(userInput);
    }

    rl.close();
});

function useNumber(number) {
    Student.find({ students_number: { $gt: number } }, (err, result) => {
        if (err) {
            console.error(
                "Erreur lors de la récupération des étudiants :",
                err
            );
        } else {
            console.log("Étudiants trouvés :", result);
        }
    });
}
module.exports = {
    mongoose,
    Student,
    addStudents,
    addYear,
    assignYearsToStudents,
    getAllStudents,
};
