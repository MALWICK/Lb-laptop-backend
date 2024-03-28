const { default: mongoose } = require("mongoose")

const dbConnect = () => {
    try {
        // const connect = mongoose("mongodb+srv://admin:Sr83850G9iV8bZlF@cluster0.24hjfhx.mongodb.net/")
        const conn = mongoose.connect('mongodb://localhost:27017')
        console.log("connecting to mongoose successfully")
    } catch (error) {
        console.log(error, "Couldn't connect to Mongo");
    }
}

module.exports =dbConnect;