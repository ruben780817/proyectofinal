import { IUserRepository } from "../repository/IUserRepository";
import {User} from '../dto/User';
export class UserApplication {
    constructor(private repository: IUserRepository) { }

    save(user: User) {
        return this.repository.save(user);
    }

    delete(id) {
        return this.repository.delete(id);
    }

    update(user: User, id) {
        return this.repository.update(user, id);
    }

    getAll() {
        return this.repository.getAll();
    }

    getById(id) {
        return this.repository.getById(id);
    }
}