const jwt = require("jsonwebtoken");
require("dotenv").config();




exports.jwtAuth = async(req , res , next) => {
    const token =  req.cookies.token || req.header("Authorization").replace("Bearer" , "") ||null ;

    if(!token) {
        return res.status(400).json({
            success : false ,
            message : "Not authorized"
        });

    }
    try {
        
        const data = jwt.verify(token , process.env.SECRET);
        console.log(data)
        req.user = {name : data.name ,email : data.email , id : data.id} ;
        next();
       
    } catch (error) {
        return res.status(400).json({
            success : false ,
            message : "Notpass authorized",
            err : error
        });

    }
   
}

exports.check = (req , res , next) => {
    try {
        console.log("hello")
        console.log( req.cookies.token)
        const token =  req.cookies.token ;
        console.log(token)
        if(!token || token === undefined){
            return res.status(400).json({
                success : false ,
                message : "token not available",
                err : error
            });
        }
        next()
    } catch (error) {
        return res.status(400).json({
            success : false ,
            message : "token nott available",
            err : error
        });
    }
}