import express from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const app = express()
app.use(express.json())

// ROTA GET 
app.get('/usuarios', async (req, res) => {

    const users = await prisma.user.findMany()


    res.status(200).json(users)
})


//  ROTA POST
app.post('/usuarios', async (req, res) => {

    const user = await prisma.user.create({
        data: {
            email: req.body.email,
            age: req.body.age,
            name: req.body.name
        }
    })

    res.status(201).json(user)
})


//  ROTA PUT
app.put('/usuarios/:id', async (req, res) => {

    

    const user = await prisma.user.update({
        where: {
            id: req.params.id
        },
        data: {
            email: req.body.email,
            age: req.body.age,
            name: req.body.name
        }
    })

    res.status(201).json(user)
})

//  ROTA DELETE
app.delete('/usuarios/:id', async (req, res) => {
    await prisma.user.delete({
        where: {
            id: req.params.id,
        }
    })

    res.status(200).json({ message: 'Usuario deletado com sucesso!' })

})

app.listen(3000, () => {
    console.log('🚀 Server started on port 3000')
})    // PORTA PARA RODAR O CODIGO, NÃO PODE SER USSADA EM OUTRO CODIGO.
//http://localhost:3000