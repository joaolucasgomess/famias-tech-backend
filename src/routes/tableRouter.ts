import express from 'express'
import { TableController } from '../Controller/TableController'
import { TableBusiness } from '../Business/TableBusiness'
import TableData from '../Data/TableData'

export const tableRouter = express.Router()

const tableBusiness = new TableBusiness(new TableData())
const tableController = new TableController(tableBusiness)

tableRouter.get('/', tableController.getAllTables)
tableRouter.put('/checkVisit/:id', tableController.checkVisit)