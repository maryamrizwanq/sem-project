import express = require ('express');
import { Candidate } from '../interface/candidate';
import { Comments } from '../interface/comments';
import { CandidatesRepo } from '../repositories/candidatesRepo'

/**
 * @author Muhammad Waris
 */

export class CandidateController {
    getCandidates = async (req, res: express.Response) => {
        try {
            let candRepo =  new CandidatesRepo();
            let candidatesList: Candidate[];
            let candidateId: number = req.query.id;

            candidatesList = await candRepo.getCandidates(candidateId)

            res.status(200).json({
                list : candidatesList
            });
        } catch (error) {
            res.status(500).json({
                error: "Something went wrong"
            });
        }
    }

    getCandidateInfo = async (req, res: express.Response) => {
        try {
            let candRepo =  new CandidatesRepo();
            let candidatesList: Candidate[];
            let commentsList: Comments[];
            let candidateId: number = req.query.id;

            candidatesList = await candRepo.getCandidates(candidateId)
            commentsList = await candRepo.getCandidateComments(candidateId)

            res.status(200).json({
                list : candidatesList,
                commentsList: commentsList
            });
        } catch (error) {
            res.status(500).json({
                error: "Something went wrong"
            });
        }
    }
}