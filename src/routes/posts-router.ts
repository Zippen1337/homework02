import {Request, Response, Router} from "express";
import {Params, RequestWithBody, RequestWithBodyAndParams, RequestWithParams} from "../types/types";
import {PostCreateModel, PostUpdateModel} from "../types/posts/input";


export const postsRouter = Router({})

postsRouter.get('/', (req: Request, res: Response) => {

})
postsRouter.post('/', (req: RequestWithBody<PostCreateModel>, res: Response) => {

})
postsRouter.get('/:id', (req: RequestWithParams<Params>, res: Response) => {

})
postsRouter.put('/:id', (req: RequestWithBodyAndParams<PostUpdateModel, Params>, res: Response) => {

})
postsRouter.delete('/:id', (req: RequestWithParams<Params>, res: Response) => {

})
