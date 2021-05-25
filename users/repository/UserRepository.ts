//SON REPOSITORIOS O DAO
import { IUserRepository } from "./IUserRepository";
import { User } from '../dto/User';
import { PostgresConnection } from "../../shared/repository/Connections";

export class UserRepository implements IUserRepository {
    private pgConnection: PostgresConnection;

    constructor() {
        PostgresConnection.getConnection();
        this.pgConnection = PostgresConnection.getConnection();
    }

    save(user: User): Promise<User> {
        return this.pgConnection.execute('INSERT INTO users(name, username, password) VALUES ($1,$2,$3) RETURNING *', [user.name, user.userName, user.password]).then(
            (res) => {
                const { id, name, username } = res.rows[0];
                return new User(name, username, '', id);
            }
        );
    }

    delete(id: any): Promise<void> {
        return this.pgConnection.execute('DELETE FROM users WHERE id = $1', [id]).then(() => { });
    }
    update(user: User, id: any): Promise<User> {
        return this.pgConnection.execute('UPDATE users SET name=$1, username=$2  WHERE id = $3', [user.name, user.userName, id]).then((result) => {
            user.id = id;
            return user;
        });
    }

    getAll(): Promise<User[]> {
        return this.pgConnection.execute('SELECT * FROM users').then(
            (res) => {
                const rows = res.rows;
                return rows.map(row => {
                    const { id, name, username } = row;
                    return new User(name, username, '', id);
                })
            }
        );
    }
    getById(id: any): Promise<User> {
        return this.pgConnection.execute('SELECT * FROM users WHERE id = $1 LIMIT 1', [id]).then(
            (res) => {
                const { id, name, username } = res.rows[0];
                return new User(name, username, '', id);
            }
        );
    }
}