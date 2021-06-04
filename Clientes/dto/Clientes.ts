
export class Cliente {
    private id: number;
    private nombre: string;
    constructor(id:number, nombre:string, private apellidoPat: string, private apellidoMat: string, private edad: string,
        private ciudad: string, 
        private fechaNacimiento: Date) {
        this.id=id;
        this.nombre=nombre;
    }
    
    get _id() {
        return this.id;
    }
    get _nombre() {
        return this.nombre;
    }

    get _apellidoPat() {
        return this.apellidoPat;
    }

    get _appelidoMat() {
        return this.apellidoMat;
    }

    get _edad() {
        return this.edad;
    }
    get _ciudad() {
        return this.ciudad;
    }
    get _fechaNacimiento() {
        return this.fechaNacimiento;
    }
    set _id(id){
        this.id=id;
    }
}