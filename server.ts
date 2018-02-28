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


// Import all the routes
import GetPlaces from "./src/routes/GetPlaces";
import AddPlace from "./src/routes/AddPlace";
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
    this.app.post('/api/v1/places', async(req: any, res: any, next: any) => {
      const code = res.statusCode;
      //let Name=req.body;
      //let Address=req.body;
      //let City=req.body;

     console.log(req.body);
      let AddPlace =new Place();
      let placesRepository= await getRepository(Place);
      AddPlace.Name=req.body.Name;
      AddPlace.Address=req.body.Address;
      AddPlace.City=req.body.City;
      AddPlace.Category=req.body.Category;
     
      let avoidDuplicate= await placesRepository.findOne();
      await placesRepository.save(AddPlace);
         console.log("******",AddPlace);
        res.json({
         Results:AddPlace,
         code,
         msg: 'Add place route'
      }).catch(error => console.log(error));;
    });

    // Update places route
    this.app.post('/api/v1/places/:_placeId/update', (req: any, res: any, next: any) => {
      const code = res.statusCode;
      res.json({
        code,
        msg: 'Update places route'
      });
    });

    // Delete places route
    this.app.get('/api/v1/places/:_placeId/delete', (req: any, res: any, next: any) => {
      const code = res.statusCode;
      res.json({
        code,
        msg: 'Delete places route'
      });
    });


    // this.app.use('/api/v1/places', AddPlace);
    //this.app.use('/api/v1/places', GetPlaces);
    this.app.use('/api/v1/places', AddPlace);
    // this.app.use('/api/v1/places', DeletePlace);
    // this.app.use('/api/v1/places', UpdatePlace);
  }
}

// export
export default new Server().app;
