const app = require("./index")

const connect = require("./configs/db")

app.listen(5000,async function(){
    try {
        await connect()
        console.log("listening to port 5000")
    } catch (error) {
        console.log(error.message)
    }
    
})