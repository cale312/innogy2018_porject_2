import "reflect-metadata";
import * as logger from 'morgan';
import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import {
  createConnection,
  getRepository
} from "typeorm";
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import * as exphbs from 'express-handlebars';
import * as flash from 'express-flash';


// import database connection configuration from the config folder
import connection from "./src/config/connection";

// import all the route files
import getPlaceRoute from './src/routes/getPlacesRoute';
import addPlaceRoute from './src/routes/addPlaceRoute';
import deletePlaceRoute from './src/routes/deletePlaceRoute';
import updatePlaceRoute from './src/routes/updatePlaceRoute';
import getPlaceByIdRoute from './src/routes/getPlaceByIdRoute';
import getPlaceByNameRoute from "./src/routes/getPlaceByNameRoute";
import reviewPlaceRoute from "./src/routes/reviewPlaceRoute";

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
    this.app.use(express.static('public'));
    this.app.use(bodyParser.urlencoded({
      extended: true
    }));
    this.app.use(express.static('public'));
    this.app.use(bodyParser.json());
    this.app.use(cookieParser());
    this.app.use(logger('dev'));
    this.app.use(cors());
    

    this.app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Credentials', 'true');
      res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials');
      next();
    });
  }

  // Configure API endpoints.
  public routes(): void {
    let router = express.Router();

    // Home route
    this.app.use('/', router);
    // Get all places route
    this.app.use('/api/v1/places', getPlaceRoute);
    // Get place by Name
    this.app.use('/api/v1/places', getPlaceByNameRoute);
    // Add new places route
    this.app.use('/api/v1/places', addPlaceRoute);
    // Get place by ID
    this.app.use('/api/v1/places', getPlaceByIdRoute);
    // Update places route
    this.app.use('/api/v1/places', updatePlaceRoute);
    // Delete places route
    this.app.use('/api/v1/places', deletePlaceRoute);
    // Add review about a place
    this.app.use('/api/v1/places', reviewPlaceRoute);
  }

}

// export
export default new Server().app;