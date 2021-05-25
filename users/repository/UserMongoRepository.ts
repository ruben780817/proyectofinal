import { Collection, Db, ObjectId } from "mongodb";
import { MongoConnection } from "../../shared/repository/MongoConnection";
import { IUserRepository } from "./IUserRepository";
import { User } from '../dto/User';

export class UserMongoRepository implements IUserRepository {
    private mongoDB: Db;
    private collection: Collection;

    constructor() {
        this.mongoDB = MongoConnection.getConnection()._connection;
        this.collection = this.mongoDB.collection('users')

    }

    save(user: User): Promise<User> {
        return this.collection.insertOne({ name: user.name, password: user.password, status: true, email: user.userName }).then(res => {
            user.id = res.insertedId;
            return user;
        });
    }
    delete(id: any): Promise<void> {
        return this.collection.remove({ _id: id }).then(res => { });
    }
    update(user: User, id: any): Promise<User> {
        return this.collection.updateOne({ _id: new ObjectId(id) }, { $set: { name: user.name, password: user.password, status: true, email: user.userName } }).then(res => {
            user.id = res.upsertedId;
            return user;
        });
    }
    getAll(): Promise<User[]> {
        return this.collection.find().toArray().then(res => {
            return res.map(data => {
                const { _id, name, status, email } = data;
                const user = new User(name, email, '');
                user.id = _id;
                return user;
            });
        })
    }
    getById(id: string): Promise<User> {
        return this.collection.findOne({ _id: new ObjectId(id) }).then(data => {
            const { _id, name, status, email } = data;
            const user = new User(name, email, '');
            user.id = _id;
            return user;
        });
    }
}