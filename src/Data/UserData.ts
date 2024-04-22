import { db } from './connection'
import { IUserData } from '../model/InterfaceUserData'
import User from '../model/User'
import Student from '../model/Student'
import Visitor from '../model/Visitor'

export default class UserData implements IUserData {

    selectUserByEmail = async(email: string) : Promise<User | null> => {
        try{
            const result = await db('usuario')
                .where('email', email)
                
            if(!result.length){
                return null
            }

            return new User(
                result[0].id_usuario,
                result[0].nome,
                result[0].email,
                result[0].senha,
                result[0].tipo_usuario  
            )

        }catch(err: any){
            throw new err(err.slqMessage || err.message)
        }
    }

    selectUserByRegistration = async(registration: string): Promise<Student | null> => {
        try{
            const result = await db('aluno as a')
                .join('usuario as u', 'a.id_usuario', '=' , 'u.id_usuario')
                .where('a.matricula', registration)
                

            if(!result.length){
                return null
            }

            return new Student(
                result[0].id_usuario,
                result[0].nome,
                result[0].email,
                result[0].senha,
                result[0].tipo_usuario,
                result[0].id_aluno,
                result[0].matricula   
            )

        }catch(err: any){
            throw new err(err.slqMessage || err.message)
        }
    }

    insertStudent = async(student: Student): Promise<void> => {
        try{
            await db.transaction(async (trx) => {
                await trx('usuario')
                    .insert({
                        id_usuario: student.id,
                        nome: student.name,
                        email: student.email,
                        senha: student.password,
                        tipo_usuario: student.role
                    })

                await trx('aluno')
                    .insert({
                        id_aluno: student.id_student,
                        matricula: student.registration,
                        id_usuario: student.id
                    })
            })

        }catch(err: any){
            throw new err(err.slqMessage || err.message)
        }
    }

    insertVisitor = async(visitor: Visitor): Promise<void> => {
        try{
            await db.transaction(async (trx) => {
                await trx('usuario')
                    .insert({
                        id_usuario: visitor.id,
                        nome: visitor.name,
                        email: visitor.email,
                        senha: visitor.password,
                        tipo_usuario: visitor.role
                    })
                await trx('visitante')
                    .insert({
                        id_visitante: visitor.id_visitor,
                        cargo: visitor.office,
                        id_empresa: visitor.id_company,
                        id_usuario: visitor.id
                    })
            })
        }catch(err: any){
            throw new err(err.slqMessage || err.message)
        }
    }
}