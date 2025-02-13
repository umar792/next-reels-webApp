import mongoose from "mongoose";


const MONGODB_URI = process.env.MONGODB_URI || "";
if(!MONGODB_URI){
    throw new Error("Missing MONGODB_URI environment variable");
}

let cached = global.mongoose;
if(!cached){
    cached = global.mongoose = {conn : null , promise : null};
}

export async function dbConnector(){
    if(cached.conn){
        return cached.conn;
    }

    if(!cached.promise){
        cached.promise = mongoose.connect(MONGODB_URI,{
            bufferCommands : true,
        }).then(()=> mongoose.connection);
    }

    try {
        cached.conn = await cached.promise;
        return cached.conn;
    } catch (error) {
        throw new Error("Failed to connect to MongoDB");
    }
}