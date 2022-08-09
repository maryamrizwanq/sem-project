import express = require ('express');
// import { Votes } from '../interface/appointments';
import { AppointmentsRepo } from '../repositories/appointmentsRepo'


export class AppointmentsController {
    // getVotes = async (req, res: express.Response) => {
    //     let votesResponseGraph = {
    //         totalVotes: 0,
    //         votes: {}
    //     };
    //     try {
    //         let voteRepo =  new AppointmentsRepo();
    //         let voteList: Votes[], votesObj = {}, totalVotes: number = 0;
            
    //         voteList = await voteRepo.getVotes();

    //         voteList.map((voteInfo) => {
    //             votesObj[voteInfo.candidate_id] = [voteInfo.name, voteInfo.votes, voteInfo.picture];
    //             totalVotes += voteInfo.votes;
    //         });

    //         votesResponseGraph.totalVotes = totalVotes;
    //         votesResponseGraph.votes = votesObj;

    //         res.status(200).json(votesResponseGraph);
    //     } catch (error) {
    //         res.status(500).json({
    //             error: "Something went wrong"
    //         });
    //     }
    // }

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
                    'info': "Success"
                });
            }
            else {
                res.status(403).json({
                    'error': "Unable to cast vote"
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