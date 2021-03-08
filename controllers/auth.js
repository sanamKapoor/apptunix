const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Auth = require('../model/Auth');
const { validationResult } = require('express-validator');
require('dotenv').config()

exports.signUp = async (req, res) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            let msg = errors.errors[0].msg;
            return res.status(400).json(msg)
        }

        const { name, email, password } = req.body;
        const isExist = await Auth.findOne({ email })
        if(isExist){
            return res.json({ msg: "User already exist" })
        }

        const hashPwd = await bcrypt.hash(password, 12);
        if(!hashPwd){
            return res.json({ msg: "Something went wrong" })
        }

        const user = new Auth({
            name,
            email,
            password: hashPwd
        });
        await user.save();

        const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: process.env.EXP_TIME })

        res.status(201).json({ msg: "User created", token  })
    } catch (error) {
        return res.status(500).json({ msg: "Server Error" })
    }
}

exports.login = async (req, res) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            let msg = errors.errors[0].msg;
            return res.status(400).json(msg)
        }

        const { email, password } = req.body;
        const isExist = await Auth.findOne({ email })
        if(!isExist){
            return res.status(404).json({ msg: "User do not exist" })
        }

        const comparePwd = await bcrypt.compare(password, isExist.password);
        if(!comparePwd){
            return res.status(400).json({ msg: "Wrong Credentials" })
        }

        const token = jwt.sign({ id: isExist._id }, process.env.SECRET_KEY, { expiresIn: process.env.EXP_TIME })

        res.status(200).json({ msg: "Success Login", token  })
    } catch (error) {
        return res.status(500).json({ msg: "Server Error" })
    }
}