//to dos
//1. create user schema and model
import mongoose from "mongoose";

// const Schema = mongoose.Schema;
const { Schema } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true, 
        unique: true,
        minlength: 6,
        maxlength: 24
    },
    password:{
        type: String,
        required: true,
        minlength: 60
    }
})

export default mongoose.Model("User", userSchema);