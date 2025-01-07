const Users = require("../models/Users");
        // creat
const createNewUsers = async (req, res) => {
        const {name, username, email, address, phone} = req.body
        if (!name||!email||!username) { 
        return res.status(400).json({ message: 'name or username or email are required' })}
   
        const user = await Users.create({ name, username, email, address, phone })
        if (user) { 
                const users2 = await Users.find().lean()
        if (!users2?.length) {
        return res.status(400).json({ message: 'No users found' })
        }
        return res.status(201).json(users2)
       
        } 
        else {
        return res.status(400).json({ message: 'Invalid user ' })}}
        //read
const getAllUsers = async (req, res) => {
        const users = await Users.find().lean()
        if (!users?.length) {
        return res.status(400).json({ message: 'No users found' })
        }
        console.log(users);
        res.json(users)
        }
const getFilterUsers = async (req, res) => {
        const {obj} = req.params
        const users = await Users.find({name:obj}).lean()
        if (!users?.length) {
        return res.status(400).json({ message: 'No users found' })
        }
        res.json(users)
        }
const getUserById = async (req, res) => {
        const {id} = req.params
        const user = await Users.findById(id).lean()
        if (!user) {
        return res.status(400).json({ message: 'No user' })
        }
        res.json(user)
        }
 const getUserByEmail = async (req, res) => {
            const email = req.body
            const user = await Users.find(email).lean()
            if (!user) {
            return res.status(400).json({ message: 'No user' })
            }
            res.json(user)
            }

const updateUser = async (req, res) => {
        console.log("kkkkkkkkk");
    const {id}=req.params
    const {name, username, email, address, phone}= req.body
    if (!id || !email ) {
    return res.status(400).json({ message: 'fields are required'})
    }
    const user = await Users.findById(id).exec()
    if (!user) {
    return res.status(400).json({ message: 'User not found' })
    }
    name?user.name = name:user.name
   user.email = email
    address?user.address = address:user.address
    phone?user.phone = phone:user.phone
    const updateUsers = await user.save()
    const users2 = await Users.find().lean()
    if (!users2?.length) {
    return res.status(400).json({ message: 'No users found' })
    }
    res.json(users2)   
 }
//delet
const deleteUser = async (req, res) => {
    const { id } = req.params
    const user = await Users.findById(id).exec()
    if (!user) {
    return res.status(400).json({ message: 'user not found' })
    }
    const result = await user.deleteOne()
    const reply=`user  ID ${user._id} deleted`
    const users2 = await Users.find().lean()
        if (!users2?.length) {
        return res.status(400).json({ message: 'No users found' })
        }
        res.json(users2)
    }

    module.exports = {
        createNewUsers,
        getAllUsers,
        getUserById,
        updateUser,
        getUserByEmail,
        deleteUser,
        getFilterUsers
      
        }