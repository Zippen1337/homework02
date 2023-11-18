import {body} from "express-validator";
import {BlogsRepository} from "../repositories/blogs-repository";


const blogIdValidation = body('blogId').isString().trim().custom((value) => {
    const blog = BlogsRepository.getBlogById(value)

    if (!blog) {
        throw new Error('Incorrect blogId')
    }
    return true
}).withMessage('Incorrect blogId')