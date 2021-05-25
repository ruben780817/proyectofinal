import { PoolClient, Pool } from 'pg';
//SINGLETHON FOR CONNECTION
export class PostgresConnection {
    private static connection: Pool = undefined;
    private client: PoolClient;
    private static _instance: PostgresConnection;

    constructor() { }

    static getConnection() {
        if (!PostgresConnection.connection) {
            console.log(process.env.DB_USER);
            
            PostgresConnection.connection = new Pool({
                host: process.env.DB_HOST,
                password: process.env.DB_PASS,
                database: process.env.DB_NAME,
                user: process.env.DB_USER,
                ssl: {
                    rejectUnauthorized: false,
                  }
            });
            PostgresConnection._instance = new PostgresConnection();
        }
        return PostgresConnection._instance;
    }

    connect() {
        return PostgresConnection.connection.connect((err, client) => {
            if (err) {
                console.log(err);
                
                throw new Error("BAD CONNECTION POSTGRES");
            }
            this.client = client;
        })
    }

    execute(sql: string, values: string[] = []) {
        return this.client.query({
            text: sql,
            values
        });
    }
}