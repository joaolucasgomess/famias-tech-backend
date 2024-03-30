import { ProjectBusiness } from '../Business/ProjectBusiness'
import { Request, Response } from 'express'

export class ProjectController {
    constructor(private projectBusiness: ProjectBusiness){}

    getProjectById = async(req: Request, res: Response): Promise<void> => {
        try{
            const token = req.headers.authorization as string
            const { id } = req.params
            const project = await this.projectBusiness.getProjectById(token, id)
            res.status(200).send({ project })
        }catch(err){
            res.status(err.statusCode || 400).send({ error: err.message })
        }
    }

    addProject = async(req: Request, res: Response): Promise<void> => {
        try{
            const token = req.headers.authorization as string
            const { name, description, url, idTable } = req.body
            await this.projectBusiness.addProject(token, ({ name, description, url, idTable }))
            res.status(201).send('Projeto adicionado com sucesso')
        }catch(err){
            res.status(err.statusCode || 400).send({ error: err.message })
        }
    }
}