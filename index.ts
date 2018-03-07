import * as http from 'http';
import * as debug from 'debug';
const chalk = require('chalk');

import Server from './server';
import { createConnection } from 'typeorm';
import connection from './src/config/connection';

debug('ts-express:server');

const port = process.env.PORT || 8000;
Server.set('port', port);

console.log(chalk.bgCyan(`====[ Server port config ]====\nServer listening on port ${port}`));

createConnection(connection)
  .then(async connection => {
    console.log(chalk.bgMagenta(' =====[ Database Connection ]=====\nDatabase connection was a success!\n'));
  })
  .catch(error => console.log(error));

const server = http.createServer(Server);
Server.listen(port);

module.exports = Server;
server.on('error', onError);
server.on('listening', onListening);

function normalizePort(val: number|string): number|string|boolean {
  let port: number = (typeof val === 'string') ? parseInt(val, 10) : val;
  if (isNaN(port)) return val;
  else if (port >= 0) return port;
  else return false;
}

function onError(error: NodeJS.ErrnoException): void {
  if (error.syscall !== 'listen') throw error;
  let bind = (typeof port === 'string') ? 'Pipe ' + port : 'Port ' + port;
  switch(error.code) {
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

function onListening(): void {
  let addr = server.address();
  let bind = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr.port}`;
  debug(`Listening on ${bind}`);
}
  