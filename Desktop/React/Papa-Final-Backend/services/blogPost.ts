import { BlogPostModel, BlogPost } from "../schemas";

export const getBlogPosts = async () => {
    const allBlogPosts = await BlogPostModel.find({})

    return allBlogPosts
}

export const getBlogPost = async (id: string) => {
    const blogPost = await BlogPostModel.findById(id)
    return blogPost
}

export const createBlogPost = async (blogPost: BlogPost) => {
    const result = await BlogPostModel.create(blogPost)
    return result
}

export const editBlogPost = async(id: string, blogPost: BlogPost) => {
    await BlogPostModel.findByIdAndUpdate(id, blogPost)
    const newBlogPost = await getBlogPost(id)
    return newBlogPost
}

export const deleteBlogPost = async (id: string) => {
    const result = await BlogPostModel.findByIdAndDelete(id)
    return result
}