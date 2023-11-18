import {Request, Response, Router} from "express";
import {TestingRepository} from "../repositories/testing-repository";

export const testingRouter = Router({})

testingRouter.delete('/', (req: Request, res: Response) => {
    TestingRepository.DeleteAllData()
    res.sendStatus(204)
})