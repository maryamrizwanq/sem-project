import { ApiRoutes } from '../common/constants';
import { CommentsController } from '../controller/commentsController'
import { VerifyCommentData } from '../middleware/verifyCommentData';

/**
 * @author Muhammad Waris
 */

let express = require('express');

export class CommentsRouter {
    public router = express.Router();
    commentsController = new CommentsController();
    dataValidator = new VerifyCommentData();

    constructor(){
        this.initializeGetRoutes();
        this.initializePostRoutes();
    }

    initializeGetRoutes(){
        this.router.get(ApiRoutes.COMMENTS, this.commentsController.getComments);
    }

    initializePostRoutes(){
        this.dataValidator.validateCommentRequest,
        this.router.post(ApiRoutes.COMMENTS, this.commentsController.postComment);
    }
}