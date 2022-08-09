import express = require ('express');
import { Votes } from '../interface/votes';
import { VoteRepo } from '../repositories/voteRepo'

/**
 * @author Muhammad Waris
 */

export class VoteController {
    getVotes = async (req, res: express.Response) => {
        let votesResponseGraph = {
            totalVotes: 0,
            votes: {}
        };
        try {
            let voteRepo =  new VoteRepo();
            let voteList: Votes[], votesObj = {}, totalVotes: number = 0;
            
            voteList = await voteRepo.getVotes();

            voteList.map((voteInfo) => {
                votesObj[voteInfo.candidate_id] = [voteInfo.name, voteInfo.votes, voteInfo.picture];
                totalVotes += voteInfo.votes;
            });

            votesResponseGraph.totalVotes = totalVotes;
            votesResponseGraph.votes = votesObj;

            res.status(200).json(votesResponseGraph);
        } catch (error) {
            res.status(500).json({
                error: "Something went wrong"
            });
        }
    }

    castVote = async (req, res: express.Response) => {
        try {
            let voteRepo =  new VoteRepo();
            let result = await voteRepo.castVote(
                req.body.name,
                req.body.email,
                req.body.gender,
                req.body.age,
                req.body.phone,
                req.body.id,
                req.body.comment ? req.body.comment : null
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