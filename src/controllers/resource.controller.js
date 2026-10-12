import { createResourceService } from "../services/resource.service.js";
import fs from "fs/promises";
import mongoose from "mongoose";

export const createResourceController = async (req, res) => {

    try {

        const { moduleId } = req.params;

        if (!req.file) {
            return res.status(400).json({
                message: "File is required"
            });
        }

        if (!mongoose.isValidObjectId(moduleId)) {
            await fs.unlink(req.file.path);

            return res.status(400).json({
                message: "Invalid module ID"
            });
        }

        const resource = await createResourceService(
            moduleId,
            req.file
        );

        return res.status(201).json({
            message: "Resource created successfully",
            resource
        });

    } catch (error) {

        if (req.file) {
            await fs.unlink(req.file.path).catch(() => {});
        }

        console.error(error);

        return res.status(error.status || 500).json({
            message: error.status ? error.message : "Server error"
        });
    }
};