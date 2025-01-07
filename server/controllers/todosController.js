const Todos = require("../models/Todos");
        // creat1
const createNewTodos = async (req, res) => {
        const {title, tags} = req.body
        if (!title) { 
        return res.status(400).json({ message: 'title is required' })}
        const todos = await Todos.create({ title, tags})
        if (todos) { 
            const todos2 = await Todos.find().lean()
            if (!todos2?.length) {
                return res.status(400).json({ message: 'No todos found' })
                }
            return res.status(201).json(todos2)
        } else {
        return res.status(400).json({ message: 'Invalid todos' })}}
        //readf1
const getAllTodos = async (req, res) => {
        const todos = await Todos.find().lean()
        console.log(todos);
        if (!todos?.length) {
        return res.status(400).json({ message: 'No todos found' })
        }
        res.json(todos)
        }
//1
 const getTodoByComp = async (req, res) => {
            const title = req.body
            const todo = await Todos.find(title).lean()
            if (!todo) {
            return res.status(400).json({ message: 'No todo' })
            }
            res.json(todo)
            }
            //1
const updateTodos = async (req, res) => {
    const {id}=req.params
    const {title, tags, completed}= req.body
    if (!id ) {
    return res.status(400).json({ message: 'field is required'})
    }
    const todos = await Todos.findById(id).exec()
    if (!todos) {
    return res.status(400).json({ message: 'todo not found' })
    }
    title?todos.title = title:todos.title
    tags?todos.tags = tags:todos.tags
    completed?todos.completed = completed:todos.completed 
    const updateTodo = await todos.save()
    const todos2 = await Todos.find().lean()
            if (!todos2?.length) {
                return res.status(400).json({ message: 'No todos found' })
                }
            return res.status(201).json(todos2)
   
    }
    //update complite1
    const updateCompTodos = async (req, res) => {
        const {id}= req.params
        if (!id ) {
        return res.status(400).json({ message: 'field is required'})
        }
        const todos = await Todos.findById(id).exec()
        if (!todos) {
        return res.status(400).json({ message: 'todo not found' })
        }
        todos.completed=todos.completed?false:true;
        const updateCompTodos = await todos.save()
        const todos2 = await Todos.find().lean()
        if (!todos2?.length) {
            return res.status(400).json({ message: 'No todos found' })
            }
            res.json(todos2)
        
        }
 //delet1
const deleteTodo = async (req, res) => {
const { id } = req.params
    const todo = await Todos.findById(id).exec()
    if (!todo) {
    return res.status(400).json({ message: 'todo not found' })
    }
    const result = await todo.deleteOne()
    const todos = await Todos.find().lean()
    if (!todos?.length) {
        return res.json([])
        }
        res.json(todos)
    }

    module.exports = {
        deleteTodo,
        createNewTodos,
        getAllTodos,
        updateTodos,
        updateCompTodos,
        getTodoByComp
      
        }