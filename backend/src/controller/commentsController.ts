import express = require ('express');
import { Comments } from '../interface/comments';
import { CommentsRepo } from '../repositories/commentsRepo'

/**
 * @author Muhammad Waris
 */

export class CommentsController {
    getComments = async (req, res: express.Response) => {
        try {
            let commRepo =  new CommentsRepo();
            let candidatesList: Comments[];
            candidatesList = await commRepo.getComments()

            res.status(200).json({
                commentsList : candidatesList
            });
        } catch (error) {
            res.status(500).json({
                error: "Something went wrong"
            });
        }
    }

    postComment = async (req, res: express.Response) => {
        try {
            let commRepo =  new CommentsRepo();
            let result = await commRepo.insertComment(
                req.body.name,
                req.body.comment
            );

            if (result.affectedRows > 0) {
                res.status(201).json({
                    'info': "Success"
                });
            }
            else {
                res.status(403).json({
                    'error': "Unable to post comment"
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