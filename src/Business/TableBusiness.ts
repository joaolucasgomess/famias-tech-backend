import { ITableData } from '../model/InterfaceTableData'
import Table from '../model/Table'
import { Authenticator } from '../services/Authenticator'
import { CustomError } from '../Utils/CustomError'

export class TableBusiness {

    private tableData: ITableData
    private authenticator: Authenticator

    constructor(tableRepository: ITableData) {
        this.tableData = tableRepository
        this.authenticator = new Authenticator()
    }

    getAllTables = async(token: string) => {
        try{
            if(!token){
                throw new CustomError("Token inexistente", 442)
            }

            const tokenData = this.authenticator.getTokenData(token)

            if(!tokenData){
                throw new CustomError("Token inválido", 401)
            }

            const allTables = await this.tableData.selectAllTables(tokenData.id)

            const filteredTables = allTables.filter((table, index) => {
                if(index == 0){
                    return table 
                }else if(table.id != allTables[index - 1].id){
                    return table
                }
            })

            return filteredTables

        }catch(err: any) {
            throw new CustomError(err.message, err.statusCode)
        }   
    }

    checkVisit = async(token: string, id: string) => {
        try{
            if(!token){
                throw new CustomError('Token inexistente', 442)
            }

            const tokenData = this.authenticator.getTokenData(token)

            if(!tokenData){
                throw new CustomError('Token inválido', 401)
            }

            if(tokenData.role != 'visitante'){
                throw new CustomError('Apenas visitantes tem permissão para marcar mesas como visitadas!', 403)
            }

            if(!id){
                throw new CustomError('Campos faltantes ou inválidos', 422)
            }

            const tableExists = await this.tableData.selectTableById(id)
              
            if(!tableExists){
                throw new CustomError('Mesa não existe', 404)
            }

            const tableChecked = await this.tableData.selectCheckedTableById(id, tokenData.id)

            if(tableChecked){
                await this.tableData.deleteCheckVisit(id, tokenData.id)
                return 'Visita à mesa cancelada!' 
            }else{
                await this.tableData.insertCheckVisit(id, tokenData.id)
                return 'Mesa visitada!' 
            }               
            
        }catch(err: any) {
            throw new CustomError(err.message, err.statusCode)
        } 
    }
}