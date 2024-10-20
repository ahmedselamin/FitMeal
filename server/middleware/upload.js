import multer from 'multer';
import path from 'path';

// Set up storage for uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directory to save uploaded files
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + path.extname(file.originalname); // Create a unique filename
    cb(null, uniqueName);
  },
});

// Initialize upload
const upload = multer({ storage });

export default upload;
