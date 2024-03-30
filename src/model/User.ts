export default class User {

    private _id: string
    private _name: string
    private _email: string
    private _password: string

    constructor(
        _id: string,
        _name: string,
        _email: string,
        _password: string
    ){
        this._id = _id
        this._name = _name
        this._email = _email
        this._password = _password
    }

    public get password(): string {
        return this._password
    }
    public set password(value: string) {
        this._password = value
    }
    public get email(): string {
        return this._email
    }
    public set email(value: string) {
        this._email = value
    }
    public get name(): string {
        return this._name
    }
    public set name(value: string) {
        this._name = value
    }
    public get id(): string {
        return this._id
    }
    public set id(value: string) {
        this._id = value
    }
}
