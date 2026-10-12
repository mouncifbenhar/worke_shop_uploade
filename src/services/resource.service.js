import Resource from "../models/Resource.js";
import Module from "../models/Module.js";

export const createResourceService = async (moduleId, file) => {

    const module = await Module.findById(moduleId);

    if (!module) {
        const error = new Error("Module not found");
        error.status = 404;
        throw error;
    }

    const resource = await Resource.create({
        originalName: file.originalname,
        filename: file.filename,
        path: file.path,
        mimeType: file.mimetype,
        size: file.size,
        module: moduleId
    });

    return resource;
};