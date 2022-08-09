import { DbConnMgr_ } from '../common/dbConnMgr'
import { WorkingHours } from '../interface/workingHours'


export class WorkingHoursRepo {
    async getWorkingHours(): Promise<WorkingHours[]> {
        let query = " SELECT * from working_hours ";
        let [rows, fields] = await DbConnMgr_.executeQuerySync(query, []);
        return rows;
    }

    // async insertComment(name:string, comment: null) {
    //     let query = "INSERT INTO `vote-so`.`comments` (`commenter_name`, `comment`) " +
    //         " VALUES (?, ?);";        

    //     let [rows, fields] = await DbConnMgr_.executeQuerySync(query, [name, comment]);
    //     return rows;
    // }
}