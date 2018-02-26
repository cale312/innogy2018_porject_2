import * as express from 'express';
import { Router, Request, Response, NextFunction } from 'express';
import { Place } from "../entities/Place";

class PlacesRouter {

    router: Router;
  
    constructor() {
      this.router = Router();
      this.routes();
    }

    public AddPlace(req: Request, res: Response, next: NextFunction): void {
        let code = res.statusCode;
        res.json({
            code
        });
    }
  
    // set up our routes
    routes() {
      this.router.get('/add', this.AddPlace);
    }
  
}

export default new PlacesRouter().router;
