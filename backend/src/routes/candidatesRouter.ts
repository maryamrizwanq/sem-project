import { ApiRoutes } from '../common/constants';
import { CandidateController } from '../controller/candidatesController'
import { VerifyVoteData } from '../middleware/verifyVoteData';

/**
 * @author Muhammad Waris
 */

let express = require('express');

export class CandidatesRouter {
    public router = express.Router();
    candidateController = new CandidateController();
    dataValidator = new VerifyVoteData();

    constructor(){
        this.initializeGetRoutes();
    }

    initializeGetRoutes(){
        this.router.get(ApiRoutes.CANDIDATE, this.candidateController.getCandidates);
        this.router.get(ApiRoutes.CANDIDATE_INFO, 
            this.dataValidator.validateCandidateInfoRequest,
            this.candidateController.getCandidateInfo);
    }
}
// var keyStore = require('../key-store');