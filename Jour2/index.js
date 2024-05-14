const serverModule = require("./serveur");
const routes = require("./routes");

const server = serverModule.createServeur(routes.handleRequestTasks);

server.listen(8080, () => {
    console.log(`Server is running on http://localhost:8080`);
});
