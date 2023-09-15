const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config()

const userSchema = new mongoose.Schema({
    name : {
        type : String ,
        required : true ,
        trim : true
    },
    email : {
        type : String ,
        required:true ,
        trim :  true
    },
    password : {
        type : String ,
        required:true ,
        select : false
    },
    role : {
        type : String ,
        enum : ["Admin" , "Student" , "Visitor"] 
    }
})

userSchema.methods = {
    jwtToken(){
        return jwt.sign( 
        {
            id :this._id ,name : this.name , email : this.email ,role : this.role
        },
        process.env.SECRET ,
        {expiresIn: "2h"}
        )
    }
}

module.exports = mongoose.model("user" , userSchema);


