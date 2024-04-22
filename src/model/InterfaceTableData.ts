import Table from './Table'

export interface ITableData {
    selectAllTables(id_user: string): Promise<Table[]>
    selectTableById(id: string): Promise<Table | null>
    selectCheckedTableById(id_table: string, id_user: string): Promise<{id_table: string, id_user: string} | null>
    insertCheckVisit(id_table: string, id_user: string): Promise<void>
    deleteCheckVisit(id_table: string, id_user: string): Promise<void>
}