import { check, validationResult } from "express-validator";

export class VerifyAppointmentData {
    validateAppointmentRequest = async (request, response, next) => {
       
      await check('doc_id').isInt().run(request);
      await check('name').not().isEmpty().isLength({ min: 1, max: 50}).run(request);
      await check('email').isEmail().isLength({ max: 100 }).run(request);
      await check('appointment_day').not().isEmpty().run(request);
      await check('appointment_time').not().isEmpty().run(request);
      await check('patient_message').not().isEmpty().isLength({ min: 1, max: 200 }).run(request);
      
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