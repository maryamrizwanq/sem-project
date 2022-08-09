import { ApiRoutes } from '../common/constants';
import { AppointmentsController } from '../controller/appointmentsController';


let express = require('express');

export class AppointmentsRouter {
    public router = express.Router();
    appController = new AppointmentsController();
    constructor(){
        this.initializePostRoutes();
    }

    initializePostRoutes(){
        this.router.post(
            ApiRoutes.APPOINTMENT, 
            this.appController.bookAppointment
        );
    }
}