import { DbConnMgr_ } from '../common/dbConnMgr'
import { Comments } from '../interface/comments'

/**
 * @author Muhammad Waris
 */

export class CommentsRepo {
    async getComments(): Promise<Comments[]> {
        let query = " SELECT c.comment, c.comment_date, c.commenter_name from `vote-so`.comments c " +              
                    " ORDER By comment_date DESC ";
        let [rows, fields] = await DbConnMgr_.executeQuerySync(query, []);
        return rows;
    }

    async insertComment(name:string, comment: null) {
        let query = "INSERT INTO `vote-so`.`comments` (`commenter_name`, `comment`) " +
            " VALUES (?, ?);";        

        let [rows, fields] = await DbConnMgr_.executeQuerySync(query, [name, comment]);
        return rows;
    }
}