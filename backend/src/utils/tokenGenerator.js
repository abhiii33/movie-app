 import {User} from "../models/user.js"
import {ApiError} from "../utils/error.js"
 
 const generateTokens = async(userID)=>{
        try {
            const user = await User.findById(userID)
            if(!user){
                return res.status(404).json(new ApiError("User not found"))
            }
            const accessToken = await user.generateAccessToken()
            const refreshToken = await user.generateRefreshToken()
            user.refreshToken = refreshToken
            await user.save()
            return {accessToken, refreshToken}
        } catch (error) {
             throw new ApiError("Error generating tokens", error)
             
        }
    }

export default generateTokens