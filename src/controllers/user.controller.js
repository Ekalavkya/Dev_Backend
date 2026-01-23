import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandlers.js";
import { User} from "../models/user.models.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
const registerUser = asyncHandler(async (req, res) => {
    // get user details from frontend
    // validation- not empty
    // check if user already exits: username, email
    // check for image, check for avator
    //upload them to cloudnary, avator 
    // create user object - create entry in db
    //remove password and refresh token field from response
    // return res
    const {fullName, email, username, password} = req.body
    console.log("email: ", email);
    if (
        [fullName, email, username, password].some((field) =>
            field?.trim() === "")
    )
        {
        throw new ApiError(400, "All fields are required")
        }
    // find the user already exit or not
    const UserExisted = User.findOne({ 
    $or: [{ username},{ email }]
    })
    if (UserExisted) {
        throw new ApiError(409, " User with email or username  already exits")
    }
    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;
    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required")
    }
   const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)
     if (!avatar) {
        throw new ApiError(400, "Avatar file is required")
    }
   const user= await  User.create({
        fullName,
        avatar: avatarLocalPath.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.ToLowerCase()

   })
    const createdUser = User.findById(user._id).select(
    "-password -refreshToken"
    )
    if (!createdUser) {
        throw new ApiError (500, " Something went wrong while registering the user")
    }
    return res.status(201).json(
        new ApiResponse(200, createdUser, " User Register")
    )

})
export { registerUser }
/*
these method can be used to check the fields values but for this each field nee to be checked
whole checking of the field is required and long if else code is need to be  written for that so introduced the array values for the checking.
of the each field and trim the data and check
  if (fullName === "") {
        throw new ApiError(400, "fullname is required")
    }
 */