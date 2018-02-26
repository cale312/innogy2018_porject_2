import "reflect-metadata";
import * as logger from 'morgan';
import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import {
  createConnection
} from "typeorm";
import * as cookieParser from 'cookie-parser';

// Import the entities
import {
  Place
} from "./src/entities/Place";

// Import all the routes
import GetPlaces from "./src/routes/GetPlaces";
// import AddPlace from "./src/routes/AddPlace";
// import DeletePlace from "./src/routes/DeletePlace";
// import UpdatePlace from "./src/routes/UpdatePlace";

createConnection()
  .then(async connection => {
    console.log('database connection was a success!');
  })
  .catch(error => console.log(error));
// Creates and configures an ExpressJS web server.
class Server {
  // ref to Express instance
  public app: express.Application;
  //Run configuration methods on the Express instance.
  constructor() {
    this.app = express();
    this.middleware();
    this.routes();
  }
  // Configure Express middleware.
  private middleware(): void {
    this.app.use(bodyParser.urlencoded({
      extended: true
    }));
    this.app.use(bodyParser.json());
    this.app.use(cookieParser());
    this.app.use(logger('dev'));
    this.app.use(cors());

    this.app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials');
      res.header('Access-Control-Allow-Credentials', 'true');
      next();
    });
  }

  // Configure API endpoints.
  public routes(): void {
    let router = express.Router();

    this.app.use('/', router);
    // this.app.use('/api/v1/places', AddPlace);
    this.app.use('/api/v1/places', GetPlaces);
    // this.app.use('/api/v1/places', DeletePlace);
    // this.app.use('/api/v1/places', UpdatePlace);
  }
}

// export
export default new Server().app;
