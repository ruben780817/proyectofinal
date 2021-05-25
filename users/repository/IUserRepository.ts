import { User } from "../dto/User";

export interface IUserRepository {
    save(user: User): Promise<User>;
    delete(id): Promise<void>;
    update(user: User, id): Promise<User>;
    getAll(): Promise<User[]>;
    getById(id): Promise<User>;
}