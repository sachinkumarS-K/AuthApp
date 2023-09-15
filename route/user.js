const express = require("express");
const { login, signup, getUser, dummy } = require("../controller/auth");
const { jwtAuth, check } = require("../middleware/jwtAuth");

const router = express.Router();

router.get("/demoo" , (req , res) => {
    res.send("dummy route")
})
router.post("/login" , login);
router.post("/signup" , signup);
 router.get("/getuser" ,jwtAuth, getUser);
 router.get("/demo" , check ,dummy);



module.exports = router ;

//qkybjcgkwycjcnbr