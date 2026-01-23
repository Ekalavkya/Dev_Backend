import { v2 as cloudinary } from "cloudinary"
import fs from "fs"


(async function () {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    console.log("Cloudinary configured");
})();
const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null
        // upload the file on cloudnary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        // file has been uploaded sucessfull
        console.log("file is uploaded on cloudnary",
            response.url);
        return response;
        
    }
    catch (error) {
        fs.unlinkSync(localFilePath)
        // remove the locally added file from the server
        return null
    }
}
export {uploadOnCloudinary}
