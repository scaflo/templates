import { uploadImage } from "$/services/cloudnary.service.js";
import { NextFunction, Request, Response } from "express";
import multer from "multer";
const storage = multer.memoryStorage();
export const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  //   fileFilter: (_req, file, cb) => {
  //     if (file.mimetype.startsWith("image/")) {
  //       cb(null, true);
  //     } else {
  //       cb(new Error("Only images are allowed"));
  //     }
  //   },
});

export const uploadMultipleToCloudinary = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  upload.array("files", 10)(req, res, async (err) => {
    if (err) {
      res
        .status(400)
        .json({ message: "Error uploading files", error: err.message });
      return;
    }
    if (!req.files || (req.files as Express.Multer.File[]).length === 0) {
      res.status(400).json({ message: "No files uploaded" });
      return;
    }
    if ((req.files as Express.Multer.File[]).length > 10) {
      res.badRequest({
        message: "You can only upload a maximum of 10 files",
      });
    }
    try {
      const uploadPromises = (req.files as Express.Multer.File[]).map((file) =>
        uploadImage(file.buffer)
      );
      const results = await Promise.all(uploadPromises);
      req.cloudinaryResult = results;
      next();
    } catch (error) {
      next(error);
      // res.status(500).json({
      //   message: "Error uploading to Cloudinary",
      //   error: (error as Error).message,
      // });
    }
  });
};

export const uploadSingleToCloudinary = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  upload.single("file")(req, res, async (err) => {
    if (err) {
      res
        .status(400)
        .json({ message: "Error uploading file", error: err.message });
      return;
    }
    if (!req.file) {
      res.status(400).json({ message: "No file uploaded" });
      return;
    }
    try {
      const result = await uploadImage(req.file.buffer);
      req.cloudinaryResult = result;
      next();
    } catch (error) {
      next(error);
    }
  });
};
