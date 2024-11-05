import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";
import multer from "multer";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const uploadPicture = multer({
  storage: storage,
  limits: {
    fileSize: 1 * 1000000, // 1 MB (note: corrected from 100000 to 1000000)
  },
  fileFilter: (req, file, cb) => {
    let fileExtension = path.extname(file.originalname).toLowerCase();
    if (
      fileExtension !== ".png" &&
      fileExtension !== ".jpg" &&
      fileExtension !== ".jpeg"
    ) {
      return cb(new Error("Only images are allowed!"));
    }
    cb(null, true);
  },
});

export default uploadPicture;
