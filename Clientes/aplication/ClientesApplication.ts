import { ClienteRepository } from "../repository/ClientesRepository";
import {Cliente} from '../dto/Clientes';

export class ClientesApplication {
    constructor(private repository: ClienteRepository) { }

    save(user: Cliente) {
        return this.repository.save(user);
    }
    delete(id) {
        return this.repository.delete(id);
    }

    update(user: Cliente, id) {
        return this.repository.update(user, id);
    }

    getAll() {
        return this.repository.getAll();
    }

    getById(id) {
        return this.repository.getById(id);
    }
}