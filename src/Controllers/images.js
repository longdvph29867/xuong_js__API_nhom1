import cloudinary from "../configs/cloudinaryConfig.js";



export const uploadImages = async (req, res) => {
    try {
        const images = req.files.map(file => file.path)
        console.log("🚀 ~ file: images.js:8 ~ uploadImages ~ images:", images)
        const uploadedImages = [];

        for( let image of images) {
            const results = await cloudinary.uploader.upload(image);
            uploadedImages.push({
                url: results.secure_url,
                publicId: results.public_id,
            })
        }

        return res.status(200).json({
            message: "Uploaded images successfully",
            datas: uploadedImages
        })

    } catch (error) {
        res.status(500).json({
            name: error.name,
            message: error.message,
        });
    }
}

export const removeImages = async (req, res) => {
    try {
        const publicId = req.params.publicId;
        const results = await cloudinary.uploader.destroy(publicId);

        if(results.result === "not found") {
            throw new Error("Xoá ảnh thất bại!")
        }

        return res.status(200).json({
            message: "Xoá ảnh thành công!"
        })

    } catch (error) {
        res.status(500).json({
            name: error.name,
            message: error.message,
        });
    }
}