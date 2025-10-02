import {Router} from "express"

import {test2} from "../controllers/test2.js"
const router = Router()


// router.get("/testr",test)
router.get("/test2",test2)
export default router