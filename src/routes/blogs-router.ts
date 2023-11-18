import {Request, Response, Router} from "express";
import {Params, RequestWithBody, RequestWithBodyAndParams, RequestWithParams} from "../types/types";
import {BlogCreateModel, BlogUpdateModel} from "../types/blogs/input";
import {BlogsRepository} from "../repositories/blogs-repository";
import {authMiddleware} from "../middlewares/auth/auth-middleware";
import {blogsValidation} from "../validators/blogs-validator";


export const blogsRouter = Router({})

blogsRouter.get('/', (req: Request, res: Response) => {
    const blogs = BlogsRepository.getAllBlogs()
    res.status(200).send(blogs)
})

blogsRouter.post('/', authMiddleware, blogsValidation(), (req: RequestWithBody<BlogCreateModel>, res: Response) => {
    const blog = BlogsRepository.CreateNewBlog(req.body)
    res.status(201).send(blog)
})
blogsRouter.get('/:id', (req: RequestWithParams<Params>, res: Response) => {
    const id = req.params.id
    const blog = BlogsRepository.getBlogById(id)

    if (!blog) {
        res.sendStatus(404)
    }

    res.status(200).send(blog)
})
blogsRouter.put('/:id', authMiddleware, blogsValidation(), (req: RequestWithBodyAndParams<BlogUpdateModel, Params>, res: Response) => {
    const id = req.params.id
    const blog = BlogsRepository.getBlogById(id)

    if (!blog) {
        res.sendStatus(404)
    }
    BlogsRepository.UpdateBlogById(id, req.body)
    res.sendStatus(204)
})
blogsRouter.delete('/:id', authMiddleware, (req: RequestWithParams<Params>, res: Response) => {
    const id = req.params.id
    const blog = BlogsRepository.getBlogById(id)

    if (!blog) {
        res.sendStatus(404)
    }
    BlogsRepository.DeleteBlogById(id)
    res.sendStatus(204)
})
