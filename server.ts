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

createConnection(connection)
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
      await _placesRepository
        .find()
        .then( async (places: any) => {
          res.json({
            code,
            places
          });
        })
        
    });

    // Get place by ID
    this.app.get('/api/v1/places/:_placeId', async (req: any, res: any, next: any) => {
      const code = res.statusCode;
      const placeId = req.params._placeId;
      const _placesRepository = await getRepository(Place);

      await _placesRepository
        .findOneById(placeId)
        .then( async (place: any) => {
          if (place) {
            res.json({
              code,
              place
            });
          } else {
            res.json({
              code,
              msg: 'Place does not exist, add it!'
            });
          }
        })

    });

    // Add new places route
    this.app.post('/api/v1/places', async (req: any, res: any, next: any) => {
      const code = res.statusCode;
      console.log(req.body);
      let AddPlace =new Place();
      let placesRepository= await getRepository(Place);

      AddPlace.Name=req.body.Name;
      AddPlace.Address=req.body.Address;
      AddPlace.City=req.body.City;
      AddPlace.Category=req.body.Category;

      await placesRepository
        .save(AddPlace)
        .then( async (result: any) => {
          let places = await placesRepository.find();
          res.json({
            code,
            places
          });
        })
    });

    // Update places route
    this.app.post('/api/v1/places/:_placeId/update', async(req: any, res: any, next: any) => {
      const code = res.statusCode;
      let placesRepository = await getRepository(Place);
      let placeId = req.params._placeId;
      let placeToUpdate = await placesRepository.findOneById(placeId);
  
      placeToUpdate.Name = req.body.Name;
      placeToUpdate.Address = req.body.Address;
      placeToUpdate.City = req.body.City;
      placeToUpdate.Category = req.body.Category;

      await placesRepository
        .save(placeToUpdate)
        .then( async (result: any) => {
          let places = await placesRepository.find();
          res.json({
            code,
            places
          });
        })
    });

    // Delete places route
    this.app.post('/api/v1/places/:_placeId/delete', async(req: any, res: any, next: any) => {
      const code = res.statusCode;
      let placeId = req.params._Id;
      let placesRepository = await getRepository(Place);
      let toDelete = await placesRepository.findOneById(placeId);

      await placesRepository
        .remove(toDelete)
        .then( async (result) => {
          let places = await placesRepository.find();
          res.json({
            code,
            places
          });
        })
    });
  }
}

// export
export default new Server().app;
