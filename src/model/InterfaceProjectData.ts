import Project from './Project'

export interface IProjectData {
    selectProjectById(id: string): Promise<Project | null>
    selectProjectByUrl(url: string): Promise<Project | null>
    insertProject(project: Project): Promise<void>
}