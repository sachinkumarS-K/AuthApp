const mongoose = require("mongoose") ;
require("dotenv").config();

exports.dbConnect = async() => {
    try {
        const {connection} = await mongoose.connect(process.env.MONGO_URI , {
            useNewUrlParser : true,
            useUnifiedTopology : true
        });
        // if(!connection){
        //     throw new Error("connetion not establish")
        // }
        console.log(`connection successfull ${connection.name}`);
    } catch (error) {
        console.log(error.message);
    }
}

// const mongoose = require("mongoose");
// require("dotenv").config()

// const dbConnect = async() => {
//    try {
//       const {connection} =  await mongoose.connect(process.env.MONGO_URI , {
//            useNewUrlParser: true,
//            useUnifiedTopology: true
//        });

//        console.log(`DATABASE CONNECTED SUCCESSFULLY .. ${connection.name}`);

       
//    } catch (error) {
//        console.error("ERROR : ", error.message);
//        process.exit(1);
//        //throw error ;
//    }
// }

// module.exports = {dbConnect} ;