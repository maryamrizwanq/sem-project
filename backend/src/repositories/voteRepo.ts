import { DbConnMgr_ } from '../common/dbConnMgr'
import { Votes } from '../interface/appointments'

/**
 * @author Muhammad Waris
 */

export class VoteRepo {
    async getVotes(): Promise<Votes[]> {
        let query = "SELECT c.id as candidate_id, c.pictureName as picture, c.name, count(v.id) as votes FROM `vote-so`.candidate c " +
            " left join `vote-so`.votes v " +
            " on c.id = v.candidate_id " +
            " group by c.id ";
        

        let [rows, fields] = await DbConnMgr_.executeQuerySync(query, []);
        return rows;
    }

    async checkVoteExist(email: string, phone: string) {
        let query = "SELECT count(id) as count FROM `vote-so`.votes" +
            " where voter_email = ? or voter_phone = ? ";        

        let [rows, fields] = await DbConnMgr_.executeQuerySync(query, [email, phone]);
        return rows;
    }

    async castVote(name:string, email: string, gender: string, age: string, phone: string, candidateId: number, comment: null) {
        let query = "INSERT INTO `vote-so`.`votes` (`voter_name`, `voter_email`, `voter_gender`, `voter_age`, `voter_phone`, `candidate_id`, `voter_comment`) " +
            " VALUES (?, ?, ?, ?, ?, ?, ?);";        

        let [rows, fields] = await DbConnMgr_.executeQuerySync(query, [name, email, gender, age, phone, candidateId, comment]);
        return rows;
    }
}