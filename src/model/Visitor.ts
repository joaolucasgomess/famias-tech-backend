import User from './User'

export default class Visitor extends User {
    
    private _id_visitor: string
    private _office: string
    private _id_company: string

    constructor(
        _id: string,
        _name: string,
        _email: string,
        _password: string,
        _id_visitor: string,
        _office: string,
        _id_company: string
    ){
        super(_id, _name, _email, _password)
        this._id_visitor = _id_visitor
        this._office = _office
        this._id_company = _id_company
    }

    public get id_visitor(): string {
        return this._id_visitor
    }
    public set id_visitor(value: string) {
        this._id_visitor = value
    }
    public get office(): string {
        return this._office
    }
    public set office(value: string) {
        this._office = value
    }
    public get id_company(): string {
        return this._id_company
    }
    public set id_company(value: string) {
        this._id_company = value
    }
}