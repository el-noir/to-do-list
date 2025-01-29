import { Router } from 'express';
import { Todo } from '../models/todo.models.js'; // Updated model import
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/apiError.js';
import { ApiResponse } from '../utils/apiResponse.js';
import mongoose from 'mongoose';

const router = Router();

router.get('/todos', asyncHandler(async (req, res) => {
    const todos = await Todo.find().populate('subTodos').exec();
    
    if (!todos) {
        throw new ApiError(404, "No Todos Found");
    }

    res.status(200).json(new ApiResponse(200, todos, "Todos retrieved Successfully"));
}));

router.post('/todos', asyncHandler(async (req, res) => {
    const { content, createdBy } = req.body;

    // Validate that 'createdBy' is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(createdBy)) {
        throw new ApiError(400, "Invalid User ID");
    }

    if (!content || !createdBy) {
        throw new ApiError(400, "Content and CreatedBy fields are required");
    }
    console.log("req.body content : ", req.body)
    try {
        const newTodo = await Todo.create({ content, createdBy });
        console.log("newTodo : ", newTodo);
        res.status(201).json(new ApiResponse(201, newTodo, "Todo created successfully"));
    } catch (error) {
        console.error("Error creating todo:", error);  // Log the actual error
        throw new ApiError(500, "Error creating todo", error);  // Pass the error as part of the ApiError
    }
    
}));

export default router;
