import { asyncHandler } from "../utils/asyncHandler.js"

const registerUser = asyncHandler( async (req, res) => {
    // get user details from frontend
    const {fullName, username, password, phoneNumber} = req.body//either- form, url
    console.log("mobile:", phoneNumber)




























































































    // validation - non empty
    // check if user already exist - username/mobile
    // create User object --create entry in db
    // response from db without password and refresh token 
    // if response
    //check for user creation
    // return res

})

export { registerUser }