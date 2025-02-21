import cloudinary from "../config/cloudnary.config.js";
export const uploadImage = async (buffer) => {
    try {
        const options = {
            folder: "ByeNext",
            resource_type: "auto",
        };
        return new Promise((resolve, reject) => {
            cloudinary.uploader
                .upload_stream(options, (error, result) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(result);
                }
            })
                .end(buffer);
        });
    }
    catch (error) {
        throw new Error(`Error uploading image: ${error.message}`);
    }
};
export const getImageUrl = (publicId, options = {}) => {
    try {
        return cloudinary.url(publicId, {
            width: options.width,
            height: options.height,
            crop: options.crop,
        });
    }
    catch (error) {
        throw new Error(`Error generating image URL: ${error.message}`);
    }
};
export const deleteImage = async (publicId) => {
    try {
        return await cloudinary.uploader.destroy(publicId);
    }
    catch (error) {
        throw new Error(`Error deleting image: ${error.message}`);
    }
};
