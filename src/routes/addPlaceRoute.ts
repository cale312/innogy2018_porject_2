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
            name: req.body.Name
        });

        // If place with same name is found, return error
        if (foundPlaceWithName) {
            res.json({
                code,
                msg: "exists"
            });

        } else {
            let newPlace = new Place();

            newPlace.name = req.body.Name;
            newPlace.address = req.body.Address;
            newPlace.category = req.body.Category;
            newPlace.likes = 0;
            newPlace.dislikes = 0;
            newPlace.lng = req.body.Lng;
            newPlace.lat = req.body.Lat;

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