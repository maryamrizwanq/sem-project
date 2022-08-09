import mysql2 from 'mysql2';
import { config } from '../config';


class DbConnMgr {
    
    pool;
    promisePool;
    config = {}
    
    constructor() {
        this.pool = null;
        this.promisePool = null;
        this.config = config.db;
    }

    async initPool() {
        try {
            console.log(`New pool init`)
            this.pool = mysql2.createPool(this.config);
            this.promisePool = this.pool.promise();
        } catch (error) {
            process.exit(1);
        }
    }

    async getConnectionFromPool() {
        if (this.pool === null || this.promisePool === null)
            await this.initPool();
    }

    async executeQuerySync(query, binds = {}) {
        let connection;
        try {
            await this.getConnectionFromPool()
            connection = this.promisePool;

            return await connection.execute(query, binds);
        }
        catch (err) {
            console.log(err);
        }
    }
}

export const DbConnMgr_ = new DbConnMgr();