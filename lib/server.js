"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const link_shortener_1 = require("./link-shortener");
const port = 5000;
const server = http_1.createServer((request, response) => {
    var _a;
    const url = (_a = request.url) === null || _a === void 0 ? void 0 : _a.substring(1);
    const linkRepository = new link_shortener_1.JsonFileRepository();
    if (url) {
        const redirect = linkRepository.get(url);
        if (redirect) {
            response.setHeader('Location', redirect);
            response.statusCode = 301;
        }
    }
    else {
        response.statusCode = 404;
    }
    response.end();
});
server.listen(port, (error) => {
    if (error) {
        console.log(error);
    }
    else {
        console.log(`Server listening on port ${port}`);
    }
});
