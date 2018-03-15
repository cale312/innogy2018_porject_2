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

    public likePlace = async (req: any, res: any, next: any) => {
        const code = res.statusCode;
        let placeName = req.params._placeName;
        let placesRepository = await getRepository(Place);
        let placeToLike = await placesRepository.findOne({ Name: placeName });

        placeToLike.Likes = placeToLike.Likes+=1;

        await placesRepository
            .save(placeToLike)
            .then(async (place: any) => {
                res.json({
                    code,
                    place
                });
        })

    };

    route() {
        this.router.put('/:_placeName/like', this.likePlace);
    }

}

export default new Route().router;