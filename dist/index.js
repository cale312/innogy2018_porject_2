"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const debug = require("debug");
const chalk = require('chalk');
const server_1 = require("./server");
const typeorm_1 = require("typeorm");
const connection_1 = require("./src/config/connection");
debug('ts-express:server');
const port = process.env.PORT || 8000;
server_1.default.set('port', port);
console.log(chalk.bgCyan(`====[ Server port config ]====\nServer listening on port ${port}`));
typeorm_1.createConnection(connection_1.default)
    .then((connection) => __awaiter(this, void 0, void 0, function* () {
    console.log(chalk.bgMagenta(' =====[ Database Connection ]=====\nDatabase connection was a success!\n'));
}))
    .catch(error => console.log(error));
const server = http.createServer(server_1.default);
server_1.default.listen(port);
module.exports = server_1.default;
server.on('error', onError);
server.on('listening', onListening);
function normalizePort(val) {
    let port = (typeof val === 'string') ? parseInt(val, 10) : val;
    if (isNaN(port))
        return val;
    else if (port >= 0)
        return port;
    else
        return false;
}
function onError(error) {
    if (error.syscall !== 'listen')
        throw error;
    let bind = (typeof port === 'string') ? 'Pipe ' + port : 'Port ' + port;
    switch (error.code) {
        case 'EACCES':
            console.error(`${bind} requires elevated privileges`);
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(`${bind} is already in use`);
            process.exit(1);
            break;
        default:
            throw error;
    }
}
function onListening() {
    let addr = server.address();
    let bind = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr.port}`;
    debug(`Listening on ${bind}`);
}
//# sourceMappingURL=index.js.map