import express from "express";
import { AuthController } from "../controllers/authController.js";
import multer from "multer";

const router = express.Router();

const upload = multer({ dest: "uploads/" });

router.post("/upload", upload.single("file"), (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Handle the file as needed
    // For example, you can access the file path using: file.path

    return res.status(200).json({ message: "File uploaded successfully" });
  } catch (error) {
    console.error("File upload error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);

export default router;
