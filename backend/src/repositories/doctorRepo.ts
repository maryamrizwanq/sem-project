import { DbConnMgr_ } from '../common/dbConnMgr'
import { Doctor } from '../interface/doctor'

export class DoctorRepo {
    async getDoctorsInfo(): Promise<Doctor[]> {
        let query = 'SELECT * from doctor ';
        let [rows, fields] = await DbConnMgr_.executeQuerySync(query, []);
        return rows;
    }
}