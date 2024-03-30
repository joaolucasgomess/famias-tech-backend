import { IUserData } from '../model/InterfaceUserData'
import { SingUpInputGenerecDTO } from '../types/types'
import { SingUpInputStudentDTO } from '../types/types'
import { SingUpInputVisitorDTO } from '../types/types'
import { CustomError } from '../Utils/CustomError'
import { generatedId } from '../services/idGenerator'
import { HashManager } from '../services/HashManager'
import { Authenticator } from '../services/Authenticator'
import Student from '../model/Student'
import Visitor from '../model/Visitor'
import User from '../model/User'

export class UserBusiness {

    private userData: IUserData
    private hashManager: HashManager
    private authenticator: Authenticator

    constructor(userDataRepository: IUserData){
        this.userData = userDataRepository
        this.hashManager = new HashManager()
        this.authenticator = new Authenticator
    }

    signup = async(input: SingUpInputGenerecDTO) => {
        try{
            const { name, email, password } = input

            if(!name || !email || !password){
                throw new CustomError('Campos faltantes ou inválidos', 422)
            }

            const registeredUser = await this.userData.selectUserByEmail(email)

            if(registeredUser){
                throw new CustomError('E-mail já cadastrado', 409)
            }

            if(input.registration){
                const { registration } = input
                return this.singUpStudent({ name, email, password, registration })
            }else if(input.id_company && input.office){
                const { id_company, office } = input
                return this.singUpVisitor({ name, email, password, office, id_company })
            }else{
                throw new CustomError('Tente novamente', 400)
            }
        }catch(err: any){
            throw new CustomError(err.message, err.statusCode)
        }
    }

    singUpStudent = async(input: SingUpInputStudentDTO) => {
        try{
            const { name, email, password, registration } = input
            
            const registeredStudent = await this.userData.selectUserByRegistration(registration)
            

            if(registeredStudent){
                console.log('parando a execução do código quando cai nesse erro')
                throw new CustomError('Aluno já registrado', 409)
            }

            const id = generatedId()
            const idStudent = generatedId()
            const hashedPassword = await this.hashManager.hash(password)
            const student = new Student(
                id,
                name,
                email,
                hashedPassword,
                idStudent,
                registration
            )
            
            await this.userData.insertStudent(student)
            const token = this.authenticator.generateToken({ id })
            return token
 
        }catch(err: any){
            throw new CustomError(err.message, err.statusCode)
        }
    }

    singUpVisitor = async(input: SingUpInputVisitorDTO) => {
        try{
            const { name, email, password, id_company, office } = input

            const id = generatedId()
            const idVisitor = generatedId()
            const hashedPassword = await this.hashManager.hash(password)
            const visitor = new Visitor(
                id,
                name,
                email,
                hashedPassword,
                idVisitor,
                office,
                id_company
            )
            await this.userData.insertVisitor(visitor)
            const token = this.authenticator.generateToken({ id })
            return token

        }catch(err: any){
            throw new CustomError(err.message, err.statusCode)
        }            
    }   

    login = async(input: {email: string, password: string}) => {
        try{
            const { email, password } = input

            if(!email || !password){
                throw new CustomError('Campos faltantes ou inválidos', 422)
            }

            const user = await this.userData.selectUserByEmail(email)

            if(!user){
                throw new CustomError('Usuário ainda não cadastrado', 404)
            }

            const passwordIsCorrect = await this.hashManager.compare(password, user.password)

            if(!passwordIsCorrect){ 
                throw new CustomError('Senha incorreta', 401)
            }

            const token = this.authenticator.generateToken({ id: user.id })
            return token

        }catch(err: any){
            throw new CustomError(err.message, err.statusCode)
        }
    }
}