import express = require ('express');
import { WorkingHours } from '../interface/workingHours';
import { WorkingHoursRepo } from '../repositories/workingHoursRepo'

export class WorkingHoursController {
    getComments = async (req, res: express.Response) => {
        try {
            let whRepo =  new WorkingHoursRepo();
            let whList: WorkingHours[];
            whList = await whRepo.getWorkingHours()

            res.status(200).json({
                workHours : whList
            });
        } catch (error) {
            res.status(500).json({
                error: "Something went wrong"
            });
        }
    }

    // postComment = async (req, res: express.Response) => {
    //     try {
    //         let commRepo =  new CommentsRepo();
    //         let result = await commRepo.insertComment(
    //             req.body.name,
    //             req.body.comment
    //         );

    //         if (result.affectedRows > 0) {
    //             res.status(201).json({
    //                 'info': "Success"
    //             });
    //         }
    //         else {
    //             res.status(403).json({
    //                 'error': "Unable to post comment"
    //             });
    //         }

    //     } catch (error) {
    //         console.log(error);
    //         res.status(500).json({
    //             error: "Something went wrong"
    //         });
    //     }
    // }
}