const {Router} = require('express')
const bcrypt = require('bcrypt')
const {check, validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('config')
const User = require('../models/User')
const router = Router()

// /api/auth/register
router.post(
    '/register',
    [
        check('email', 'неккорректный майл').isEmail(),
        check('password', 'минимальная длинна 6 символов').isLength({min: 6})
    ],
    async (req, res)=>{
    try {
        const err = validationResult(req)
        if(!err.isEmpty()){
            return req.status(400).json({
                err: err.array(),
                message: 'Данные неверны'
            })
        }

        const {email, password} = req.body

        const candidate = await User.findOne({email})

        if(candidate){
            //console.log('hi')
            return res.status(400).json({message: 'такой пользователь уже есть'})
        }

        //const hashPassword = password//await bcrypt.hash(password, 111)//IDK with bcr hash
        const hashPassword = bcrypt.hashSync(password, 10);
        const user = new User({email, password: hashPassword})
        await user.save()

        res.status(201).json({message: 'Пользователь создан'})
    }
    catch (e){
        res.status(500).json({message: `Error: ${e.message}`})
    }
})

// /api/auth/login
router.post(
    '/login',
    [
        check('email', 'неккорректный майл').normalizeEmail().isEmail(),
        check('password', 'минимальная длинна 6 символов').exists()
    ],
    async (req, res)=>{
    try {
        const err = validationResult(req)
        if(!err.isEmpty()){
            return req.status(400).json({
                err: err.array(),
                message: 'Данные неверны'
            })
        }

        const {email, password} = req.body
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({message: 'пользователь не существует'})
        }

        const isMuch = await bcrypt.compare(password, user.password)

        if(!isMuch){
            return res.status(400).json({message: 'Неверный пароль'})
        }

        const token = jwt.sign(
            {userId: user.id},
            config.get('jwt'),
            {expiresIn: '1h'}
        )

        res.json({token, userId: user.id})
    }
    catch (e){

    }
})

module.exports  = router