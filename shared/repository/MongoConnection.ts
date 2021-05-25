import { PoolClient, Pool } from 'pg';
import mongodb, { MongoClient, Db } from 'mongodb';
import dotenv from 'dotenv';

//SINGLETHON FOR CONNECTION
dotenv.config();
export class MongoConnection {
    private connection: Db = undefined;
    private static client: MongoClient;
    private static instance: MongoConnection;
    constructor() { }

    static getConnection() {
        if (!MongoConnection.client) {
            console.log(process.env.MONGO_URL);
            MongoConnection.client = new MongoClient(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
            MongoConnection.instance = new MongoConnection();
        }
        return MongoConnection.instance;
    }


    public get _connection(): Db {
        return this.connection;
    }


    connect() {
        return MongoConnection.client.connect().then((client) => {
            this.connection = MongoConnection.client.db(process.env.MONGO_DB)
        })
    }

}