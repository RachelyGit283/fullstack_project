require("dotenv").config()
const express = require("express")
const cors = require("cors")
const corsOptions = require("./config/corsOptions")
const connectDB = require("./config/connectdb")
const mongoose = require('mongoose')
const PORT = process.env.PORT || 7000
const app = express()
app.use(cors(corsOptions))

app.use(express.json())
app.use("/api/users",require("./routes/usersRout"))
 app.use("/api/todos",require("./routes/todosRout"))
 app.use("/api/posts",require("./routes/postsRout"))
 app.use("/api/auth", require("./routes/authRoutes"))
//app.use("/api/photo",require("./routes/photoRout"))
connectDB()
app.use(express.static("public"))
app.get("/",(req,res)=>{res.send("home")})
mongoose.connection.once('open',()=>{
    console.log('Connected to MongoDB')
    app.listen(PORT, ()=>{
        console.log(`Server running on port ${PORT}`)
        })
})
mongoose.connection.once('error',arr=>
    {console.log(arr)})