import { ProductoRepository } from "../repository/ProductoRepository";
import {Producto} from '../dto/Producto';
export class ProductoApplication {
    constructor(private repository: ProductoRepository) { }

    save(user: Producto) {
        return this.repository.save(user);
    }
    delete(id) {
        return this.repository.delete(id);
    }

    update(user: Producto, id) {
        return this.repository.update(user, id);
    }

    getAll() {
        return this.repository.getAll();
    }

    getById(id) {
        return this.repository.getById(id);
    }
}
