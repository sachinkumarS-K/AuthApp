const User = require("../model/userModel.js")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();


exports.login = async(req , res)=> {
   try {
    const { email , password } = req.body ;
    if(!email || !password) {
        return res.status(500).json({
            success : false ,
            message : "fill all the credientials"
        })
    }
    const user = await  User.findOne({email}).select("+password");

    if(!user){
        return res.status(500).json({
            success : false ,
            message : "User is not registered"
        })
    }
    const payLoad = {
        email : user.email,
        id : user._id ,
        role : user.role,
        name : user.name
    }

    if(await bcrypt.compare(password , user.password)){
    //     let token = jwt.sign(
    //         payLoad ,
    //         process.env.SECRET ,
    //         {expiresIn: "2h"}
    //     );
        const token = user.jwtToken();

        const options = {
            expires : new Date(Date.now() + 3*24*60*60*1000),
            httpOnly : true
        }
        user.password = undefined ;
        res.cookie("token" , token , options).status(200).json({
            success : true ,
            token ,
            user ,
            message : "User LoggedIn Successfully"
        })


    }
    else{
        return res.status(500).json({
            success : false ,
            message : "Password Incorrect"
        })
    }
   } catch (error) {
    return res.status(500).json({
        success : false ,
        message : error.message
    })
   }

}



exports.signup = async(req , res)=> {
    try {
        const {name ,email , password ,role} = req.body ;
        const userCheck = await User.findOne({email}).select('+password') ;
         
        if(userCheck){
            return res.json({
                success : false ,
                message : "user already exists"
            })
        }
        let hashedPassword ;
        try {
            hashedPassword = await bcrypt.hash(password , 10) ;
        } catch (error) {
            return res.status(500).json({
                success : false ,
                message : "Error in hashing password"
            })
        }

        const createUser = new User({name , email , password:hashedPassword , role});

        const savedUser = await createUser.save() ;

        return res.status(200).json({
            success : true ,
            data : savedUser
        })

        // res.json({
        //     data : req.body
        // })
    } catch (error) {
        return res.status(500).json({
            success : false ,
            message : error.message
        })
    }
}

exports.getUser = async(req , res) => {
     console.log(req.user)
    res.status(200).json({
        id : req.user.id,
        name : req.user.name ,
        email : req.user.email

    })
}

exports.dummy = (req , res) => {
    console.log("helooo")
    res.send("dummy protected route");
}