import { ITableData } from '../model/InterfaceTableData'
import { db } from './connection'
import Table from '../model/Table'

export default class TableData implements ITableData {

    selectAllTables = async(): Promise<Table[]> => {
        try{
            const result = await db('mesa')

            const allTables = result.map((table) => {
                return new Table(
                    table.id_mesa,
                    table.numero_mesa
                )
            })

            return allTables
        }catch(err: any){
            throw new err(err.slqMessage || err.message)
        }
    }

    selectTableById = async(id: string): Promise<Table | null> => {
        try{
            const result = await db('mesa')
                .where('id_mesa', id)
               
            if(!result.length){
                return null
            }
           
           return new Table(
                result[0].id_mesa,
                result[0].numero_mesa
            )
        }catch(err: any){
            throw new err(err.slqMessage || err.message)
        }
    }
     
    insertCheckVisit = async(idTable: string, idUser: string): Promise<void> => {
        try{
            await db('mesa_visitada')
                .insert({
                    id_mesa: idTable,
                    id_usuario: idUser
                })
        }catch(err: any){
            throw new err(err.slqMessage || err.message)
        }
    }
}