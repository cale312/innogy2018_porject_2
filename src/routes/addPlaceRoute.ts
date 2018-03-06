import { Place } from "../entity/Place.entity";
import { getRepository } from "typeorm";
import { Router } from "express";

class Route {

    router: Router;

    constructor() {
        this.router = Router();
        this.route();
    }

    public addPlace = async (req: any, res: any, next: any) => {
        const code = res.statusCode;
        let AddPlace = new Place();
        let placesRepository = await getRepository(Place);
    
        AddPlace.Name = req.body.Name;
        AddPlace.Address = req.body.Address;
        AddPlace.City = req.body.City;
        AddPlace.Category = req.body.Category;
    
        await placesRepository
          .save(AddPlace)
          .then(async (result: any) => {
            let places = await placesRepository.find();
            res.json({
              code,
              places
            });
          })
      };

      route() {
          this.router.post('/', this.addPlace);
      }

}

export default new Route().router;
