export class User {
    private _id;
    private _status;
    constructor(private _name: string, private _userName: string, private _password: string, id= undefined) {
        this._id = id;
    }

    set id(__id) {
        this._id = __id;
    }
    get id() {
        return this._id;
    }
    get name() {
        return this._name;
    }

    get userName() {
        return this._userName;
    }

    get password() {
        return this._password;
    }

    get status() {
        return this._status;
    }
}