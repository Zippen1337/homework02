import {Request, Response, Router} from "express";
import {Params, RequestWithBody, RequestWithBodyAndParams, RequestWithParams} from "../types/types";
import {PostCreateModel, PostUpdateModel} from "../types/posts/input";
import {authMiddleware} from "../middlewares/auth/auth-middleware";
import {blogIdValidation, postsValidation} from "../validators/posts-validator";
import {PostsRepository} from "../repositories/posts-repository";


export const postsRouter = Router({})

postsRouter.get('/',
    async (req: Request, res: Response) => {
    const posts = await PostsRepository.getAllPosts()
    res.status(200).send(posts)
})
postsRouter.post('/', authMiddleware, blogIdValidation ,postsValidation(),
    async (req: RequestWithBody<PostCreateModel>, res: Response) => {
    const postId = await PostsRepository.createPost(req.body)
        if (!postId) {
            res.sendStatus(400)
            return
        }
        const newPost = await PostsRepository.getPostById(postId.toString())
    res.status(201).send(newPost)
})
postsRouter.get('/:id',
    async (req: RequestWithParams<Params>, res: Response) => {
    const id = req.params.id
    const post = await PostsRepository.getPostById(id)
    if (!post) {
        res.sendStatus(404)
        return
    }

    res.status(200).send(post)
})
postsRouter.put('/:id', authMiddleware, blogIdValidation, postsValidation(),
    async (req: RequestWithBodyAndParams<PostUpdateModel, Params>, res: Response) => {
    const id = req.params.id
    const post = await PostsRepository.getPostById(id)

    if (!post) {
        res.sendStatus(404)
        return
    }
    await PostsRepository.updatePost(id, req.body)
    res.sendStatus(204)
})
postsRouter.delete('/:id', authMiddleware,
    async (req: RequestWithParams<Params>, res: Response) => {
    const id = req.params.id
    const post = await PostsRepository.getPostById(id)
    if (!post) {
        res.sendStatus(404)
        return
    }
    await PostsRepository.DeletePostById(id)
    res.sendStatus(204)
})
