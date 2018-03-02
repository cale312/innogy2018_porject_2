import {
    getRepository
} from "typeorm";
import {
    Place
} from "../entity/Place.entity";
import {
    Router
} from 'express';

class Route {

    router: Router;

    constructor() {
        this.router = Router();
        this.route();
    }

    // Get all places route
    public getAllPlaces = async (req: any, res: any, next: any) => {
        const code = res.statusCode;
        // create repository for the places entity
        const _placesRepository = await getRepository(Place);
        await _placesRepository
            .find()
            .then(async (places: any) => {
                res.json({
                    code,
                    places
                });
            })

    };

    route() {
        this.router.get('/', this.getAllPlaces);
    }
}

export default new Route().router;