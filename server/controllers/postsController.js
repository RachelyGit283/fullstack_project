const Posts = require("../models/Posts");
        // creat1
const createNewPosts = async (req, res) => {
        const {title, body} = req.body
        if (!title) { 
        return res.status(400).json({ message: 'title is required' })}
        const posts = await Posts.create({ title, body })
        if (posts) {
         const posts2 = await Posts.find().lean()
                 if (!posts2?.length) {
                return res.status(400).json({ message: 'No posts found' })
                }
         return res.status(201).json(posts2)
         
        } else {
        return res.status(400).json({ message: 'Invalid posts ' })}}
        //read1
const getAllPosts = async (req, res) => {
        const posts = await Posts.find().lean()
        if (!posts?.length) {
        return res.status(400).json({ message: 'No posts found' })
        }
        res.json(posts)
        }
//update title1
const getPostsByt = async (req, res) => {
    const title = req.body
    const posts = await Posts.find(title).lean()
    if (!posts) {
    return res.status(400).json({ message: 'No Posts' })
    }
    res.json(posts)
    }
//1
const updatePosts = async (req, res) => {
    const {id}=req.params
    const {title,body}= req.body
    if (!id ) {
    return res.status(400).json({ message: 'field is required'})
    }
    const posts = await Posts.findById(id).exec()
    if (!posts) {
    return res.status(400).json({ message: 'post not found' })
    }
    title?posts.title = title:posts.title
    body?posts.body = body:posts.body
    const updatePost = await posts.save()
    const posts2 = await Posts.find().lean()
    if (!posts2?.length) {
        return res.status(400).json({ message: 'No posts found' })
        }
    return res.status(201).json(posts2)
    }
 //delet1
const deletePosts = async (req, res) => {
    const { id } = req.params
    const posts = await Posts.findById(id).exec()
    if (!posts) {
    return res.status(400).json({ message: 'posts not found' })
    }
    const result = await posts.deleteOne()
    const reply=`posts '${posts.title}' ID ${posts._id} deleted`
    const posts2 = await Posts.find().lean()
    if (!posts2?.length) {
    return res.status(400).json({ message: 'No posts found' })
    }
    res.json(posts2)
    }

    module.exports = {
        createNewPosts,
        getAllPosts,
        updatePosts,
        getPostsByt,
        deletePosts
        }