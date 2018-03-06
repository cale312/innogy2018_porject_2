import { getRepository } from "typeorm";
import { Place } from "../entity/Place.entity";
import { Router } from "express";

class Route {

    router: Router;

    constructor() {
        this.router = Router()
        this.route();
    }

    public deletePlace = async (req: any, res: any, next: any) => {
        const code = res.statusCode;
        let placeId = req.params._Id;
        let placesRepository = await getRepository(Place);
        let toDelete = await placesRepository.findOneById(placeId);
    
        await placesRepository
          .remove(toDelete)
          .then(async (result) => {
            let places = await placesRepository.find();
            res.json({
              code,
              places
            });
          })
      };

      route() {
          this.router.post('/:_placeId/delete', this.deletePlace);
      }

}

export default new Route().router;
