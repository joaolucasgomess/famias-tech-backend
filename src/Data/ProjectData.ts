import { IProjectData } from '../model/InterfaceProjectData'
import { db } from './connection'
import Project from '../model/Project'

export default class ProjectData implements IProjectData {

    selectProjectById = async(id: string): Promise<Project | null> => {
        try{
            const result = await db('projeto')
                .where('id_projeto', id)

            if(!result.length){
                return null
            }

            return new Project(
                result[0].id_projeto,
                result[0].nome_projeto,
                result[0].descricao_projeto,
                result[0].url_projeto,
                result[0].id_usuario,
                result[0].id_mesa
            )   
        }catch(err: any){
            throw new err(err.slqMessage || err.message)
        }

    }

    selectProjectByUrl = async(url: string): Promise<Project | null> => {
        try{
            const result = await db('projeto')
                .where('url_projeto', url)

            if(!result.length){
                
                return null
            }

            return new Project(
                result[0].id_projeto,
                result[0].nome_projeto,
                result[0].descricao_projeto,
                result[0].url_projeto,
                result[0].id_usuario,
                result[0].id_mesa
            )   
        }catch(err: any){
            throw new err(err.slqMessage || err.message)
        }
    }

    selectProjectByIdTable = async(id_table: string): Promise<Project | null> => {
        try{
            const result = await db('projeto')
                .where('id_mesa', id_table)

            if(!result.length){
                
                return null
            }

            return new Project(
                result[0].id_projeto,
                result[0].nome_projeto,
                result[0].descricao_projeto,
                result[0].url_projeto,
                result[0].id_usuario,
                result[0].id_mesa
            )   
        }catch(err: any){
            throw new err(err.slqMessage || err.message)
        }
    }

    insertProject = async(project: Project): Promise<void> => {
        try{
            await db('projeto')
                .insert({
                    id_projeto: project.id,
                    nome_projeto: project.name,
                    descricao_projeto: project.description,
                    url_projeto: project.url,
                    id_usuario: project.id_user,
                    id_mesa: project.id_table
                })
        }catch(err: any){
            throw new err(err.slqMessage || err.message)
        }
    }
}