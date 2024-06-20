import { Request, Response} from 'express'
import {getBlogPosts, getBlogPost, createBlogPost, editBlogPost, deleteBlogPost  } from "../services";

export const getBlogPostController = async (req: Request, res: Response) => {
    const allBlogPosts = await getBlogPosts()
    res.json(allBlogPosts)
}

export const getSingleBlogPostController = async (req: Request, res: Response) => {
    //@ts-ignore
    const id: string = req.query.id
    const blogPost = await getBlogPost(id)
    res.json(blogPost)
}

export const createBlogPostController = async (req: Request, res: Response) => {
    const newBlogPost = req.body
    try{
        const result = await createBlogPost(newBlogPost)
        res.json(result)
    }
    catch(e) {
        res.json('Validation Failed')
    }
}
export const editBlogPostController = async (req: Request, res: Response) => {
    //@ts-ignore
    const id: string = req.query.id
    const result = await editBlogPost(id, req.body)
    res.json(result)
}

export const deleteBlogPostController = async (req: Request, res: Response) => {
    const id: string = req.body.id
    const result = await deleteBlogPost(id)
    res.json(result)
}