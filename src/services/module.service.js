import Module from "../models/Module.js";

// Create Module
export const createModuleService = async (title) => {

    const module = await Module.create({
        title
    });

    return module;
};

// Get All Modules
export const getModulesService = async () => {

    const modules = await Module.find();

    return modules;
};