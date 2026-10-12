import { createModuleService } from "../services/module.service.js";

export const createModuleController = async (req, res) => {
    try {
        const { title } = req.body;

        if (typeof title !== "string" || !title.trim()) {
            return res.status(400).json({
                message: "Module title is required"
            });
        }

        const module = await createModuleService(title.trim());

        return res.status(201).json({
            message: "Module created successfully",
            module
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Server error"
        });
    }
};
export const getModulesController = async (req, res) => {
    try {
        const modules = await getModulesService();

        return res.status(200).json({
            modules
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Server error"
        });
    }
};