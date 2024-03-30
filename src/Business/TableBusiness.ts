import { ITableData } from '../model/InterfaceTableData'
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

            const allTables = this.tableData.selectAllTables()
            return allTables

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

            if(!id){
                throw new CustomError('Campos faltantes ou inválidos', 422)
            }

            const tableExists = await this.tableData.selectTableById(id)
            
           
            if(!tableExists){
                throw new CustomError('Mesa não existe', 404)
            }
            
            await this.tableData.insertCheckVisit(id, tokenData.id)                
            
        }catch(err: any) {
            throw new CustomError(err.message, err.statusCode)
        } 
    }
}