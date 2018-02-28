import "reflect-metadata";
import * as logger from 'morgan';
import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import { createConnection, getRepository } from "typeorm";
import * as cookieParser from 'cookie-parser';

// Import the entities
import { Place } from "./src/entity/Place.entity";
import connection from "./src/config/connection";

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

    // Home route
    this.app.use('/', router);

    // Get all places route
    this.app.get('/api/v1/places', async (req: any, res: any, next: any) => {
      const code = res.statusCode;
      // create repository for the places entity
      const _placesRepository = await getRepository(Place);
      const places = await _placesRepository.find();
      res.json({
        code,
        places
      });
    });

    // Get place by ID
    this.app.get('/api/v1/places/:_placeId', (req: any, res: any, next: any) => {
      const code = res.statusCode;
      res.json({
        code,
        msg: 'Get place by id route'
      });
    });

    // Add new places route
    this.app.post('/api/v1/places', (req: any, res: any, next: any) => {
      const code = res.statusCode;
      res.json({
        code,
        msg: 'Add place route'
      });
    });

    // Update places route
    this.app.post('/api/v1/places/:_placeId/update', async(req: any, res: any, next: any) => {
      const code = res.statusCode;
      let toUpdate = await getRepository(Place);
      let placeToUpdate = await toUpdate.findOneById(1);
  
      placeToUpdate.Name = "req.body.Name";
      placeToUpdate.Address = "req.body.Address";
      placeToUpdate.City = "req.body.City";
      placeToUpdate.Category = "req.body.Category";

      await toUpdate.save(placeToUpdate);
      res.json({
        code,
        msg: 'Update places route'
      });
    });

    // Delete places route
    this.app.get('/api/v1/places/:_placeId/delete', async(req: any, res: any, next: any) => {
      const code = res.statusCode;
      let placeToDelete = await getRepository(Place);
      let toDelete = await placeToDelete.findOneById(1);
      await placeToDelete.remove(toDelete)

      res.json({
        code,
        msg: 'Delete places route'
      });
    });
  }
}

// export
export default new Server().app;
