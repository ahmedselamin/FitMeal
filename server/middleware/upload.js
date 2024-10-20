import multer from "multer"
import path from "path"

//set up storage for uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads') //store uploads here
    },
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + path.extname(file.originalname);  // create unique file name
        cb(null, uniqueName);
    },
    
});

//initialize upload
const upload = multer({ upload });

export default multer;