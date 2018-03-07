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

    public getPlaceByName = async (req: any, res: any, next: any) => {
        const code = res.statusCode;
        const placeName = req.params._placeName;
        const _placesRepository = await getRepository(Place);

        await _placesRepository
            .findOne({ Name: placeName })
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
        this.router.get('/:_placeName', this.getPlaceByName)
    }

}

export default new Route().router;