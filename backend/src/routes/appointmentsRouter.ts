import { ApiRoutes } from '../common/constants';
import { AppointmentsController } from '../controller/appointmentsController';
import { VerifyAppointmentData } from '../middleware/verifyAppointmentData'


let express = require('express');

export class AppointmentsRouter {
    public router = express.Router();
    appController = new AppointmentsController();
    verAppDataMiddleware = new VerifyAppointmentData();
    constructor(){
        this.initializePostRoutes();
    }

    initializePostRoutes(){
        this.router.post(
            ApiRoutes.APPOINTMENT,
            this.verAppDataMiddleware.validateAppointmentRequest,
            this.appController.bookAppointment
        );
    }
}