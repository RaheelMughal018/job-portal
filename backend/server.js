import app from './app.js';
import cloudinary from "cloudinary"

// Connect to Cloudinary
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})
app.listen(process.env.PORT,()=>{
    try {
        console.log(`Server is running on port ${ process.env.PORT}`);
    } catch (error) {
        console.log("error while creating server: " + error)
    }
})