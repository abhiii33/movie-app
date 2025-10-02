import mongoose from "mongoose"
const connect = async () => {
      try {
         await mongoose.connect(process.env.MONGODB_URI,{dbname: "PROJECT1"})
        console.log("connected");
        
      } catch (error) {
        console.log(error)
      }
}
export default connect