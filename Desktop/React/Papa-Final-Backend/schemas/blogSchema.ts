import {Schema, model} from 'mongoose'

export interface BlogPost {
    title: string,
    body: string,
    author: string,
    date: Date,
}

const BlogSchema = new Schema ({
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    }
})

export const BlogPostModel = model('Employee', BlogSchema)

