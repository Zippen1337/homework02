import {body} from "express-validator";
import {BlogsRepository} from "../repositories/blogs-repository";
import {inputModelValidation} from "../middlewares/inputModel/input-model-validation";


export const blogIdValidation =  body('blogId')
    .isString()
    .trim()
    .custom(async (value) => {
        const blog = await BlogsRepository.getBlogById(value)

        if (!blog) {
            throw new Error('Incorrect blogId')
        }
        return true
    }).withMessage('Incorrect blogId')

const titleValidation = body('title').isString().trim().isLength({min: 1, max: 30}).withMessage('Incorrect title length')

const shortDescriptionValidation = body('shortDescription').isString().trim().isLength({min: 1, max: 100}).withMessage('Incorrect shortDescription length')

const contentValidation = body('content').isString().trim().isLength({min: 1, max: 1000}).withMessage('Incorrect content length')
export const postsValidation = () => [titleValidation, shortDescriptionValidation, contentValidation, inputModelValidation]