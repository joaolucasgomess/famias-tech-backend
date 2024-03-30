import { Request, Response } from 'express'
import { TableBusiness } from '../Business/TableBusiness'

export class TableController {
    constructor(private tableBusiness: TableBusiness){}

    getAllTables = async(req: Request, res: Response) => {
        try{
            const token = req.headers.authorization as string
            const allTables = await this.tableBusiness.getAllTables(token)
            res.status(200).send({ allTables })
        }catch(err: any){
            res.status(err.statusCode || 400).send({ error: err.message })
        }
    }

    checkVisit = async(req: Request, res: Response) => {
        try{
            const token = req.headers.authorization as string
            const { id } = req.params
            await this.tableBusiness.checkVisit(token, id)
            res.status(201).send('Mesa visitada')
        }catch(err: any){
            res.status(err.statusCode || 400).send({ error: err.message })
        }
    }
}