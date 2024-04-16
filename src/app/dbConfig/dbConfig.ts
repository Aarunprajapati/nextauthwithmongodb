import mongoose from "mongoose";

export const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL!)
        const connection = mongoose.connection;
        connection.on("connected",()=>{
            console.log("Connection established to Mongodb")
        })
        connection.on("error",(err)=>{
            console.log("Connection error to Mongodb", err)
            process.exit(1)
        })
    } catch (error:any) {
        console.log("something went wrong!")
        console.log(error)
    }
}
