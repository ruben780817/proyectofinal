import { Cliente } from '../dto/Clientes';
import { PostgresConnection } from "../../shared/repository/Connections";

export class ClienteRepository {
    private pgConnection: PostgresConnection;

    constructor() {
        PostgresConnection.getConnection();
        this.pgConnection = PostgresConnection.getConnection();
    }
    save(clientes: Cliente): Promise<Cliente> {
        //CREATE TABLE productos (id SERIAL, nombre VARCHAR(60), descripcion VARCHAR(200), presentacion VARCHAR(60), marca VARCHAR(60), caducidad DATE, existencia INTEGER);

        return this.pgConnection.execute('INSERT INTO clientes(nombre, apellidoPat, apellidoMat, edad, ciudad, fechaNacimiento ) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *', [ clientes._nombre, clientes._apellidoPat, clientes._appelidoMat, clientes._edad, clientes._ciudad, clientes._fechaNacimiento]).then(
            (res) => {
                const { id, nombre, apellidoPat, apellidoMat, edad, ciudad, fechaNacimiento } = res.rows[0];
                return new Cliente(id, nombre, apellidoPat, apellidoMat, edad, ciudad, fechaNacimiento);
            }
        );
    }

    delete(id: any): Promise<void> {
        return this.pgConnection.execute('DELETE FROM clientes WHERE id = $1', [id]).then(() => { });
    }
    update(user: Cliente, id: any): Promise<Cliente> {
        return this.pgConnection.execute('UPDATE clientes SET nombre=$1, apellidoPat=$2, apellidoMAt=$3, edad=$4, ciudad=$5, fechaNacimiento=$6  WHERE id = $7', [ user._nombre, user._apellidoPat, user._appelidoMat, user._edad, user._ciudad, user._fechaNacimiento, id]).then((result) => {
            user._id = id;
            return user;
        });
    }

    getAll(): Promise<Cliente[]> {
        return this.pgConnection.execute('SELECT * FROM clientes').then(
            (res) => {
                const rows = res.rows;
                return rows.map(row => {
                    const {id, nombre, apellidoPat, apellidoMat, edad, ciudad, fechaNacimiento} = row;
                    return new Cliente(id, nombre, apellidoPat, apellidoMat, edad, ciudad, fechaNacimiento);
                })
            }
        );
    }

    getById(id: any): Promise<Cliente> {
        return this.pgConnection.execute('SELECT * FROM clientes WHERE id = $1 LIMIT 1', [id]).then(
            (res) => {
                const { id, nombre, apellidoPat, apellidoMat, edad, ciudad, fechaNacimiento } = res.rows[0];
                return new Cliente(nombre, apellidoPat, apellidoMat, edad, ciudad, fechaNacimiento, id);
            }
        );
    }
}
