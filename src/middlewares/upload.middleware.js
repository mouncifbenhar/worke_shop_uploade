import multer from "multer";
import path from "path";
import fs from "fs";
import { randomUUID } from "crypto";

const uploadDir = path.resolve("uploads");

fs.mkdirSync(uploadDir, { recursive: true });

// Storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },

    filename: (req, file, cb) => {
        const extension = path.extname(file.originalname).toLowerCase();
        const filename = `${randomUUID()}${extension}`;

        cb(null, filename);
    }
});

// Allowed file types
const allowedTypes = {
    ".pdf": "application/pdf",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg"
};

// File validation
const fileFilter = (req, file, cb) => {
    const extension = path.extname(file.originalname).toLowerCase();

    const validExtension = Object.hasOwn(allowedTypes, extension);
    const validMime = allowedTypes[extension] === file.mimetype;
    const validName = file.originalname.length <= 255;

    if (!validExtension || !validMime || !validName) {
        return cb(new Error("Invalid file type or name"));
    }

    cb(null, true);
};

export const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024,
        files: 1
    }
});