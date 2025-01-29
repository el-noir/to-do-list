import {Router} from 'express'
import {todo} from '../models/todo.models.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiError } from '../utils/apiError.js'
import { ApiResponse } from '../utils/apiResponse.js'

const router = Router();

router.get('/todos', asyncHandler(async (req, res) => {
      const todos = await todo.find(). populate('subTodos').exec();

      if(!todos) {
        throw new ApiError(404, "No Todos Found");
      }
      res.status(200).json ( new ApiResponse(200, todos, "Todos retrieved Successfully") );
}));

router.post('/todos', asyncHandler(async (req, res)=> {
    const {content, createdBy} = req.body;

    if(!content || !createdBy){
        throw new ApiError(400, "Content and CreatedBy fields are required");
    }

    const newTodo = await todo.create({content, createBy});
    res.status(201).json(new ApiResponse(201, newTodo, "Todo created successfully"));
}));

export default router;
