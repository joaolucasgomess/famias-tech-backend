import Table from './Table'

export interface ITableData {
    selectAllTables(): Promise<Table[]>
    selectTableById(id: string): Promise<Table | null>
    insertCheckVisit(idTable: string, idUser: string): Promise<void>
}