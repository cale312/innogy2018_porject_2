import {
    getRepository
} from "typeorm";
import {
    Router
} from "express";
import {
    Reviews
} from "../entity/Reviews.entity";
import {
    Place
} from "../entity/Place.entity";

class Route {

    router: Router;

    constructor() {
        this.router = Router();
        this.route();
    }

    public reviewPlace = async (req: any, res: any, next: any) => {
        const code = res.statusCode;
        let data = req.body;
        let placeName = req.params._placeName;
        let placeRepo = await getRepository(Place);

        await placeRepo
            .findOne({
                name: placeName
            })
            .then(async (place) => {
                if (place) {
                    let newReview = new Reviews();

                    newReview.userName = data.userName;
                    newReview.review = data.review;

                    place.visits = place.visits+=1;

                    newReview.place = place;

                    getRepository(Reviews)
                        .manager
                        .save(newReview)
                        .then( () => {
                            placeRepo.find({
                                    relations: ["Reviews"]
                                })
                                .then(async (places: any) => {
                                    res.json({
                                        code,
                                        places
                                    });
                                })
                        })
                } else {
                    res.json({
                        msg: 'place not found'
                    })
                }
            })

    };

    route() {
        this.router.post('/:_placeName/review', this.reviewPlace);
    }

}

export default new Route().router;