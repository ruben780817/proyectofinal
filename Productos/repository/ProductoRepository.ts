import { Producto } from '../dto/Producto';
import { PostgresConnection } from "../../shared/repository/Connections";

export class ProductoRepository {
    private pgConnection: PostgresConnection;

    constructor() {
        PostgresConnection.getConnection();
        this.pgConnection = PostgresConnection.getConnection();
    }
    save(productos: Producto): Promise<Producto> {
        //CREATE TABLE productos (id SERIAL, nombre VARCHAR(60), descripcion VARCHAR(200), presentacion VARCHAR(60), marca VARCHAR(60), caducidad DATE, existencia INTEGER);

        return this.pgConnection.execute('INSERT INTO productos(nombre, descripcion, presentacion, marca, caducidad, existencia ) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *', [productos._nombre, productos._descripcion, productos._presentacion, productos._marca, productos._caducidad, productos._existencia]).then(
            (res) => {
                const { id, nombre, descripcion, presentacion, marca, caducidad, existencia } = res.rows[0];
                return new Producto(id, nombre, descripcion, presentacion, marca, caducidad, existencia);
            }
        );
    }

    delete(id: any): Promise<void> {
        return this.pgConnection.execute('DELETE FROM productos WHERE id = $1', [id]).then(() => { });
    }
    update(user: Producto, id: any): Promise<Producto> {
        return this.pgConnection.execute('UPDATE productos SET nombre=$1, descripcion=$2, presentacion=$3, marca=$4, caducidad=$5, existencia=$6  WHERE id = $7', [user._nombre, user._descripcion, user._presentacion, user._marca, user._caducidad, user._existencia, id]).then((result) => {
            user._id = id;
            return user;
        });
    }

    getAll(): Promise<Producto[]> {
        return this.pgConnection.execute('SELECT * FROM productos').then(
            (res) => {
                const rows = res.rows;
                return rows.map(row => {
                    const {id, nombre, descripcion, presentacion, marca, caducidad, existencia} = row;
                    return new Producto(id, nombre, descripcion, presentacion, marca, caducidad, existencia);
                })
            }
        );
    }

    getById(id: any): Promise<Producto> {
        return this.pgConnection.execute('SELECT * FROM productos WHERE id = $1 LIMIT 1', [id]).then(
            (res) => {
                const { id, nombre, descripcion, presentacion, marca, caducidad, existencia } = res.rows[0];
                return new Producto(nombre, descripcion, presentacion, marca, caducidad, existencia, id);
            }
        );
    }
}

