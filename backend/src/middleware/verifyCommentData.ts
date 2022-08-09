import { check, validationResult, query } from "express-validator";

export class VerifyCommentData {
    validateCommentRequest = async (request, response, next) => {
       
      await check('name').not().isEmpty().isLength({ min: 1, max: 50}).run(request);
      await check('comment').not().isEmpty().isLength({ min: 1, max: 200 }).run(request);
      
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