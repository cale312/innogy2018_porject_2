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

    public getPlaceByCategory = async (req: any, res: any, next: any) => {
        const code = res.statusCode;
        const placeCategory = req.params._placeCategory;
        const _placesRepository = await getRepository(Place);

        await _placesRepository
            .findOne({ Category: placeCategory })
            .then(async (place: any) => {
                if (place) {
                    res.json({
                        code,
                        place
                    });
                } else {
                    res.json({
                        code,
                        place: 'Place does not exist, add it!'
                    });
                }
            })

    };

    route() {
        this.router.get('/:_placeCategory', this.getPlaceByCategory)
    }

}

export default new Route().router;