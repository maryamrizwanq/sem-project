import { ApiRoutes } from '../common/constants';
import { VoteController } from '../controller/voteController';
import { VerifyVoteData } from '../middleware/verifyVoteData';


/**
 * @author Muhammad Waris
 */

let express = require('express');

export class Votes {
    public router = express.Router();
    voteController = new VoteController();
    dataValidator = new VerifyVoteData();
    constructor(){
        this.initializeGetRoutes();
        this.initializePostRoutes();
    }

    initializeGetRoutes(){
        this.router.get(
            ApiRoutes.VOTE, 
            this.voteController.getVotes
        );
    }

    initializePostRoutes(){
        this.router.post(
            ApiRoutes.VOTE, 
            this.dataValidator.validateVoteRequest,
            this.dataValidator.verifyVoteExists,
            this.voteController.castVote
        );
    }
}