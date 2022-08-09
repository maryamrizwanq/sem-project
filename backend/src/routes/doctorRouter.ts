import { ApiRoutes } from '../common/constants';
import { DoctorController } from '../controller/doctorController'
import { VerifyVoteData } from '../middleware/verifyVoteData';

let express = require('express');

export class CandidatesRouter {
    public router = express.Router();
    candidateController = new DoctorController();
    dataValidator = new VerifyVoteData();

    constructor(){
        this.initializeGetRoutes();
    }

    initializeGetRoutes(){
        this.router.get(ApiRoutes.DOCTOR, this.candidateController.getCandidates);
        // this.router.get(ApiRoutes.CANDIDATE_INFO, 
        //     this.dataValidator.validateCandidateInfoRequest,
        //     this.candidateController.getCandidateInfo);
    }
}
// var keyStore = require('../key-store');