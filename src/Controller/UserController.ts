import { Request, Response } from 'express'
import { UserBusiness } from '../Business/UserBusiness'
import { SingUpInputGenerecDTO } from '../types/types'

export class UserController {
    constructor(private userBusiness: UserBusiness) {}

    signup = async (req: Request, res: Response): Promise<void> => {
        try{
            const input: SingUpInputGenerecDTO = req.body
            const token = await this.userBusiness.signup(input)
            res.status(200).send({ token })
        } catch(err: any){
            res.status(err.statusCode || 400).send({ error: err.message })
        }
    }

    login = async (req: Request, res: Response): Promise<void> => {
        try{
            const { email, password } = req.body
            const token = await this.userBusiness.login({ email, password })
            res.status(200).send({ token })
        }catch(err: any){
            res.status(err.statusCode || 400).send({ error: err.message })
        }
    }
}