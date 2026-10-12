import express from "express";

import {
    createModuleController,
    getModulesController
} from "../controllers/module.controller.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";

const router = express.Router();

router.post(
    "/create",
    authMiddleware,
    roleMiddleware("formateur"),
    createModuleController
);

export default router;