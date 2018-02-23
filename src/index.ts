import "reflect-metadata";
import { createConnection } from "typeorm";
import { Place } from "./entity/Place";

createConnection().then(async connection => {
    
}).catch(error => console.log(error));
