import User from './User'
import Student from './Student'
import Visitor from './Visitor'

export interface IUserData {
    selectUserByEmail(email: string): Promise<User | null>
    selectUserByRegistration(registration: string): Promise<Student | null>
    insertStudent(student: Student): Promise<void>
    insertVisitor(visitor: Visitor): Promise<void>
}