const mongoose = require("mongoose");
const dBconnect = async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Db Connected")
    } catch (error) {
        console.log("DB connection issue");
        console.log(error);
    }
}
module.exports = dBconnect;
