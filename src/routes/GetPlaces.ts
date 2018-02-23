import * as express from 'express';
import { Router, Request, Response, NextFunction } from 'express';

class PlacesRouter {

    router: Router;
  
    constructor() {
      this.router = Router();
      this.routes();
    }

    public GetPlaces(req: Request, res: Response, next: NextFunction): void {
        let msg = res.statusMessage;
        res.json({
            msg
        });
    }
  
    // set up our routes
    routes() {
      this.router.get('/', this.GetPlaces);
    }
  
}
  
const placesRoute = new PlacesRouter();
placesRoute.routes();

export default placesRoute.router;
