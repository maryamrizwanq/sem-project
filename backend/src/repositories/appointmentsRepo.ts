import { DbConnMgr_ } from '../common/dbConnMgr'

export class AppointmentsRepo {
    async bookAppointment(name:string, email: string, appointment_day: string, appointment_time: string, request_date: Date, doc_id: number, patient_message: null) {
        let query = "INSERT INTO `appointments` (`patient_name`, `patient_email`, `appointment_day`, `appointment_time`, `request_date`, `doc_id`, `patient_message`) " +
            " VALUES (?, ?, ?, ?, ?, ?, ?);";        

        let [rows, fields] = await DbConnMgr_.executeQuerySync(query, [name, email, appointment_day, appointment_time, request_date, doc_id, patient_message]);
        return rows;
    }
}