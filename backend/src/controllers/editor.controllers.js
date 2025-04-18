import { Editor } from "../models/editor.models.js";
import  Project  from "../models/project.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

export const createEditor = asyncHandler(async(req,res)=>{
    const {projectId} = req.params;
    const {content} = req.body;
    const project = await project.findById(projectId);
    if(!project){
        throw new ApiError(404,"Project not found");
    }
    const editor = await Editor.create({
        project: projectId,
        owner: project.owner,
        content,
    });
    return res.status(201).json(new ApiResponse(201, "Editor created successfully",editor));
})

export const saveEditor = asyncHandler(async(req,res)=>{
    // console.log("Saving editor content..."); // Debugging line
    const {projectId} = req.params;
    const {content} = req.body;
    const project = await Project.findById(projectId);
    // console.log("Project found:", project); // Debugging line
    if(!project){
        throw new ApiError(404,"Project not found");
    }
    const editor = await Editor.findOneAndUpdate(
        {project: projectId},
        {content},
        {new: true, runValidators: true}
    );
    if(!editor){
        //create editor if not found
        const newEditor = await Editor.create({
            project: projectId,
            owner: project.owner,
            content,
        });
        return res.status(201).json(new ApiResponse(201, "Editor created successfully",newEditor));
    }
    return res.status(200).json(new ApiResponse(200, "Editor updated successfully",editor));
})

export const getEditor = asyncHandler(async(req,res)=>{
    const {projectId} = req.params;
    const project = await Project.findById(projectId);
    if(!project){
        throw new ApiError(404,"Project not found");
    }
    const editor = await Editor.findOne({project: projectId});
    if(!editor){
        throw new ApiError(404,"Editor not found");
    }
    return res.status(200).json(new ApiResponse(200, "Editor fetched successfully",editor));
})
// delete editor if the project is deleted
export const deleteEditor = asyncHandler(async(req,res)=>{
    const {projectId} = req.params;
    const project = await Project.findById(projectId);
    if(!project){
        throw new ApiError(404,"Project not found");
    }
    const editor = await Editor.findOneAndDelete({project: projectId});
    if(!editor){
        throw new ApiError(404,"Editor not found");
    }
    return res.status(200).json(new ApiResponse(200, "Editor deleted successfully",editor));
})
