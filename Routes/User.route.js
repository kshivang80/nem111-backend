const express = require("express")
const { UserModel } = require("../model/User.model")
var jwt = require('jsonwebtoken');
require("dotenv").config()
const bcrypt = require('bcrypt')


const userRoute=express.Router()




userRoute.post("/register", async (req, res) => {
    const { email, pass, name, age } = req.body
    try {
        //for encripting password
        bcrypt.hash(pass, 5, async (err, newsecure_password) => {
            // Store hash in your password DB.
            if (err) {
                console.log(err)
            } else {

                const user = new UserModel({ email, pass: newsecure_password, name, age })
                await user.save()
                res.send("register")
            }
        });

    } catch (err) {
        res.send("error is coming while register")
        console.log(err)

    }

})

//login

userRoute.post("/login", async (req, res) => {
    const { email, pass } = req.body

    try {

        const user = await UserModel.find({ email })
        const hashed_pass= user[0].pass
        if (user.length > 0) {
            bcrypt.compare(pass, hashed_pass, (err, result) => {
              //random payload change to userid
                if (result) {
                    const token = jwt.sign({userID:user[0]._id},process.env.key);
                    res.send({"msg":"Login Successfully","token":token})

                } else {
                    res.send("Wrong Credintal")
                }
            })

        } else {
            res.send("Wrong Credintal")
        }

    } catch (err) {
        console.log("Error while login");
        console.log(err);
    }

})


module.exports={
    userRoute
}