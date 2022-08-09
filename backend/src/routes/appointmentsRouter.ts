import { ApiRoutes } from '../common/constants';
import { AppointmentsController } from '../controller/appointmentsController';
import { VerifyVoteData } from '../middleware/verifyVoteData';


let express = require('express');

export class AppointmentsRouter {
    public router = express.Router();
    appController = new AppointmentsController();
    dataValidator = new VerifyVoteData();
    constructor(){
        // this.initializeGetRoutes();
        this.initializePostRoutes();
    }

    // initializeGetRoutes(){
    //     this.router.get(
    //         ApiRoutes., 
    //         this.voteController.getVotes
    //     );
    // }

    initializePostRoutes(){
        this.router.post(
            ApiRoutes.APPOINTMENT, 
            this.dataValidator.validateVoteRequest,
            // this.dataValidator.verifyVoteExists,
            this.appController.bookAppointment
        );
    }
}