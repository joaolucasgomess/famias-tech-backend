import { IProjectData } from '../model/InterfaceProjectData'
import { CustomError } from '../Utils/CustomError'
import { Authenticator } from '../services/Authenticator'
import { generatedId } from '../services/idGenerator'
import Project from '../model/Project'

export class ProjectBusiness {
    private projectData: IProjectData
    private authenticator: Authenticator

    constructor(projectDataRepository: IProjectData) {
        this.projectData = projectDataRepository
        this.authenticator = new Authenticator()
    }

    getProjectById = async(token: string, id: string) => {
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
    
            const project = this.projectData.selectProjectById(id)
    
            if(!project){
                throw new CustomError('Projeto não encontrado', 404)
            }
    
            return project

        }catch(err: any) {
            throw new CustomError(err.message, err.statusCode)
        }  

    }

    addProject = async(token: string, project: { name: string, description: string, url: string, idTable: string }) => {
        try{
            if(!token){
                throw new CustomError("Token inexistente", 442)
            }

            const tokenData = this.authenticator.getTokenData(token)

            if(!tokenData){
                throw new CustomError("Token inválido", 401)
            }

            if(tokenData.role != 'aluno'){
                throw new CustomError('Apenas alunos podem adicionar projetos', 403)
            }

            const { name, description,  url, idTable } = project

            if(!name || !description || !url || !idTable){
                throw new CustomError('Campos faltantes ou inválidos', 422)
            }

            const projectByUrl = await this.projectData.selectProjectByUrl(url)

            if(projectByUrl){
                throw new CustomError('Projeto ja cadastrado', 409)
            }

            const projectByIdTable = await this.projectData.selectProjectByIdTable(idTable)

            if(projectByIdTable){
                throw new CustomError('Mesa selecionada já contém um projeto.', 403)
            }

            const id = generatedId()
            const newProject = new Project(
                id,
                name,
                description,
                url,
                tokenData.id,
                idTable
            )
            await this.projectData.insertProject(newProject)

        }catch(err: any) {
            throw new CustomError(err.message, err.statusCode)
        }  
    }
}