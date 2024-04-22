import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { db } from './Data/connection'
import { userRouter } from './routes/userRouter'
import { tableRouter } from './routes/tableRouter'
import { projectRouter } from './routes/projectRouter'
import { AddressInfo } from 'net'

const app = express()

app.use(express.json())
app.use(cors())

app.use((req, res, next) => {
  console.log(`Recebido ${req.method} em ${req.url}`)
  next()
})

app.use('/user/', userRouter)
app.use('/table/', tableRouter)
app.use('/project/', projectRouter)

app.get('/', async(req, res) => {
  try{
    const email = 'TESTE@EMAIL.COM'
    const r = await db('usuario').where('email', 'email')
    console.log(r)
    res.send(r)
  }catch(err){
    throw new Error(err.message)
  }

})

app.all("*", (req, res) => {
  res.status(404).send(`Não encontrado: ${req.method} ${req.url}`);
})

const server = app.listen(process.env.PORT || 3003, () => {
  if (server) {
    const address = server.address() as AddressInfo
    console.log(`Server is running in http://localhost:${address.port}`)
  } else {
    console.error(`Failure upon starting server.`)
  }
})