class ApiError extends  Error{
    constructor(statusCode,message = "sww", errors = [],stack="" )
  {
    super(message)
    {
        this.statusCode = statusCode
        this.errors = errors
        this.message = message
        this.success = false
        this.data = null
    }
  }
}

export {ApiError}