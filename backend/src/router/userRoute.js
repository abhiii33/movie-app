import {Router} from "express"
import {auth} from "../middlewares/auth.middleware.js"

import {userRegister , userLogin, userLogout,updateAccountDetails,getCurrentUser,changeCurrentPassword} from "../controllers/user.js"
const router = Router()

router.route("/register").post(userRegister)
router.route("/login").post(userLogin)
router.route("/logout").post(auth,userLogout)
router.route("/currentuser").get(auth,getCurrentUser)
router.route("/changepassword").post(auth,changeCurrentPassword)
router.route("/updateaccount").post(auth,updateAccountDetails)
export default router