function createServeur() {
    const http = require("http");
    const host = "localhost";
    const port = 8888;

    const requestListener = function (req, res) {
        if (error) {
            res.writeHead(500);
            console.log("erreur 500");
            return;
        } else {
            res.writeHead(200);
            res.end("Hello world !");
        }
    };

    const server = http.createServer(requestListener);
    server.listen(port, host, () => {
        console.log(`Server is running on http://${host}:${port}`);
    });
}

export default createServeur;
