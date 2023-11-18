import {Request, Response, Router} from "express";
import {Params, RequestWithBody, RequestWithBodyAndParams, RequestWithParams} from "../types/types";
import {PostCreateModel, PostUpdateModel} from "../types/posts/input";
import {authMiddleware} from "../middlewares/auth/auth-middleware";
import {postsValidation} from "../validators/posts-validator";
import {PostsRepository} from "../repositories/posts-repository";


export const postsRouter = Router({})

postsRouter.get('/', (req: Request, res: Response) => {
    const posts = PostsRepository.GetAllPosts()
    res.status(200).send(posts)
})
postsRouter.post('/', authMiddleware, postsValidation, (req: RequestWithBody<PostCreateModel>, res: Response) => {
    const post = PostsRepository.CreateNewPost(req.body)
    res.status(201).send(post)
})
postsRouter.get('/:id', (req: RequestWithParams<Params>, res: Response) => {
    const id = req.params.id
    const post = PostsRepository.GetPostById(id)
    if (!post) {
        res.sendStatus(404)
    }

    res.status(200).send(post)
})
postsRouter.put('/:id', authMiddleware, postsValidation, (req: RequestWithBodyAndParams<PostUpdateModel, Params>, res: Response) => {
    const id = req.params.id
    const post = PostsRepository.GetPostById(id)

    if (!post) {
        res.sendStatus(404)
    }
    PostsRepository.UpdatePostById(id, req.body)
    res.sendStatus(204)
})
postsRouter.delete('/:id', authMiddleware, (req: RequestWithParams<Params>, res: Response) => {
    const id = req.params.id
    const post = PostsRepository.GetPostById(id)
    if (!post) {
        res.sendStatus(404)
    }
    PostsRepository.DeletePostById(id)
    res.sendStatus(204)
})
