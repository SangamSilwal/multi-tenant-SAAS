import multer, { FileFilterCallback } from "multer";
import path from "path";


const profilePicStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../public/uploads/profile-pics'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, 'profile-' + uniqueSuffix + ext);
  }
});

const profilePicFilter = (
  req: Request,
  file: Express.Multer.File,
  cb:FileFilterCallback
) => {
  const allowedTypes = ['image/jpeg', 'image/png'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only JPEG and PNG images are allowed for profile pictures'));
  }
};

export const singleProfilePicUpload = multer({
  storage: profilePicStorage,
  fileFilter: profilePicFilter,
  limits: {
    fileSize: 2 * 1024 * 1024, // 2MB limit for profile pics
    files: 1 // Only one file
  }
}).single('profilePicture');