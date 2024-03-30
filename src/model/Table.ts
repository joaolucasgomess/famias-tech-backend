export default class Table {

    public get id(): string {
        return this._id
    }
    public set id(value: string) {
        this._id = value
    }
    public get number(): number {
        return this._number
    }
    public set number(value: number) {
        this._number = value
    }

    constructor(
        private _id: string,
        private _number: number
    ){}
}