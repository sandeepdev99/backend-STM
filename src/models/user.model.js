import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";


const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    fullName: {
        type: String,
        // required: true,
        trim: true,
        minlength: 3,
        maxlength: 52,
    },
    phoneNumber: {
        type: String,
        trim: true,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
    viewedProduct: [{
        type: Schema.Types.ObjectId,
        ref: "Product"
    }],
    password: {
        type: String,
        required: [true, "password is required"],
        minlength: 6,
        select: false,
    },
    isActive: {
        type: Boolean,
        dafault: true,
    },
    refreshToken: { 
        type: String
    }
    
},{timestamps: true})


userSchema.pre("save", async function () {
    if (!this.isModified("password")) return ;
    this.password = await bcrypt.hash(this.password, 10)
})

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: REFRESH_TOKEN_EXPIRY
        }
    )
}


export const User = mongoose.model("User", userSchema)