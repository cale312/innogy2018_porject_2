import { getRepository } from "typeorm";
import { Place } from "../entity/Place.entity";
import { Router } from "express";

class Route {

    router: Router;

    constructor() {
        this.router = Router();
        this.route();
    }

    public updatePlace = async (req: any, res: any, next: any) => {
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
          .then(async (result: any) => {
            let places = await placesRepository.find();
            res.json({
              code,
              places
            });
          })
      };

    route() {
        this.router.post('/:_placeId/update', this.updatePlace);
    }

}

export default new Route().router;
