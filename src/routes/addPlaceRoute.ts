import {
    Place
} from "../entity/Place.entity";
import {
    getRepository
} from "typeorm";
import {
    Router
} from "express";

class Route {

    router: Router;

    constructor() {
        this.router = Router();
        this.route();
    }

    public addPlace = async (req: any, res: any, next: any) => {
        const code = res.statusCode;
        let AddPlace = new Place();
        let placesRepository = await getRepository(Place);

        // Check if place with the same name exists 
        let foundPlaceWithName = await placesRepository.findOne({
            Name: req.body.Name
        });
        
        // If place with same name is found, return error
        if (foundPlaceWithName) {
            res.json({
                code,
                msg: "Place already exist"
            })

        } else {
            var place = {
                Name: req.body.Name,
                Address: req.body.Address,
                City: req.body.City,
                Category: req.body.Category
            }


            await placesRepository.save(place);
            res.json({
                Results: place,
                code,
                msg: 'Place is successfully added'
            });

        }
    };

    route() {
        this.router.post('/', this.addPlace);
    }

}

export default new Route().router;