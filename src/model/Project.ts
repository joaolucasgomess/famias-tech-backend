export default class Project {

    public get id(): string {
        return this._id
    }
    public set id(value: string) {
        this._id = value
    }
    public get name(): string {
        return this._name
    }
    public set name(value: string) {
        this._name = value
    }
    public get description(): string {
        return this._description
    }
    public set description(value: string) {
        this._description = value
    }
    public get url(): string {
        return this._url
    }
    public set url(value: string) {
        this._url = value
    }
    public get id_user(): string {
        return this._id_user
    }
    public set id_user(value: string) {
        this._id_user = value
    }
    public get id_table(): string {
        return this._id_table
    }
    public set id_table(value: string) {
        this._id_table = value
    }

    constructor(
        private _id: string,
        private _name: string,
        private _description: string,
        private _url: string,
        private _id_user: string,
        private _id_table: string
    ){}
}