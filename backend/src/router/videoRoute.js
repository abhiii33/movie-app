import {Router} from "express"
import {auth} from "../middlewares/auth.middleware.js"
import {publishVideo,updateVideo,getVideoById} from "../controllers/video.js"
import { upload } from "../middlewares/upload.js";

const router = Router()

router.route("/postVideo").post(auth,
    upload.fields([
        { name: "video", maxCount: 1 },
        { name: "thumbnail", maxCount: 1 }
    ]),
    publishVideo)
 router.route("/updateVideo/:id").put(auth,
    upload.fields([
        { name: "video", maxCount: 1 },
        { name: "thumbnail", maxCount: 1 }
    ]),
    updateVideo)
     router.route("/getVideo/:id").get(auth,getVideoById)
export default router

//    // In your video.routes.js or a test file
// router.get("/test-cloudinary", async (req, res) => {
//     console.log("Testing Cloudinary config:");
//     console.log("Cloud Name:", process.env.CLOUDINARY_CLOUD_NAME);
//     console.log("API Key:", process.env.CLOUDINARY_API_KEY);
//     console.log("API Secret:", process.env.CLOUDINARY_API_SECRET ? "Set" : "Not Set");
    
//     res.json({
//         cloudName: process.env.CLOUDINARY_CLOUD_NAME,
//         apiKey: process.env.CLOUDINARY_API_KEY,
//         apiSecretExists: !!process.env.CLOUDINARY_API_SECRET
//     });
// });