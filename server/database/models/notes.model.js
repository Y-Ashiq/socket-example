import mongoose from "mongoose";

const noteSchema =new  mongoose.Schema({


    title:{
        type: String
    },
    note:{
        type: String
    }
})

const noteModel = mongoose.model("notes",noteSchema)

export default noteModel