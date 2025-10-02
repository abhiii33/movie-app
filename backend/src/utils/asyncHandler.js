 const asyncHandler = (requesthandle)=>{
     return (req,res,next)=>{
      Promise.resolve((requesthandle(req,res,next))).catch((err)=>next(err))
     }
}

export default asyncHandler