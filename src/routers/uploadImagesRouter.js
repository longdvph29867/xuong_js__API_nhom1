import express from 'express';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../configs/cloudinaryConfig.js';
import { removeImages, uploadImages } from '../Controllers/images.js';
import { checkPremission } from '../middlewares/checkPermission.js';

const routerUploadImages = express.Router();


const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "test-up-image",
        format: "png"
    }
})

const upload = multer({storage: storage});

routerUploadImages.post('/upload', checkPremission, upload.array("images", 10), uploadImages);
routerUploadImages.delete('/remove/:publicId', checkPremission,upload.array("images", 10), removeImages);

export default routerUploadImages;