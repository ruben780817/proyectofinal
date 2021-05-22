class Person {
    //Atributos publicos
    id = 10;
    //Atributos estáticos
    static peopleNumber = 0;
    constructor(firstName, lastName) {
        //Atributos Privados
        this._firstName = firstName;
        this._lastName = lastName;
    }
    //Métodos en JS todos son públicos
    get firstName() {
        return this._firstName;
    }
}

module.exports = {Person};