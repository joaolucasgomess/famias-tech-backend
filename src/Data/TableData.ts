import { ITableData } from '../model/InterfaceTableData'
import { db } from './connection'
import Table from '../model/Table'

export default class TableData implements ITableData {

    selectAllTables = async(id_user: string): Promise<Table[]> => {
        try{
            const result = await db('mesa as m')
                .leftJoin('mesa_visitada as mv', 'm.id_mesa', 'mv.id_mesa')
                .where('mv.id_usuario', id_user)
                .orWhere('mv.id_usuario', null)

            const allTables = result.map((table) => {
                if(table.id_usuario == id_user){
                    return new Table(
                        table.id_mesa,
                        table.numero_mesa,
                        true
                    )
                }else{
                    return new Table(
                        table.id_mesa,
                        table.numero_mesa,
                        false
                    )
                }
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

    selectCheckedTableById = async(id_table: string, id_user: string): Promise<{id_table: string, id_user: string} | null> => {
        try{
            const result = await db('mesa_visitada')
                .where('id_mesa', id_table)
                .andWhere('id_usuario', id_user)

                if(!result.length){
                    return null
                }

                return {
                    id_table: result[0].id_mesa,
                    id_user: result[0].id_usuario
                }

        }catch(err: any){
            throw new err(err.slqMessage || err.message)
        }
    }
     
    insertCheckVisit = async(id_table: string, id_user: string): Promise<void> => {
        try{
            await db('mesa_visitada')
                .insert({
                    id_mesa: id_table,
                    id_usuario: id_user
                })
        }catch(err: any){
            throw new err(err.slqMessage || err.message)
        }
    }

    deleteCheckVisit = async(id_table: string, id_user: string): Promise<void> => {
        try{
            await db('mesa_visitada')
                .where('id_mesa', id_table)
                .andWhere('id_usuario', id_user)
                .del()
        }catch(err: any){
            throw new err(err.slqMessage || err.message)
        }
    }
}