import { DbConnMgr_ } from '../common/dbConnMgr'
import { Doctor } from '../interface/doctor'
import { WorkingHours } from '../interface/workingHours';

/**
 * @author Muhammad Waris
 */

export class CandidatesRepo {
    async getCandidates(id?: number): Promise<Candidate[]> {
        let query = 'SELECT c.id, c.name, c.desc, c.pictureName as picture from `vote-so`.candidate c ';
        let queryParms: Array<number> = [];
        if (id !== undefined && id !== null) {
            query += `where c.id = ?`
            queryParms = [id];
        }

        let [rows, fields] = await DbConnMgr_.executeQuerySync(query, queryParms);
        return rows;
    }

    async getCandidateComments(id: number): Promise<Comments[]> {
        let query = " SELECT v.voter_comment as comment, v.vote_date as comment_date, v.voter_name as commenter_name from `vote-so`.votes v " +
                    " where v.candidate_id = ? and v.voter_comment is not null " +               
                    " ORDER By comment_date DESC ";
        let [rows, fields] = await DbConnMgr_.executeQuerySync(query, [id]);
        return rows;
    }
}