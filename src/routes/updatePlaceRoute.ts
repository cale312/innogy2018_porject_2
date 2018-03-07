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
        let placeName = req.params._placeName;
        let placesRepository = await getRepository(Place);
        
        placesRepository.findOne({ Name: placeName })
            .then( async (place) => {
                place.Address = req.body.Address;
        
                await placesRepository
                    .save(place)
                    .then(async (place: any) => {
                        res.json({
                            code,
                            place
                        });
                    })
            })

    };

    route() {
        this.router.put('/:_placeName/update', this.updatePlace);
    }

}

export default new Route().router;