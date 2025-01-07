const User = require("../models/Users")
const bcrypt= require('bcrypt')
const login = async (req,res)=>{ 
    const { username, password } = req.body
    if (!username || !password) {
        return res.status(400).json({message:'All fields are required'})
        }
    const foundUser = await User.findOne({username}).lean()
    if (!foundUser || !foundUser.active) {
        return res.status(401).json({ message: 'Unauthorized1' })
        }
    const match = await bcrypt.compare(password, foundUser.password)
    if(!match){return res.status(401).json({message:'Unauthorized2' })
     }
     const userInfo= {_id:foundUser._id,name:foundUser.name,
        username:foundUser.username,
        email:foundUser.email}
const accessToken=jwt.sign(userInfo,process.env.ACCESS_TOKEN_SECRET)
res.json({accessToken:accessToken})
}
const register = async (req,res)=>{
    const {username, password, name, email, phone} = req.body
    if (!name || !username || !password) {
        return res.status(400).json({message:'All fields are required'})
        }
        const duplicate = await User.findOne({username:username}).lean()
        if(duplicate){
        return res.status(409).json({message:"Duplicate username"})
        }
        const hashedPwd = await bcrypt.hash(password, 10)
        const userObject= {name,email,username,phone,password:hashedPwd}
        const user = await User.create(userObject)
        if (user) { 
        return res.status(201).json({message:`New user ${user.username}
        created` })
        } else {
        return res.status(400).json({message:'Invalid user received'})
        }
        }
module.exports = {login, register}