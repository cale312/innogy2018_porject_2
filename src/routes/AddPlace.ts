import * as express from 'express';
import { Router, Request, Response, NextFunction } from 'express';
import { Place } from "../entities/Place";
import { error } from 'util';
import {getRepository} from "typeorm";

class PlacesRouter {

    router: Router;
  
    constructor() {
      this.router = Router();
      this.routes();
    }

    public async AddPlace(req: Request, res: Response, next: NextFunction){
        
        var AddPlaces=new Place();
          AddPlaces.Name="ArtsCape";
          AddPlaces.Address=" 45 Avenue";
          AddPlaces.City="Cape Town";

          let PlaceRepository = getRepository(Place);
          await PlaceRepository.save(AddPlaces);
          console.log("M i saved?");
          
        res.json({
          Results:AddPlaces
        });
      
    }
  
    // set up our routes
    routes() {
      this.router.post('/add', this.AddPlace);
    }
  
}

export default new PlacesRouter().router;
