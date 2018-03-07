import {
    getRepository
} from "typeorm";
import {
    Place
} from "../entity/Place.entity";
import {
    Router
} from "express";

class Route {

    router: Router;

    constructor() {
        this.router = Router();
        this.route();
    }

    public updatePlace = async (req: any, res: any, next: any) => {
        const code = res.statusCode;
        let placesRepository = await getRepository(Place);
        let placeName = req.params._placeName;
        let placeToUpdate = await placesRepository.findOneById(placeName);

        placeToUpdate.Address = req.body.Address;

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
        this.router.post('/:_placeName/update', this.updatePlace);
    }

}

export default new Route().router;