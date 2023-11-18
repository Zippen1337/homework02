import {Request} from "express";

export type RequestWithParams<p> = Request<p,{},{},{}>
export type RequestWithBody<b> = Request<{},{},b,{}>
export type RequestWithBodyAndParams<b,p> = Request<p,{},b,{}>

export type Params = {
    id: string
}

export type ErrorMessageType = {
    field: string
    message: string
}

export type ErrorType = {
    errorsMessages: ErrorMessageType[]
}

