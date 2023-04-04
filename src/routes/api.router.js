import { Router } from 'express'
import userModel from '../models/Users.model.js'

const router = Router()

router.post('/usuarios', async (req, res) => {
    const { first_name, last_name, email, age, password } = req.body
    const exists = await userModel.findOne({ email })
    if (exists) return res.status(422).json({ status: "error", error: "User already exists" })
    const user = {
        first_name,
        last_name,
        email,
        age,
        password 
    }
    await userModel.create(user)
    res.json({ status: "success", message: "User registered" })
})

router.post('/sesiones', async (req, res) => {
    const { email, password } = req.body
    const user = await userModel.findOne({ email, password }) 
    if (!user) return res.status(401).send({ status: "error", error: "Invalid credentials" })
    req.session['user'] = {
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        age: user.age
    }
    res.json({ status: "success", payload: req.session['user'], message: "¡Primer logueo realizado! :)" })
})

export default router