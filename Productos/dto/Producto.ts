//CREATE TABLE productos (id SERIAL, nombre VARCHAR(60), descripcion VARCHAR(200), presentacion VARCHAR(60), marca VARCHAR(60), caducidad DATE, existencia INTEGER);

export class Producto {
    private id: number;
    private nombre: string;
    constructor(id:number, nombre:string, private descripcion: string, private presentacion: string, private marca: string,
        private caducidad: Date,
        private existencia: number) {
        this.id=id;
        this.nombre=nombre;
    }

    get _id() {
        return this.id;
    }
    get _nombre() {
        return this.nombre;
    }

    get _descripcion() {
        return this.descripcion;
    }

    get _presentacion() {
        return this.presentacion;
    }

    get _marca() {
        return this.marca;
    }
    get _caducidad() {
        return this.caducidad;
    }
    get _existencia() {
        return this.existencia;
    }

    set _id(id){
        this.id=id;
    }
}
