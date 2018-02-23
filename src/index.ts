import "reflect-metadata";
import * as logger from 'morgan';
import * as express from 'express';
import * as cors from 'cors';
import { Place } from "./entity/Place";
import * as bodyParser from 'body-parser';
import { createConnection } from "typeorm";
import * as cookieParser from 'cookie-parser';

// Import all the routes
import GetPlaces from "./routes/GetPlaces";

createConnection()
  .then(async connection => {
    console.log('database connection was a success');
  }).then( () => {
        // Creates and configures an ExpressJS web server.
        class App {
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
            this.app.use(bodyParser.urlencoded({ extended: true }));
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
            this.app.use('/api/v1/places', GetPlaces);
          }
        }
    
        // initialize server port and connection
        const port = process.env.PORT || 8080;
    
        this.app.listen(port, async (error: any) => {
            (error) ? await console.error(error) : await console.log(`App running on http://localhost:${port}`);
        });
  })
  .catch(error => console.log(error));
