const express  = require("express")
const bcrypt = require("bcryptjs")
const User = require('../Models/user.model')

const router = express.Router();

router.post("/signup",async (req,res)=>{
    try {
        const {name, email, password } = req.body;

        let user = await User.findOne({email})
        if(user)  return res.status(400).json({ msg: 'User already exists' });
        const hashedpassword = await bcrypt.hash(password,10)
        user = new User({name , email , password: hashedpassword})
        await  user.save();
        res.status(201).json({ msg: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ msg: 'Server error' ,error:error.message});
    }
})
module.exports = router