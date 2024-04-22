import User from './User'

export default class Student extends User {

    private _id_student: string
    private _registration: string

    constructor(
        _id: string,
        _name: string,
        _email: string,
        _password: string,
        _role: string,
        _id_student: string,
        _registration: string
    ){
        super(_id, _name, _email, _password, _role)
        this._id_student = _id_student
        this._registration = _registration
    }

    public get id_student(): string {
        return this._id_student
    }
    public set id_student(value: string) {
        this._id_student = value
    }
    public get registration(): string {
        return this._registration
    }
    public set registration(value: string) {
        this._registration = value
    }
}