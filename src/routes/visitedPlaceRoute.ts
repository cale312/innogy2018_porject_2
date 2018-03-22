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

    public visitedPlace = async (req: any, res: any, next: any) => {
        const code = res.statusCode;
        let placeName = req.params._placeName;
        let placesRepository = await getRepository(Place);
        let placeVisited = await placesRepository.findOne({ name: placeName });

        placeVisited.visits = placeVisited.visits+=1;

        await placesRepository
            .save(placeVisited)
            .then(async (place: any) => {
                res.json({
                    code,
                    place
                });
        })

    };

    route() {
        this.router.put('/:_placeName/visited', this.visitedPlace);
    }

}

export default new Route().router;