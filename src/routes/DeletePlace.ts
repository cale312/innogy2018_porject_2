import * as express from 'express';
import { Router, Request, Response, NextFunction } from 'express';
import { Place } from "../entities/Place";

class PlacesRouter {

    router: Router;
  
    constructor() {
      this.router = Router();
      this.routes();
    }

    public DeletePlace(req: Request, res: Response, next: NextFunction): void {
        let code = res.statusCode;
        res.json({
            code
        });
    }
  
    // set up our routes
    routes() {
      this.router.get('/:ID/delete', this.DeletePlace);
    }
  
}

export default new PlacesRouter().router;
