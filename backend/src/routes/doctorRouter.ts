import { ApiRoutes } from '../common/constants';
import { DoctorController } from '../controller/doctorController'

let express = require('express');

export class CandidatesRouter {
    public router = express.Router();
    candidateController = new DoctorController();

    constructor(){
        this.initializeGetRoutes();
    }

    initializeGetRoutes(){
        this.router.get(ApiRoutes.DOCTOR, this.candidateController.getCandidates);
    }
}