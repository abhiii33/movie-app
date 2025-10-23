import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true, 
            index: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowecase: true,
            trim: true, 
        },
        fullName: {
            type: String,
            required: true,
            trim: true, 
            index: true
        },
        avatar: {
            type: String, 
            required: false,
        },
        coverImage: {
            type: String,
        },
          avatar: {
            type: String, 
            required: false,
        },
        coverImage: {
            type: String, 
        },
        watchHistory: [
            {
                type: Schema.Types.ObjectId,
                ref: "Video"
            }
        ],
        password: {
            type: String,
            required: [true, 'Password is required']
        },
        refreshToken: {
            type: String
        }
    },
    {
        timestamps: true
    }
)

userSchema.pre("save", async function (next){
    if(!this.isModified("password") ) return next()
    this.password = bcrypt.hash(this.password,10)
 next()
})

    userSchema.methods.isPasswordCorrect = async function (password) {
        return await  bcrypt.compare(this.password, password)
    }
   
    userSchema.methods.generateAccessToken = async function (){
     return   jwt.sign({
            id:this._id,
            email:this.email
        },"as",{expiresIn : "3d"})
    }
    userSchema.methods.generateRefreshToken = async function (){
     return   jwt.sign({
            id:this._id
        },"fvd",{expiresIn : "7d"})
    }



export const User = mongoose.model("User", userSchema)