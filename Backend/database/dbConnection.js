import mongoose from "mongoose";

const dbConnection = ()=>{
    mongoose
    .connect(process.env.MONGO_URI ,{
        dbName: "HOSPITAL_MANGEMENT_SYSTEM",
    })
    .then(()=>{
        console.log("Connceted to Database");
    })
    .catch((err)=>{
        console.log(`Some error occure while connecing to database :${err}`);
    });
};

export default dbConnection;