import express from "express";

import { authMiddleware } from "../middlewares/auth.middleware.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";
import { upload } from "../middlewares/upload.middleware.js";

import {
    createResourceController
} from "../controllers/resource.controller.js";

const router = express.Router();

router.post(
    "/create/:moduleId",
    authMiddleware,
    roleMiddleware("formateur"),
    upload.single("file"),
    createResourceController
);

export default router;