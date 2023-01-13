
const express = require("express")
require("dotenv").config()
const cors = require('cors')
const { connection } = require("./config/db")
const { authenticate } = require("./Middleware/authenticate.middleware")
const { noteRoute } = require("./Routes/Note.route")
const {userRoute}=require("./Routes/User.route")


const app = express()
app.use(express.json())
app.use(cors())

app.use("/users",userRoute)
app.use(authenticate)
app.use("/notes",noteRoute)


app.get("/", async (req, res) => {


    res.send("this is home page")
})



app.listen(process.env.port, async () => {
    try {
        await connection
        console.log("Connected to data base")

    } catch (err) {
        console.log("Error while connectiing DB")
        console.log(err)

    }
    console.log(`Port is Running on ${process.env.port}`)
})