const express = require("express")
const router = express.Router()
const User = require("../models/users")
const auth = require('../middleware/auth')

router.post('/login', async (req, res) => {
    try {
        const user = await User.FindByCredentials(req.body.email, req.body.password)
        const token = await user.GenerateAuthToken()
		
        res.status(200).send( {data:{ ...user.toJSON(), token }})
    }
    catch (e) {
        res.status(400).send(e.message)
    }
})

router.post('/register', async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        const token = await user.GenerateAuthToken()
        user.token = token
        res.status(201).send({data:{ ...user.toJSON(), token }})

    } catch (e) {
        console.log(e)
        res.status(400).send(e.message)
    }

})

router.get('/me', auth, async (req, res) => {
    try {
        res.status(200).send({ data: req.user })

    } catch (e) {
        console.log(e)
        res.status(400).send(e.message)
    }

})

module.exports = router 