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
        this.router = Router()
        this.route();
    }

    public getPlaceById = async (req: any, res: any, next: any) => {
        const code = res.statusCode;
        const placeId = req.params._placeId;
        const _placesRepository = await getRepository(Place);

        await _placesRepository
            .findOneById(placeId)
            .then(async (place: any) => {
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

    };

    route() {
        this.router.get('/:_placeId', this.getPlaceById)
    }

}

export default new Route().router;