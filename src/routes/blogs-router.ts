import {Request, Response, Router} from "express";
import {Params, RequestWithBody, RequestWithBodyAndParams, RequestWithParams} from "../types/types";
import {BlogCreateModel, BlogUpdateModel} from "../types/blogs/input";
import {BlogsRepository} from "../repositories/blogs-repository";
import {authMiddleware} from "../middlewares/auth/auth-middleware";
import {blogsValidation} from "../validators/blogs-validator";


export const blogsRouter = Router({})

blogsRouter.get('/',
    async (req: Request, res: Response) => {
    const blogs = await BlogsRepository.getAllBlogs()
    res.status(200).send(blogs)
})

blogsRouter.post('/', authMiddleware, blogsValidation(),
    async (req: RequestWithBody<BlogCreateModel>, res: Response) => {
    const blogId = await BlogsRepository.createBlog(req.body)
        const newBlog = await BlogsRepository.getBlogById(blogId.toString())
    res.status(201).send(newBlog)
})
blogsRouter.get('/:id',
    async (req: RequestWithParams<Params>, res: Response) => {
    const id = req.params.id
    const blog = await BlogsRepository.getBlogById(id)

    if (!blog) {
        res.sendStatus(404)
        return
    }

    res.status(200).send(blog)
})
blogsRouter.put('/:id', authMiddleware, blogsValidation(),
    async (req: RequestWithBodyAndParams<BlogUpdateModel, Params>, res: Response) => {
    const id = req.params.id
    const blog = await BlogsRepository.getBlogById(id)

    if (!blog) {
        res.sendStatus(404)
        return
    }
    await BlogsRepository.updateBlog(id, req.body)
    res.sendStatus(204)
})
blogsRouter.delete('/:id', authMiddleware,
    async (req: RequestWithParams<Params>, res: Response) => {
    const id = req.params.id
    const blog = await BlogsRepository.getBlogById(id)

    if (!blog) {
        res.sendStatus(404)
        return
    }
    await BlogsRepository.deleteBlog(id)
    res.sendStatus(204)
})
