import express from 'express'
import { ProjectController } from '../Controller/ProjectController'
import { ProjectBusiness } from '../Business/ProjectBusiness'
import ProjectData from '../Data/ProjectData'

export const projectRouter = express.Router()

const projectBusiness = new ProjectBusiness(new ProjectData())
const projectController = new ProjectController(projectBusiness)

projectRouter.get('/:id/', projectController.getProjectById)
projectRouter.post('/add/', projectController.addProject)