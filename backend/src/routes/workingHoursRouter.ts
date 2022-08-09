import { ApiRoutes } from '../common/constants';
import { WorkingHoursController } from '../controller/workingHoursController'
// import { VerifyCommentData } from '../middleware/verifyCommentData';

let express = require('express');

export class WorkingHoursRouter {
    public router = express.Router();
    whController = new WorkingHoursController();
    // dataValidator = new VerifyCommentData();

    constructor(){
        this.initializeGetRoutes();
        // this.initializePostRoutes();
    }

    initializeGetRoutes(){
        this.router.get(ApiRoutes.WH, this.whController.getComments);
    }

    // initializePostRoutes(){
    //     this.dataValidator.validateCommentRequest,
    //     this.router.post(ApiRoutes.COMMENTS, this.commentsController.postComment);
    // }
}