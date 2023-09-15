const app = require("./app");


const port = process.env.PORT ;

app.get("/" , (req , res)=>{
    console.log(`home page`);
    res.send(`<h1> HOME PAGE </h1>`)
})

app.listen(port , ()=>{
    console.log(`server is running on port ${port}`);
});

