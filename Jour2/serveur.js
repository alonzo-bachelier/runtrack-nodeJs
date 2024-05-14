const { handleRequest } = require("./routes");

function createServeur() {
    const http = require("http");
    return http.createServer(handleRequest);
}

module.exports = {
    createServeur,
};
