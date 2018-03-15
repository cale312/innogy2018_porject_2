import {
    getRepository
} from "typeorm";
import {
    Router
} from "express";
import {
    Reviews
} from "../entity/Reviews.entity";

class Route {

    router: Router;

    constructor() {
        this.router = Router();
        this.route();
    }

    public reviewPlace = async (req: any, res: any, next: any) => {
        const code = res.statusCode;
        let data = req.body;
        let reviewsRepo = await getRepository(Reviews);

        let newReview = new Reviews();

        newReview.UserName = data.userName;
        newReview.Review = data.review;

        await reviewsRepo
            .save(newReview)
            .then( (result) => {
                res.json({
                    result
                })
            })

    };

    route() {
        this.router.post('/:_placeName/review', this.reviewPlace);
    }

}

export default new Route().router;