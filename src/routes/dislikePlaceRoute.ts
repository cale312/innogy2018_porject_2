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

    public dislikePlace = async (req: any, res: any, next: any) => {
        const code = res.statusCode;
        let placeName = req.params._placeName;
        let placesRepository = await getRepository(Place);
        let placeToDislike = await placesRepository.findOne({ Name: placeName });

        placeToDislike.Dislikes = placeToDislike.Dislikes+=1;

        await placesRepository
            .save(placeToDislike)
            .then(async (place: any) => {
                res.json({
                    code,
                    place
                });
        })

    };

    route() {
        this.router.put('/:_placeName/dislike', this.dislikePlace);
    }

}

export default new Route().router;