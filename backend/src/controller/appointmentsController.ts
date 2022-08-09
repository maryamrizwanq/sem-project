import express = require ('express');
import { AppointmentsRepo } from '../repositories/appointmentsRepo'


export class AppointmentsController {
    bookAppointment = async (req, res: express.Response) => {
        try {
            let appRepo =  new AppointmentsRepo();
            let result = await appRepo.bookAppointment(
                req.body.name,
                req.body.email,
                req.body.appointment_day,
                req.body.appointment_time,
                new Date(),
                req.body.doc_id,
                req.body.patient_message
            );

            if (result.affectedRows > 0) {
                res.status(201).json({
                    'info': "Appointment booked successfully"
                });
            }
            else {
                res.status(403).json({
                    'error': "Unable to book appointment"
                });
            }

        } catch (error) {
            console.log(error);
            res.status(500).json({
                error: "Something went wrong"
            });
        }
    }
}