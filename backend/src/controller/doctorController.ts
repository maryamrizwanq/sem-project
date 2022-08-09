import express = require ('express');
import { Doctor } from '../interface/doctor';
// import { WorkingHours } from '../interface/workingHours';
import { DoctorRepo } from '../repositories/doctorRepo'

export class DoctorController {
    getCandidates = async (req, res: express.Response) => {
        try {
            let docRepo =  new DoctorRepo();
            let docList: Doctor[];

            docList = await docRepo.getDoctorsInfo()

            res.status(200).json({
                list : docList
            });
        } catch (error) {
            res.status(500).json({
                error: "Something went wrong"
            });
        }
    }

    // getCandidateInfo = async (req, res: express.Response) => {
    //     try {
    //         let candRepo =  new CandidatesRepo();
    //         let candidatesList: Candidate[];
    //         let commentsList: Comments[];
    //         let candidateId: number = req.query.id;

    //         candidatesList = await candRepo.getCandidates(candidateId)
    //         commentsList = await candRepo.getCandidateComments(candidateId)

    //         res.status(200).json({
    //             list : candidatesList,
    //             commentsList: commentsList
    //         });
    //     } catch (error) {
    //         res.status(500).json({
    //             error: "Something went wrong"
    //         });
    //     }
    // }
}