import { DbConnMgr_ } from '../common/dbConnMgr'
import { Doctor } from '../interface/doctor'
// import { WorkingHours } from '../interface/workingHours';

export class DoctorRepo {
    async getDoctorsInfo(): Promise<Doctor[]> {
        let query = 'SELECT * from doctor ';
        let [rows, fields] = await DbConnMgr_.executeQuerySync(query);
        return rows;
    }

    // async getCandidateComments(id: number): Promise<Comments[]> {
    //     let query = " SELECT v.voter_comment as comment, v.vote_date as comment_date, v.voter_name as commenter_name from `vote-so`.votes v " +
    //                 " where v.candidate_id = ? and v.voter_comment is not null " +               
    //                 " ORDER By comment_date DESC ";
    //     let [rows, fields] = await DbConnMgr_.executeQuerySync(query, [id]);
    //     return rows;
    // }
}