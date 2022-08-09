import { check, validationResult, query } from "express-validator";
import { VoteRepo } from '../repositories/voteRepo'

export class VerifyVoteData {
    validateVoteRequest = async (request, response, next) => {
       
      await check('id').isInt().run(request);
      await check('name').not().isEmpty().isLength({ min: 1, max: 50}).run(request);
      await check('email').isEmail().isLength({ max: 100 }).run(request);
      await check('age').exists().run(request);
      await check('phone').not().isEmpty().isLength({ max: 45 }).run(request);
      await check('gender').not().isEmpty().isLength({ min: 1, max: 45 }).run(request);
    //   await check('comment').optional({ nullable:true, checkFalsy:true }).isLength({ min: 1, max: 200 }).run(request);
      
      const errors = validationResult(request);
      if (!errors.isEmpty()) {
            response.status(422).json({
                errors: errors.array()
            });
        } else {
            next();
        }
    }

    verifyVoteExists = async (request, response, next) => {
        let voteRepo = new VoteRepo();
        let voteCount;
        try {
            voteCount = await voteRepo.checkVoteExist(request.body.email, request.body.phone);
            if(voteCount[0].count > 0){
                response.status(400).json({
                    error: "Vote already cast against given email/phone"
                });
            }
            else {
                next();
            }
        } catch (error) {
            console.log(error);
            response.status(500).json({
                error: "Something went wrong"
            });
        }
    }

    validateCandidateInfoRequest = async (request, response, next) => {
       
        await query('id').isInt().run(request);
        
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
              response.status(422).json({
                  errors: errors.array()
              });
          } else {
              next();
          }
      }
}