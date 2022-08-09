import { ApiRoutes } from '../common/constants';
import { WorkingHoursController } from '../controller/workingHoursController'

let express = require('express');

export class WorkingHoursRouter {
    public router = express.Router();
    whController = new WorkingHoursController();

    constructor(){
        this.initializeGetRoutes();
    }

    initializeGetRoutes(){
        this.router.get(ApiRoutes.WH, this.whController.getComments);
    }
}