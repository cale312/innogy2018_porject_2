import * as express from 'express';
import {getRepository} from 'typeorm';
import { Router, Request, Response, NextFunction } from 'express';
import { Place } from "../entities/Place";

class PlacesRouter {

    router: Router;
  
    constructor() {
      this.router = Router();
      this.routes();
    }

    public async DeletePlace(req: Request, res: Response, next: NextFunction){
        let code = res.statusCode;

        let placesRepository = getRepository(Place);
        let placesToRemove = await placesRepository.findOneById({id:1});
        await placesRepository.remove(placesToRemove);

        res.json({
            placesToRemove
        });
    }
  
    // set up our routes
    routes() {
      this.router.get('/:ID/delete', this.DeletePlace);
    }
  
}

export default new PlacesRouter().router;
