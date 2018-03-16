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
        let placesRepository = await getRepository(Place);
        
        // Check if place with the same name exists 
        let foundPlaceWithName = await placesRepository.findOne({
            Name: req.body.Name
        });

        // If place with same name is found, return error
        if (foundPlaceWithName) {
            res.json({
                code,
                msg: "exists"
            });

        } else {
            let newPlace = new Place();
    
            newPlace.Name = req.body.Name;
            newPlace.Address = req.body.Address;
            newPlace.Category = req.body.Category;
            newPlace.Likes = 0;
            newPlace.Dislikes = 0;

            await placesRepository.save(newPlace)
                .then((place) => {
                    res.json({
                        code,
                        place
                    });
                })
        }
    };

    route() {
        this.router.post('/', this.addPlace);
    }

}

export default new Route().router;