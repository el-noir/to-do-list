import express from 'express';
import cors from 'cors';
import todoRouter from './routes/todo.routes.js'
import { ApiError } from './utils/apiError.js';
const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN || "*",
    credentials: true,
}))

app.use(express.json({
    limit: "30mb",
}));

app.use(express.static('public'))

app.use('/api/v1', todoRouter);

app.use((err, req, res, next)=> {
    if(!(err instanceof ApiError)) {
        err = new ApiError(500, err.message || "Internal Server Error");
    }
    res.status(err.statusCode).json({
        success: false,
        message: err.message,
        errors: err.errors || [],
    });
});

export {app}
